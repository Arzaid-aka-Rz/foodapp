
import nodemailer from 'nodemailer';
import { generateWelcomeEmailHtml } from './htmlEmail';


export const sendVerificationEmail = async (email: string, verificationToken: string) => {
    // Define the HTML content for the verification email
    const emailHtml = `
        <p>Hi,</p>
        <p>Your OTP for email verification is: <strong>${verificationToken}</strong></p>
        <p>It is valid for 24 hours.</p>
        <p>Regards,</p>
        <p>Food - Hub Team</p>
    `;

    // Define the function to send the email
    const mailSender = async (email: string, subject: string, html: string) => {
        try {
            // Create a transport object using SMTP transport
            let transporter = nodemailer.createTransport({
                host: process.env.MAIL_HOST,
                port: Number(process.env.MAIL_PORT) || 587, // Ensure port is defined
                secure: process.env.MAIL_SECURE === 'true', // Use true if port is 465
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                }
            });

            // Send the email
            let info = await transporter.sendMail({
                from: 'Food - Hub <no-reply@foodhub.com>', 
                to: email,
                subject: subject,
                html: html,
            });

            console.log("Email sent successfully:", info);
            return info;
        } catch (error) {
            console.error("Error sending email:", error);
            throw new Error("Failed to send email");
        }
    };

    // Call the mailSender function
    try {
        await mailSender(email, 'Verify Your Email', emailHtml);
    } catch (error) {
        console.log("Error sending verification email:", error);
        throw new Error("Failed to send email verification");
    }
};



export const sendWelcomeEmail = async (email: string, name: string) => {
    const htmlContent = generateWelcomeEmailHtml(name);
    try {
        // Create a transport object using SMTP transport
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT) || 587, // Ensure port is defined
            secure: process.env.MAIL_SECURE === 'true', // Use true if port is 465
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        // Send the email
        let info = await transporter.sendMail({
            from: 'Food - Hub <no-reply@foodhub.com>', // Ensure you use a valid sender address
            to: email,
            subject: 'Welcome to Arzaid Food-Hub',
            html: htmlContent,
        });

        console.log("Email sent successfully:", info);
        return info;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to send welcome email");
    }
};


// Function to generate HTML content for password reset email
const generatePasswordResetEmailHtml = (resetURL: string) => `
  <p>Hi,</p>
  <p>You requested a password reset. Click the link below to reset your password:</p>
  <a href="${resetURL}">Reset Password</a>
  <p>This link is valid for 1 hour.</p>
  <p>If you didn't request this, please ignore this email.</p>
  <p>Regards,</p>
  <p>Food-Hub Team</p>
`;

// Function to send password reset email
export const sendPasswordResetEmail = async (email: string, resetURL: string) => {
    const recipient = [{ email }];
    const htmlContent = generatePasswordResetEmailHtml(resetURL);

    try {
        // Create a transport object using SMTP transport
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT) || 587, // Ensure port is defined
            secure: process.env.MAIL_SECURE === 'true', // Use true if port is 465
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        // Send the password reset email
        let info = await transporter.sendMail({
            from: 'Food - Hub <no-reply@foodhub.com>', // Ensure you use a valid sender address
            to: email, // Recipient's email
            subject: 'Reset your password',
            html: htmlContent, // HTML content for email
        });

        console.log("Password reset email sent successfully:", info);
        return info;
    } catch (error) {
        console.error("Error sending password reset email:", error);
        throw new Error("Failed to send password reset email");
    }
};


// Function to generate HTML content for password reset success email
const generateResetSuccessEmailHtml = () => `
  <p>Hi,</p>
  <p>Your password has been successfully reset.</p>
  <p>If you did not perform this action, please contact our support team immediately.</p>
  <p>Regards,</p>
  <p>Food-Hub Team</p>
`;


// Function to send password reset success email
export const sendResetSuccessEmail = async (email: string) => {
    const htmlContent = generateResetSuccessEmailHtml();

    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT) || 587,
            secure: process.env.MAIL_SECURE === 'true',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        let info = await transporter.sendMail({
            from: 'Food - Hub <no-reply@foodhub.com>',
            to: email,
            subject: 'Password Reset Successfully',
            html: htmlContent,
        });

        console.log("Password reset success email sent successfully:", info);
        return info;
    } catch (error) {
        console.error("Error sending password reset success email:", error);
        throw new Error("Failed to send password reset success email");
    }
};
