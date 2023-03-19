<template>
  <header>

  </header>

	<loader v-if="isLoading" />

  <main>
    <InputForm />
  </main>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useLayout} from './composables/useLayout';
import 'bootstrap/dist/css/bootstrap.css';
import InputForm from './components/InputForm.vue';

export default defineComponent({
	components: {
		InputForm,
	},
	setup() {
		const {isLoading} = useLayout();

		return {
			isLoading
		};
	}
});
</script>
