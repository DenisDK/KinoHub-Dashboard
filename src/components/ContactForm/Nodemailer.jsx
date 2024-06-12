import nodemailer from "nodemailer";

export async function sendMail({
   mail,
   mailPass,
   subject,
   message,
   body,
}) {

   const transport = nodemailer.createTransport ({
      service: 'gmail',
      auth: {
         user: mail,
         pass: mailPass,
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
         from: mail,
         to: 'artem.shaparenko1@nure.ua, oleksandr.stavytskyi@nure.ua, serhii.kryvoshapko@nure.ua, denys.kushniruk@nure.ua',
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