export interface Food {
    name: string,
    type: string,
    description: string,
    taste: string,
    weightInKg: number,
    url: string,
    stock: number,
    price: number,
    reviews: {
        star: number,
        reviewers: string
    },
    order: number
}