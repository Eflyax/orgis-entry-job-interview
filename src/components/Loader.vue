<template>
	<div class="lds-dual-ring">aakak</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
	name: 'Loader'
});
</script>

<style scoped>
.lds-dual-ring {
	background: rgba(#f0f, 0.5);
	height: 100%;
	left: 0;
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 2000;
}

.lds-dual-ring:after {
	animation: lds-dual-ring 1.2s linear infinite;
	border-radius: 50%;
	border: 6px solid #0ff;
	border-color: #0ff transparent #0ff transparent;
	content: " ";
	display: block;
	height: 64px;
	margin: 8px;
	width: 64px;
}
@keyframes lds-dual-ring {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

</style>
