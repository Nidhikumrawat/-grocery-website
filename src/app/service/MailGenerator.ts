import * as nodemailer from 'nodemailer';

class MailGenerator {
    constructor() { }
    generateMail(userEmailId, password) {
        let fromMail = process.env.EMAIL;
        let toMail = userEmailId;
        let subject = 'One Time Password shooping cart ';
        let text = ` One Time Password is ${password} .Please update your password `

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        // email options
        let mailOptions = {
            from: fromMail,
            to: toMail,
            subject: subject,
            text: text
        };
        transporter.sendMail(mailOptions, (error, response) => {
            if (error) {
                console.log(error);
            }
            console.log(response)
        });
    }
} 
let  mailGenerator:MailGenerator = new MailGenerator()
export default mailGenerator
