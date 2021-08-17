export class User {
    id: number
    name: string
    email: string
    phone_no: number
    address: string
    password: string

    constructor() {
        this.id = 0
        this.name = null
        this.email = null
        this.phone_no = 0
        this.address = null
        this.password = null

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

    setPhoneno(phone_no: number) {
        this.phone_no = phone_no
    }
    setAddress(address: string){
        this.address = address
    }

    setPassword(password: string) {
        this.password = password
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
        return this.phone_no
    }

    getPassword(): string {
        return this.password
    }
    getAddress(): string {
        return this.address
    }
}