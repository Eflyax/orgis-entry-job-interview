import {ref} from 'vue';

export const useLayout = () => {
  const isLoading = ref(false);


	// function getCart(): Promise<ICart> {

	function setLoading(value: boolean): void {
		isLoading.value = value;
	};

	return {
		setLoading,
		isLoading
	};
}
