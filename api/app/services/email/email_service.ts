import nodemailer from 'nodemailer';
import env from '../../configs/env';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

// Configuração do transporte
const createTransporter = () => {
    const transporter = nodemailer.createTransport({
        host: env.EMAIL_HOST,
        port: env.EMAIL_PORT,
        secure: env.EMAIL_SECURE,
        auth: {
            user: env.EMAIL_USER,
            pass: env.EMAIL_PASSWORD,
        }
    });

    return transporter;
};

// Função para verificar a configuração do email
const verifyEmailConfig = async () => {
    const transporter = createTransporter();
    try {
        await transporter.verify();
        return true;
    } catch (error) {
        throw error;
    }
};

// Função para enviar email
export const sendEmail = async (
    to: string, 
    subject: string, 
    text: string, 
    html?: string
): Promise<SMTPTransport.SentMessageInfo> => {
    // Verifica a configuração antes de tentar enviar
    await verifyEmailConfig();

    const transporter = createTransporter();
    const mailOptions = {
        from: env.EMAIL_USER,
        to,
        subject,
        text
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        throw error;
    }
};