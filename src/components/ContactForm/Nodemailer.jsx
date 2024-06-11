import nodemailer from "nodemailer";

export async function sendMail({
   mail,
   subject,
   message,
   body,
}) {
   const { EMAIL, EMAIL_PASS } = process.env;

   const transport = nodemailer.createTransport ({
      service: 'gmail',
      auth: {
         user: EMAIL,
         pass: EMAIL_PASS,
      },
   });
   try {
      const testResult = await transport.verify
      console.log(testResult);
   }
   catch(error){
      console.log(error);
      return;
   }
   try{
      const sendResult = await transport.sendMail({
         from: EMAIL,
         to: EMAIL,
         subject: subject,
         text: message,
         html: body
      })
      console.log(sendResult);
   }
   catch(error){
      console.log(error);
   }
}