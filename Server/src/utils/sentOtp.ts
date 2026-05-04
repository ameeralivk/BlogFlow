// import nodemailer from "nodemailer";
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS, // App password here
//   },
// });
// export const sendOtpEmail = async (email: string, otp: string) => {
//   try {
//     await transporter.sendMail({
//       from: `"No Reply" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Your OTP Code",
//       text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
//     });

//     return { success: true };
//   } catch (error) {
//     console.error("Email error:", error);
//     return { success: false };
//   }
// };

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// 🔥 DEBUG: SMTP connection check
transporter.verify((error, success) => {
  if (error) {
    console.log("❌ SMTP NOT READY:", error);
  } else {
    console.log("✅ SMTP READY - Email server connected");
  }
});

export const sendOtpEmail = async (email: string, otp: string) => {
  try {
    console.log("📩 [OTP FLOW] Function started");
    console.log("📨 Sending OTP to:", email);
    console.log("🔑 OTP Generated:", otp);

    const mailOptions = {
      from: `"No Reply" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    };

    console.log("🚀 [SMTP] Sending email now...");

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ EMAIL SENT SUCCESSFULLY");
    console.log("📨 Message ID:", info.messageId);
    console.log("📤 Response:", info.response);

    return { success: true };
  } catch (error: any) {
    console.log("❌ EMAIL FAILED");
    console.log("⚠️ Error Name:", error?.name);
    console.log("⚠️ Error Message:", error?.message);
    console.log("⚠️ Full Error:", error);

    return { success: false };
  }
};