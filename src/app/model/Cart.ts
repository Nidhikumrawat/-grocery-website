export class Cart {
    id: number
    email: string
    productid: number
    totalprice:number

    constructor() {
        this.id = 0
        this.email = null
        this.productid = 0
        this.totalprice = 0
    }

    setId(id: number) {
        this.id = id
    }

    setEmail(email: string) {
        this.email = email
    }

    setProductId(productid: number) {
        this.productid = productid
    }
  
    setTotalPrice(totalprice:number){
        this.totalprice=totalprice
    }

    getId(): number {
        return this.id
    }

    getEmail(): string {
        return this.email
    }

    getProductId(): number {
        return this.productid
    }
    getTotalPrice():number{
        return this.totalprice
    }
}