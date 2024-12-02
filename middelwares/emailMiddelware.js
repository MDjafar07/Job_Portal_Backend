import { Verification_Email_Template, Welcome_Email_Template } from "./emailTemplate.js";
import { transporter } from "./nodemailerMiddelware.js";


export const sendVerificationEamil = async (email, verificationToken) => {
    try {

        const response = await transporter.sendMail({
            from: '"TTL Jafar 👻" <mdjafarttl@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Verify Your Email... ✔", // Subject line
            text: "Verify Your Email... ", // plain text body
            html: Verification_Email_Template.replace("{verificationToken}", verificationToken), // html body
        });

        console.log("Email Send Succesfully: ", response);
    } catch (error) {
        console.log("Email Error", error);

    }
};


export const welcomeEamil = async (email, name) => {
    try {

        const response = await transporter.sendMail({
            from: '"TTL Jafar 👻" <mdjafarttl@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Welcome Your Email... ✔", // Subject line
            text: "Welcome Your Email... ", // plain text body
            html: Welcome_Email_Template.replace("{name}", name), // html body
        });

        console.log("Email Send Succesfully: ", response);
    } catch (error) {
        console.log("Email Error", error);

    }
};