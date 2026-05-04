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

/**
 * SMTP transporter (production-safe config)
 */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // IMPORTANT for port 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

/**
 * Optional: verify SMTP connection on server start
 * (good for debugging in Render logs)
 */
transporter.verify((error, success) => {
  if (error) {
    console.log("❌ SMTP Error:", error);
  } else {
    console.log("✅ SMTP Ready");
  }
});

/**
 * Send OTP Email (NON-BLOCKING version)
 */
export const sendOtpEmail = async (email: string, otp: string) => {
  try {
    // ❗ DO NOT await — prevents API delay (fixes modal lag)
    transporter.sendMail({
      from: `"No Reply" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    });

    return { success: true };
  } catch (error) {
    console.error("❌ Email error:", error);
    return { success: false };
  }
};
