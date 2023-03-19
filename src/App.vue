<template>
  <header>

  </header>

	<!-- <loader v-if="isLoading" /> -->
	<loader v-if="true" />

  <main>
    <InputForm />
  </main>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useLayout} from './composables/useLayout';
import 'bootstrap/dist/css/bootstrap.css';
import InputForm from './components/InputForm.vue';
import Loader from './components/Loader.vue';

export default defineComponent({
	components: {
		InputForm,
		Loader
	},
	setup() {
		const {isLoading} = useLayout();

		return {
			isLoading
		};
	}
});
</script>
