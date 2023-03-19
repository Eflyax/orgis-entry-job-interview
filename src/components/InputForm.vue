<template>
	<form
		class="form"
		@submit.prevent="onSubmit"
	>
		<div class="row">
			<div class="col-md-3">
				<InputSize
					ref="height"
					:size-value="heightValue"
					@change-value="heightValue = $event"
					:size-units="heightUnits"
					@change-units="heightUnits = $event"
					:error="invalidFeedbacks['heightValue']"
				/>

				<InputSize
					ref="width"
					:size-value="widthValue"
					@change-value="widthValue = $event"
					:size-units="widthUnits"
					@change-units="widthUnits = $event"
					:error="invalidFeedbacks['widthValue']"
				/>
			</div>
			<div class="col-md-9">
				<div class="form-group">
					<label>Textový popisek</label>
					<textarea
						v-model="description"
						class="form-control"
						rows="4"
						style="height: 117px;"
					/>
				</div>
			</div>
		</div>

		<button
			type="submit"
			class="btn btn-primary"
		>
			Odeslat
		</button>

		<div v-if="result">
			<hr>
			<h2>Výsledek</h2>

			<div
				:style="result.css"
			>
				{{ result.description }}
			</div>
		</div>
	</form>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useLayout} from '../composables/useLayout';
import InputSize from './InputSize.vue';
import type {ApiPayLoad, Model} from '../types';

export default defineComponent({
	name: 'InputForm',
	components: {
		InputSize
	},
	setup() {
		const {setLoading} = useLayout();

		return {
			setLoading,
		}
	},
	data(): Model {
		return {
			heightValue: 100,
			heightUnits: 'px',
			widthValue: 100,
			widthUnits: 'px',
			color: '#000000',
			description: '',
			invalidFeedbacks: {},
			apiResult: null,
			// result: null
			result: {
				description: 'ahoj',
  			css: 'width: 100px;height: 100px;background-color: #00ff00;',
  			id: 101
			}
		};
	},
	methods: {
		validateFieldNumber(fieldName: string, required = true): string | null {
			this.invalidFeedbacks[fieldName] = null;

			let value = this.$data[fieldName];

			if (required && !value) {
				this.invalidFeedbacks[fieldName] = 'Toto pole je povinné.';
				return this.invalidFeedbacks[fieldName];
			}

			if (/\D/.test(value)) {
				this.invalidFeedbacks[fieldName] = 'Vstup musí být číslo.';
				return this.invalidFeedbacks[fieldName];
			}

			return this.invalidFeedbacks;
		},
		onSubmit(): void {
			this.validateFieldNumber('heightValue');
			this.validateFieldNumber('widthValue');

			const
				isFormValid = Object.values(this.invalidFeedbacks)
					.every(x => x === null || x === '');

			this.setLoading(true);

			if (isFormValid) {
				fetch('https://jsonplaceholder.typicode.com/posts', {
					method: 'POST',
					body: JSON.stringify({
						description: this.description, // todo - ořezat na 10 znaků
						css: `
						width: ${this.widthValue}${this.widthUnits};
						height: ${this.heightValue}${this.heightUnits};
						background-color: ${this.color};
					`.replace((/  |\r\n|\n|\t|\r/gm),'')} as ApiPayLoad),
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
					},
				})
					.then((response) => response.json())
					.then((json: Model) => {
						this.apiResult = json;
						this.result = this.apiResult;
					})
					.catch(error => {
						// toto - zobrazit toaster
						console.log('Došlo k neočekávané chybě');
					})
					.finally(() => this.setLoading(false));
			}
		}
	},
	mounted() {
		// this.result = Object.assign({}, this.data.);
	},
});
</script>
