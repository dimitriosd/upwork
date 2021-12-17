import { Country } from 'src/app/modules/home/models/country.model';

export let countriesMock = generateMockCountries();

function generateMockCountries(): Country[] {
	return [
		{ name: 'Argentina', code: 'AR' },
		{ name: 'Brazil', code: 'BR' },
		{ name: 'Canada', code: 'CA' },
		{ name: 'France', code: 'FR' },
		{ name: 'French Polynesia', code: 'PF' },
		{ name: 'Germany', code: 'DE' },
		{ name: 'Gibraltar', code: 'GI' },
		{ name: 'Greece', code: 'GR' },
		{ name: 'Italy', code: 'IT' },
		{ name: 'United Kingdom', code: 'GB' },
		{ name: 'United States', code: 'US' }
	];
}
