import nodemailer from 'nodemailer'

export async function sendMail({ subject, body}:{name:string;subject:string;body:string}){
    const {SMTP_EMAIL, SMTP_PASSWORD} = process.env

    const transport = nodemailer.createTransport({
        service:"gmail",
        auth: {
          user: SMTP_EMAIL,
          pass: SMTP_PASSWORD
          
        },
      });

      try{
        const testResult = await transport.verify();
        console.log(testResult)
      }catch(error){
        console.log(error)
        return                        
      }

      try{
        const sendResult = transport.sendMail({
          from: SMTP_EMAIL,
          to: 'info@redpositive.in',
          subject,
          html: body
        })
        console.log(sendResult)

        return sendResult
      }catch(error){
        console.log(error)
      }
}