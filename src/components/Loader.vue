<template>
	<div class="loader" />
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
	name: 'Loader'
});
</script>

<style scoped>
.loader {
	background-color: rgba(65, 65, 65, 0.8);
	bottom:0;
	left:0;
	position:fixed;
	right:0;
	top:0;
	z-index: 2000;
}

.loader:after {
	animation: loader 1.2s linear infinite;
	border: 6px solid #0ff;
	border-color: #0ff transparent #0ff transparent;
	border-radius: 50%;
	content: " ";
	display: block;
	height: 100px;
	left: calc(50% - 50px);
	margin: 8px;
	position: relative;
	top: calc(50% - 50px);
	width: 100px;
}

@keyframes loader {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

</style>
