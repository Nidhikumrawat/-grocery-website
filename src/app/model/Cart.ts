export class Cart {
    id: number
    user_id: number
    product_id: number
    quantity:number

    constructor() {
        this.id = 0
        this.user_id = 0
        this.product_id = 0
        this.quantity = 0
    }

    setId(id: number) {
        this.id = id
    }

    setUserId(user_id: number) {
        this.user_id = user_id
    }

    setProductId(product_id: number) {
        this.product_id = product_id
    }
  
    setQuantity(quantity:number){
        this.quantity=quantity
    }

    getId(): number {
        return this.id
    }

    getUserId(): number {
        return this.user_id
    }

    getProductId(): number {
        return this.product_id
    }
    getQuantity():number{
        return this.quantity
    }
}