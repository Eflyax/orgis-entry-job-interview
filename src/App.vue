<template>
	<header>
		<h1>Orgis - VueJS & TypeScript vstupní úloha</h1>
		<hr>
	</header>
  <main>
    <InputForm />
  </main>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import 'bootstrap/dist/css/bootstrap.css';
import InputForm from './components/InputForm.vue';

export default defineComponent({
	components: {
		InputForm
	}
});
</script>
