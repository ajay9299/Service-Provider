//Nodemailer
import nodemailer from "nodemailer";

//GLOBAL VARIABLES
import { mail, emailTemplate, ResetPassword } from "../constant";

//handlesbars
import * as handlebars from "handlebars";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: mail.AUTH_EMAIL,
    pass: mail.AUTH_PASS,
  },
});
export const isEmailServiceReady = (userEVId: string, userEmail: string) => {
  transporter.verify((error, success) => {
    if (error) return console.log(error);
  });
  let template = handlebars.compile(emailTemplate.VERIFICATION_TEMPLATE);
  //userEVId
  let replacements = {
    userEVId: userEVId,
  };
  const htmlToSend = template(replacements);
  var details = {
    from: "Abhishek",
    to: userEmail,
    subject: "Email Verification",
    html: htmlToSend,
  };
  transporter.sendMail(details, (err) => {
    if (err) return console.log("ERROR :>", err);
    console.log("SENT EMAIL");
  });
};

export const resetPasswordEmail = (
  passwordResetId: string,
  userEmail: string
) => {
  transporter.verify((error, success) => {
    if (error) return console.log(error);
  });
  let template = handlebars.compile(ResetPassword.RESET_PASSWORD);
  //userEVId
  let replacements = {
    resetId: passwordResetId,
  };
  const htmlToSend = template(replacements);
  var details = {
    from: "Abhishek",
    to: userEmail,
    subject: "Password Reset",
    html: htmlToSend,
  };
  transporter.sendMail(details, (err) => {
    if (err) return console.log("ERROR :>", err);
  });
};
