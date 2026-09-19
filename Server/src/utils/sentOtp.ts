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

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: email,
      subject: "Your OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; color: #1e293b;">
          <h2 style="margin-bottom: 8px;">BlogFlow verification code</h2>
          <p>Use the code below to continue. It expires in 5 minutes.</p>
          <p style="font-size: 28px; font-weight: bold; letter-spacing: 4px; margin: 24px 0;">${otp}</p>
          <p style="color: #64748b; font-size: 13px;">If you didn't request this code, you can safely ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="color: #94a3b8; font-size: 12px;">BlogFlow &middot; This is an automated message, please don't reply.</p>
        </div>
      `,
      text: `BlogFlow verification code: ${otp}\n\nThis code expires in 5 minutes. If you didn't request it, you can ignore this email.\n\n- BlogFlow`,
    });

    if (error) {
      console.log("❌ Resend rejected the send:", error);
      return { success: false };
    }

    console.log("✅ Email sent:", data);
    return { success: true };
  } catch (error) {
    console.log("❌ Resend error:", error);
    return { success: false };
  }
};
