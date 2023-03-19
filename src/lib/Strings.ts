export class Strings {
	static shorten(input: string, maxWords = 10): string {
		return input
			.split(' ')
			.slice(0, maxWords)
			.join(' ');
	}
};

export default Strings;
