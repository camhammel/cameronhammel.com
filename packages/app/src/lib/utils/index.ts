export function formatDate(date: string) {
	return new Date(date).toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	});
}

// rounding the image width to the nearest 100px helps to improve the cache hit rate
export function getRoundedImageWidth(
	width: number,
	viewportPercentage: number = 50,
	roundingAmount: number = 100
) {
	return Math.ceil((width * 2 * (viewportPercentage / 100)) / roundingAmount) * roundingAmount;
}
