export class Product {
    id: number
    name: string
    description: string
    price: number

    constructor() {
        this.id = 0
        this.name = null
        this.description = null
        this.price = 0
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
 
}