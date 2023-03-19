<template>
	<form
		class="form"
		@submit.prevent="onSubmit"
	>
		<loader v-if="isLoading" />

		<div class="row">
			<div class="col-md-3">
				<InputSize
					ref="height"
					label="Výška"
					:size-value="heightValue"
					@change-value="heightValue = $event"
					:size-units="heightUnits"
					@change-units="heightUnits = $event"
					:error="invalidFeedbacks['heightValue']"
				/>

				<InputSize
					ref="width"
					label="Šířka"
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

			<div class="input-group mb-3">
				<label class="px-2">Barva pozadí</label>

				<color-picker
					class="form-select"
					v-model:pureColor="color"
				/>
			</div>
		</div>

		<button
			type="submit"
			class="btn btn-primary"
		>
			Odeslat
		</button>

		<div
			v-show="fetchError"
			class="alert alert-danger"
			role="alert"
		>
			{{ fetchError }}
		</div>

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
import {ColorPicker} from 'vue3-colorpicker';
import {defineComponent} from 'vue';
import InputSize from './InputSize.vue';
import Loader from './Loader.vue';
import Strings from '../lib/Strings';
import type {ApiPayLoad, Model} from '../types';

const
	MAX_WORDS = 10;

export default defineComponent({
	name: 'InputForm',
	components: {
		ColorPicker,
		InputSize,
		Loader
	},
	data(): Model {
		return {
			heightValue: 100,
			heightUnits: 'px',
			widthValue: 100,
			widthUnits: 'px',
			color: 'black',
			description: '',
			invalidFeedbacks: {},
			apiResult: null,
			result: null,
			isLoading: false,
			pureColor: '',
			gradientColor: '',
			fetchError: ''
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

			if (isFormValid) {
				this.isLoading = true;

				fetch('https://jsonplaceholder.typicode.com/posts', {
					method: 'POST',
					body: JSON.stringify({
						description: Strings.shorten(this.description, MAX_WORDS),
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
					.catch(error => this.fetchError = error)
					.finally(() => this.isLoading = false);
			}
		}
	},
});
</script>
