import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
export async function POST(req: NextRequest) {
  
  try {
    const { name, email, phoneNumber, message } = await req.json();
    const transporter = nodemailer.createTransport({
      host: 'mail.candelasoft.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: email,
      to: 'hi@candelasoft.com',
      subject: `Mensaje de ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phoneNumber}\n\nMensaje:\n${message}`,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Correo enviado correctamente' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al enviar el correo' }, { status: 500 });
  }
}
