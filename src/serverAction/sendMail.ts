"use server"
import { sendMail } from "@/lib/mail";

export const sendMailToRecipient = async (recipientData:any) => {
    await sendMail({
      name: recipientData.name,
      subject: recipientData.subject,
      body: recipientData.body,
    });
  };