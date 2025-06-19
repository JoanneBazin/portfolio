import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { contactSchema, validateWithSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const body = await request.json();

  const validation = validateWithSchema(contactSchema, body);
  if (!validation.success || !validation.data) {
    return NextResponse.json(
      {
        error: "Erreur de format lors de l'envoi de la requête",
      },
      { status: 400 }
    );
  }

  const { name, email, message } = validation.data;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${email}" <${email}>`,
      to: process.env.SMTP_EMAIL,
      subject: `Message depuis le portfolio`,
      html: `
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Message :</strong> ${message}</p>
        `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Erreur serveur lors de l'envoi du mail" },
      { status: 500 }
    );
  }
}
