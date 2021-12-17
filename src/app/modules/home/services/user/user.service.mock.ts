export let data = generateMockData();

function generateMockData(): string {
	return '';
}

export function update(value: string): void {
	data = value;
}
