export class Product {
    id: number
    name: string
    description: string
    price: number
    image_url: string
    product_unit: string

    constructor() {
        this.id = 0
        this.name = null
        this.description = null
        this.price = 0
        this.image_url = null
        this.product_unit = null
    }

    setId(id: number) {
        this.id = id
    }

    setName(name: string) {
        this.name = name
    }

    setDescription(description: string) {
        this.description = description
    }

    setPrice(price: number) {
        this.price = price
    }

    setImageUrl(image_url: string) {
        this.image_url = image_url
    }

    setProductUnit(product_unit: string) {
        this.product_unit = product_unit
    }

    getId(): number {
        return this.id
    }

    getName(): string {
        return this.name
    }

    getDescription(): string {
        return this.description
    }

    getPrice(): number {
        return this.price
    }
    getImageUrl(): string {
        return this.image_url
    }
    getProductUnit(): string {
        return this.product_unit
    }

}