// // import nodemailer from "nodemailer";
// // const transporter = nodemailer.createTransport({
// //   service: "gmail",
// //   auth: {
// //     user: process.env.EMAIL_USER,
// //     pass: process.env.EMAIL_PASS, // App password here
// //   },
// // });
// // export const sendOtpEmail = async (email: string, otp: string) => {
// //   try {
// //     await transporter.sendMail({
// //       from: `"No Reply" <${process.env.EMAIL_USER}>`,
// //       to: email,
// //       subject: "Your OTP Code",
// //       text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
// //     });

// //     return { success: true };
// //   } catch (error) {
// //     console.error("Email error:", error);
// //     return { success: false };
// //   }
// // };

// import nodemailer from "nodemailer";
// import dns from "dns";

// dns.setDefaultResultOrder("ipv4first");

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // SMTP check
// transporter.verify((error) => {
//   if (error) {
//     console.log("❌ SMTP NOT READY:", error);
//   } else {
//     console.log("✅ SMTP READY - Email server connected");
//   }
// });

// export const sendOtpEmail = async (email: string, otp: string) => {
//   try {
//     console.log("📩 [OTP FLOW] Function started");
//     console.log("📨 Sending OTP to:", email);
//     console.log("🔑 OTP Generated:", otp);

//     const info = await transporter.sendMail({
//       from: `"No Reply" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Your OTP Code",
//       text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
//     });

//     console.log("✅ EMAIL SENT SUCCESSFULLY");
//     console.log("📨 Message ID:", info.messageId);

//     return { success: true };
//   } catch (error: any) {
//     console.log("❌ EMAIL FAILED");
//     console.log("⚠️ Error:", error?.message);

//     return { success: false };
//   }
// };

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendOtpEmail = async (email: string, otp: string) => {
  try {
    console.log("📩 Sending OTP via Resend:", email);

    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: email,
      subject: "Your OTP Code",
      html: `<h2>Your OTP is: ${otp}</h2><p>It expires in 5 minutes</p>`,
    });

    console.log("✅ Email sent:", data);

    return { success: true };
  } catch (error) {
    console.log("❌ Resend error:", error);
    return { success: false };
  }
};
