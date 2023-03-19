<template>
	<form
		class="form"
		@submit.prevent="onSubmit"
	>
	{{invalidFeedbacks}}
		<div class="row">
			<div class="col-md-3">
				<label>Výška</label>
				<div class="input-group mb-3">
					<input
						type="number"
						class="form-control"
						v-model="heightValue"
						ref="heightValue"
					>

					<select
						class="form-select"
						v-model="heightUnits"
					>
						<option>%</option>
						<option>px</option>
					</select>
					<div
						v-show="invalidFeedbacks['heightValue']"
						class="invalid-feedback" style="display: inline;"
					>
						{{ invalidFeedbacks['heightValue'] }}
					</div>
				</div>

				<label>Šířka</label>
				<div class="input-group mb-3">
					<input
						type="number"
						class="form-control"
						v-model="widthValue"
						ref="widthValue"
					>
					<select
						class="form-select"
						v-model="widthUnits"
					>
						<option>%</option>
						<option>px</option>
					</select>
				</div>
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

export default defineComponent({
	name: 'InputForm',
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
			const value = this.$data[fieldName];

			if (required && !value) {
				this.invalidFeedbacks[fieldName] = 'chybe nevpylneni';
				// console.log(fieldName);
			// }
			}

			return null;
		},
		onSubmit(): void {
			console.log(this.$refs);
			this.validateFieldNumber('heightValue');
		}
	}
});
</script>
