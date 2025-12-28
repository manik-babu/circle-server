import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use true for port 465, false for port 587
    auth: {
        user: "rsmanik437@gmail.com",
        pass: "2B 0R N0T 2B",
    },
});

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql"
    }),
    trustedOrigins: [process.env.FRONTEND_URL!],
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "USER",
                required: false
            }
        }
    },
    emailAndPassword: {
        enabled: true,
    },
    emailVerification: {
        sendVerificationEmail: async ({ user, url, token }, request) => {
            const info = await transporter.sendMail({
                from: '"Blogger babu" <blog@blog.com>',
                to: "rsmanik99@gmail.com",
                subject: "Hello, Manik",
                text: "Hello world?", // Plain-text version of the message
                html: "<b>Hello world?</b>", // HTML version of the message
            });

            console.log("Message sent:", info.messageId);
        },
    },
});