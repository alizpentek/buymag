export interface Stuff{
    name: string,
	url: string,
	description: string,
	weightInKg: number,
	stock: number,
	reviews: {
        star: number,
        reviewers: string
    },
	price: number,
	order: number,
}