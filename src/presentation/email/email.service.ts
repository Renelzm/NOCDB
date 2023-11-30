import nodemailer  from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

interface sendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}

interface Attachment { 
    filename: string;
    path: string;
}


export class  EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    });


    async sendEmail( options: sendMailOptions):Promise<boolean>{
       
        const { to, subject, htmlBody, attachments} = options
       
        try {

            const sendInformation = await this.transporter.sendMail({ 
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments,
            });
            return true;
        } catch (error) {
            return false;
        }
    }

   async sendEmailWithSystemLogs(to: string | string[]){
        const subject = 'Logs del servidot'
        const htmlBody = `<h3>Body Correo</h3>
        <p>Hola, este es un correo de prueba</p>`
        const attachments = [
            { filename: 'logs-all.log', path: './logs/logs-all.log'},
            { filename: 'logs-medium.log', path: './logs/logs-medium.log'},
            { filename: 'logs-high.log', path: './logs/logs-high.log'},
        ];
        return this.sendEmail({
            to,
            subject,
            htmlBody,
            attachments
        })

    }
}

