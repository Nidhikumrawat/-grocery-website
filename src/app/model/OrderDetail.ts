import { string } from "joi"

export class OrderDetail {
    id: number
    name: string
    email: string
    phoneno: number
    productname: string
    description: string
    totalprice: number
    orderid: string
    status: string
    address: string
    price:number
    quantity:number
    createdAt: Date


    constructor() {
        this.id = 0
        this.name = null
        this.email = null
        this.phoneno = 0
        this.productname = null
        this.description = null
        this.totalprice = 0
        this.orderid = null
        this.status = null
        this.address = null
        this.price = 0
        this.quantity = 0
        this.createdAt = null
    }

    setId(id: number) {
        this.id = id
    }
    setName(name: string) {
        this.name = name
    }
    setEmail(email: string) {
        this.email = email
    }
    setPhoneno(phoneno: number) {
        this.phoneno = phoneno
    }
    setProductName(productname: string) {
        this.productname = productname
    }
    setDescription(description: string) {
        this.description = description
    }
    setTotalPrice(totalprice: number) {
        this.totalprice = totalprice
    }
    setPrice(price: number) {
        this.price = price
    }
    setQuantity(quantity: number) {
        this.quantity = quantity
    }
    setStatus(status: string) {
        this.status = status
    }
    setCreatedAt(createdAt: Date) {
        this.createdAt = createdAt
    }
    setOrderid(orderid: string){
        this.orderid = orderid
    }
    setAddress(address: string){
        this.address = address
    }

    getId(): number {
        return this.id
    }
    getName(): string {
        return this.name
    }
    getEmail(): string {
        return this.email
    }
    getPhoneno(): number {
        return this.phoneno
    }
    getProductName(): string {
        return this.productname
    }
    getDescription(): string {
        return this.description
    }
    getTotalPrice(): number {
        return this.totalprice
    }
    getQuantity():number{
        return this.quantity
    }
    getPrice():number{
        return this.price
    }
    getStatus(): string {
        return this.status
    }
    getOrderid():string {
        return this.orderid
    }
    getCreatedAt(): Date {
        return this.createdAt
    }
    getAddress(): string {
        return this.address
    }
}
