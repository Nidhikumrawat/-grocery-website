import * as nodemailer from 'nodemailer';

export default function generateMail(userEmailId,password){
    let fromMail = 'patilpallavi059@gmail.com';
            let toMail = userEmailId;
            let subject = 'One Time Password shooping cart ';
            let text = ` Please update your password  One Time Password is ${password}`

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'patilpallavi059@gmail.com',
                    pass: 'Pallavi05@#'
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