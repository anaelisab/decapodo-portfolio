import type { Handler } from "@netlify/functions";
import nodemailer from "nodemailer";

const headers = {
  "access-control-allow-origin": "*",

  "access-control-allow-headers": "Content-Type",

  "access-control-allow-methods": "POST, OPTIONS",
};

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,

      headers,

      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,

      headers,

      body: JSON.stringify({ message: "Method not allowed" }),
    };
  }

  if (!event.body) {
    return {
      statusCode: 400,

      headers,

      body: JSON.stringify({ message: "Missing request body" }),
    };
  }

  try {
    const { name, email, subject, message } = JSON.parse(event.body);

    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,

        headers,

        body: JSON.stringify({ message: "Missing required fields" }),
      };
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return {
        statusCode: 400,

        headers,

        body: JSON.stringify({ message: "Invalid email address" }),
      };
    }

    if (
      !process.env.MAIL_HOST ||
      !process.env.MAIL_USER ||
      !process.env.MAIL_PASSWORD
    ) {
      console.error("Missing email configuration");

      return {
        statusCode: 500,

        headers,

        body: JSON.stringify({ message: "Server configuration error" }),
      };
    }

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,

      port: 465,

      secure: true,

      auth: {
        user: process.env.MAIL_USER,

        pass: process.env.MAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Contact Form (${name})" <${process.env.MAIL_USER}>`,

      to: process.env.MAIL_USER,

      replyTo: email,

      subject: `Nuevo mensaje: ${subject}`,

      text: message,

      html: `

        <h2>Nuevo mensaje de contacto</h2>

        <p><strong>Nombre:</strong> ${name}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Tipo de proyecto:</strong> ${subject}</p>

        <p><strong>Mensaje:</strong></p>

        <p>${message.replace(/\n/g, "<br>")}</p>

      `,
    });

    return {
      statusCode: 200,

      headers,

      body: JSON.stringify({ message: "Email sent successfully" }),
    };
  } catch (error) {
    console.error("Error sending email:", error);

    return {
      statusCode: 500,

      headers,

      body: JSON.stringify({
        message: "Failed to send email. Please try again later.",
      }),
    };
  }
};
