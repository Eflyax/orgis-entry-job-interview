import {describe, it, expect} from 'vitest';
import Strings from '../../src/lib/Strings';

describe('Validate output lenght', () => {
	it('Validate max words', () => {
		const
			input = 'one two three four five six';

		expect(Strings.shorten(input, 0)).toBe('');
		expect(Strings.shorten(input, 2)).toBe('one two');
		expect(Strings.shorten(input, 6)).toBe(input);
		expect(Strings.shorten(input, 100)).toBe(input);
	});

	it('Empty input', () => {
		const
			input = '';

		expect(Strings.shorten(input, 2)).toBe('');
	});
})
