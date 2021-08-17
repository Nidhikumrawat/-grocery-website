import { string } from "joi"

export class OrderDetail {
    id: number
    order_id: string
    product_id: number
   
    constructor() {
        this.id = 0  
        this.order_id = null
        this.product_id = 0
        
    }
    setId(id: number) {
        this.id = id
    }
    setOrderid(order_id: string){
        this.order_id = order_id
    }
    setProductId(product_id: number){
        this.product_id = product_id
    }
    getId(): number {
        return this.id
    }
    getOrderid():string {
        return this.order_id
    }
    getProductId(): number{
        return this.product_id
    }
   
}
