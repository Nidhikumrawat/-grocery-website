export class User {
    id: number
    name: string
    email: string
    phoneno: number
    address: string
    password: string

    constructor() {
        this.id = 0
        this.name = null
        this.email = null
        this.phoneno = 0
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

    setPhoneno(phoneno: number) {
        this.phoneno = phoneno
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
        return this.phoneno
    }

    getPassword(): string {
        return this.password
    }
    getAddress(): string {
        return this.address
    }
}