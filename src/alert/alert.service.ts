import { Injectable } from '@nestjs/common';
import { Doc } from 'src/docs/entities/doc.entity';
import { User } from 'src/users/entities/user.entity';

type Message = string;

@Injectable()
export class AlertService {
  alertSigner(user: User, doc: Doc) {
    return `Alerting ${user.email} to sign the document: ${doc.title}`;
  }
  alertOwnerSigned(doc: Doc) {
    return `Alerting ${doc.owner}: the document:${document.title} is signed.`;
  }
  alertOwnerSignError(user: Partial<User>, doc: Doc, err: Message) {
    return `Alerting ${doc.owner}: there was an error in signing by user:${user.email} for the document: ${doc.title} => ${err}`;
  }
}
