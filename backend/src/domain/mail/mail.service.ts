import { Injectable } from '@nestjs/common';
import { Speaker } from '@modules/speaker/speaker.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { Talk } from '@modules/talk/talk.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendSubmittedTalkConfirmation(talk: Talk, speaker: Speaker) {
    await this.mailerService.sendMail({
      to: speaker.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Submitted talk to BiznagaFest',
      template: './talk-confirmation',
      context: {
        name: speaker.name,
        title: talk.title,
      },
    });
  }

  async sendSubmissionNotification(talk: Talk, speaker: Speaker) {
    await this.mailerService.sendMail({
      to: 'nyablk97@gmail.com',
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Submitted talk to BiznagaFest',
      template: './new-submission',
      context: {
        name: speaker.name,
        title: talk.title,
        abstract: talk.abstract,
        language: talk.language,
        level: talk.level,
        comments: talk.comments,
      },
    });
  }
}
