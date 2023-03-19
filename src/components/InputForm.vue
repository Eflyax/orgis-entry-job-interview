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

		<div>
			<hr>
			<h2>Výsledek</h2>

			<pre>
				{{ $data }}
			</pre>
		</div>
	</form>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import InputSize from './InputSize.vue';

export default defineComponent({
	name: 'InputForm',
	components: {
		InputSize
	},
	props: {
		msg: String
	},
	data() {
		return {
			heightValue: 10,
			heightUnits: 'px',
			widthValue: 1,
			widthUnits: 'px',
			color: '#FFFFFF',
			description: '',
			invalidFeedbacks: {}
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
				isFormValid = Object.values(this.invalidFeedbacks).every(x => x === null || x === '');

			if (isFormValid) {
				// todo -send value to API
			}
		}
	}
});
</script>
