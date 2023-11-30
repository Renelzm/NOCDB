import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";



interface SendLogsEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>;
}


export class SendLogsEmail implements SendLogsEmailUseCase {

    constructor(
        private  emailService: EmailService,
        private readonly logRepository: LogRepository
    ){
    }
   async execute(to: string | string[]): Promise<boolean>{

    try {
         const sent = await this.emailService.sendEmailWithSystemLogs(to);
       if (!sent){
        throw new Error('Error al enviar el correo')
       }
       const log = new LogEntity ({
        message: `Envio correcto de mail`,
        level: LogSeverityLevel.low,
        origin: 'SendLogsEmailUseCase',
        createdAt: new Date()
    })
    this.logRepository.saveLog(log)
       return true;
    } catch (error) {
        const log = new LogEntity ({
            message: `${error}`,
            level: LogSeverityLevel.high,
            origin: 'SendLogsEmailUseCase',
            createdAt: new Date()
        })
        this.logRepository.saveLog(log)
        return false;
    }
   
   }

}