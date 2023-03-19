<template>
	<label :for="'input' + name">{{ label }}</label>
	<div class="input-group mb-3">
		<input
			type="text"
			:id="'input' + name"
			:class="[
				'form-control',
				error ? 'is-invalid' : ''
			]"
			v-model="value"
		>
		<select
			class="form-select"
			v-model="units"
		>
			<option>%</option>
			<option>px</option>
		</select>
		<div
			v-show="error"
			class="invalid-feedback" style="display: inline;"
		>
		<!-- todo - remove inline style -->
			Chyba: {{ error }}
		</div>
	</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
	name: 'InputSize',
	props: {
		name: String,
		error: String,
		sizeValue: String,
		sizeUnits: {
      type: String,
      default: 'px'
    }
	},
	data() {
		return {
			value: 0,
			units: ''
		}
	},
	mounted() {
		this.value = this.$props.sizeValue;
		this.units = this.$props.sizeUnits;
	},
	watch: {
		value(newValue) {
			this.$emit('change-value', newValue);
		}
	}
});
</script>
