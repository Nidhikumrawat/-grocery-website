export class Order {
    id: number
    user_id: number
    order_id: string
    status: string
    total_order_amount: number
    createdAt: Date

    constructor() {
        this.id = 0
        this.user_id = 0
        this.order_id = null
        this.createdAt = null
        this.total_order_amount = 0
    }

    setId(id: number) {
        this.id = id
    }

    setUserId(user_id: number) {
        this.user_id = user_id
    }

    setStatus(status: string) {
        this.status = status
    }
    setOrderid(order_id: string) {
        this.order_id = order_id
    }
    setTotalOrderAmount(total_order_amount: number) {
        this.total_order_amount = total_order_amount
    }

    setCreatedAt(createdAt: Date) {
        this.createdAt = createdAt
    }

    getId(): number {
        return this.id
    }

    getUserId(): number {
        return this.user_id
    }

    getOrderid(): string {
        return this.order_id
    }
    getStatus(): string {
        return this.status
    }
    getTotalOrderAmount(): number {
        return this.total_order_amount
    }
    getCreatedAt(): Date {
        return this.createdAt
    }
}