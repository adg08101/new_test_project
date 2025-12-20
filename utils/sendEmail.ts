// src/email/sendEmail.ts
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ override: true });

type SendEmailInput = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
};

export async function sendEmail({ to, subject, text, html }: SendEmailInput) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false, // true si usás 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM, // "Tu Nombre <tu@mail.com>"
    to,
    subject,
    text,
    html,
  });

  return info.messageId;
}
