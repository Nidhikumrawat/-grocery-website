import bcrypt from 'bcrypt'

export class EncryptPassword {
    constructor() { }

    async encrpytPassword(password) {
        let saltRounds: number = 10;
        let salt = await bcrypt.genSalt(10);
        let encryptedpassword: string = await bcrypt.hash(password, salt);
        return encryptedpassword;
    }

    async validatePassword(passwordEnteredByUser, hash) {
        let validPassword: boolean = bcrypt.compareSync(passwordEnteredByUser, hash)
        return validPassword;
    }
}

const encryptPassword: EncryptPassword = new EncryptPassword()
export default encryptPassword