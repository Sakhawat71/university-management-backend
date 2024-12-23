import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (email : string, link : string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: config.NODE_ENV === 'production',
        auth: {
            user: "sakhawat.showrav@gmail.com",
            pass: "etan fofg ilph qtsi",
        },
    });

    await transporter.sendMail({
        from: '"PH University" <sakhawat.showrav@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Password Reset Request", // Subject line
        text: `You have requested to reset your password. Please use the link below : link`, // plain text body
        html: `<p>You have requested to reset your password. Please use the link below: </p>
        <a href=${link} target="_blank">Reset Password</a>`, // html body
    });
    
};