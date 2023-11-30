import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';
import { SendLogsEmail } from '../domain/use-cases/email/send-email-logs';



const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource(),
);
const emailService = new EmailService();

export class Server {

  public static start() {

    console.log( 'Server started...' );
    // Mandar Mail
  
;
    // const emailServiceUseCase = new SendLogsEmail(emailService, fileSystemLogRepository);
    // const sent = emailServiceUseCase.execute('rene.lazalde@gmail.com');
    // if (!sent){
    //   console.log( 'Error sending email' );
    // } else {
    //   console.log( 'Email sent' );
    // }

    // CronService.createJob(
    //   '*/5 * * * * *',
    //   () => {
    //     const url = 'https://google.com';
    //     new CheckService(
    //       fileSystemLogRepository,
    //       () => console.log( `${ url } is ok` ),
    //       ( error ) => console.log( error ),
    //     ).execute( url );
    //     // new CheckService().execute( 'http://localhost:3000' );
        
    //   }
    // );


  }


}


