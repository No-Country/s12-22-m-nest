import { Injectable, InternalServerErrorException } from '@nestjs/common'
import * as nodemailer from 'nodemailer'
import type MailData from './mailData.interface'

@Injectable()
export class MailerService {
  public async sendMail(mailInfo: MailData) {
    try {
      // transport:
      const transport = nodemailer.createTransport({
        service: 'outlook',
        secure: false,
        auth: {
          user: process.env.MAILER_MAIL,
          pass: process.env.MAILER_PASS
        }
      })
      // message:
      const mail = {
        from: process.env.MAILER_MAIL,
        to: mailInfo.receiverMail,
        subject: mailInfo.header,
        text: mailInfo.body
      }

      // send mail:
      transport.sendMail(mail, (error, info) => {
        if (error) {
          throw new InternalServerErrorException(error.message)
        }
      })
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
