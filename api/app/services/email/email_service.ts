import nodemailer from 'nodemailer';
import env from '../../configs/env';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

// Configuração do transporte
const transporter = nodemailer.createTransport({
    host: env.EMAIL_HOST, // Substitua pelo seu host SMTP
    port: env.EMAIL_PORT, // Porta do servidor SMTP
    secure: env.EMAIL_SECURE, // true para 465, false para outras portas
    auth: {
        user: env.EMAIL_USER, // Seu email
        pass: env.EMAIL_PASSWORD, // Sua senha
    }
});

// Função para enviar email
export const sendEmail = async (to: string, subject: string, text: string, html?: string): Promise<SMTPTransport.SentMessageInfo> => {
    const mailOptions = {
        from: env.EMAIL_USER, // Seu email
        to,
        subject,
        text,
        html
    };
    return await transporter.sendMail(mailOptions);
};
