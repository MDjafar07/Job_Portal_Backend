import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: "mdjafarttl@gmail.com",
        pass: "kurm nrpu xpdz hwbv",
    },
});

// const sendEmail = async () => {
//     try {
//         const info = await transporter.sendMail({
//             from: '"TTL Jafar 👻" <mdjafarttl@gmail.com>', // sender address
//             to: "mdjafarshk786@gmail.com", // list of receivers
//             subject: "Hello ✔", // Subject line
//             text: "Hello world?", // plain text body
//             html: "<b>Hello world?</b>", // html body
//         });

//         console.log("Message sent: ", info);
//     }

//     catch (error) {
//         console.log('Error', error);

//     }
// };
// sendEmail();