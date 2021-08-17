export class Order {
    id: number
    email: string
    productid: number
    orderid: string
    createdAt: Date

    constructor() {
        this.id = 0
        this.email = null
        this.productid = 0
        this.orderid = null
        this.createdAt = null
    }

    setId(id: number) {
        this.id = id
    }
    
    setProductid(productid: number) {
        this.productid = productid
    }

    setOrderid(orderid: string) {
        this.orderid = orderid
    }

    setEmail(email: string) {
        this.email = email
    }

    setCreatedAt(createdAt: Date) {
        this.createdAt = createdAt
    }

    getId(): number {
        return this.id
    }

    getProductid(): number {
        return this.productid
    }

    getEmail(): string {
        return this.email
    }

    getOrderid(): string {
        return this.orderid
    }

    getCreatedAt(): Date {
        return this.createdAt
    }
}