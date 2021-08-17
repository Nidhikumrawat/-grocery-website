export class Connect {
    id: number
    name: string
    email: string
    subject: string
    message: string

    constructor() {
        this.id = 0
        this.name = null
        this.email = null
        this.subject = null
        this.message = null

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
    setSubject(subject: string) {
        this.subject = subject
    }
    setMessage(message: string) {
        this.message = message
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

    getSubject(): string {
        return this.subject
    }

    getMessage(): string {
        return this.message
    }
}