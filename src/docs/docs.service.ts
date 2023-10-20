import { Injectable } from '@nestjs/common';
import { CreateDocDto } from './dto/create-doc.dto';
import { UpdateDocDto } from './dto/update-doc.dto';
import { Doc } from './entities/doc.entity';
import { AlertService } from 'src/alert/alert.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { Store } from './store/store';

@Injectable()
export class DocsService {
  constructor(
    private readonly alertService: AlertService,
    private readonly userService: UsersService,
    private store: Store,
  ) {}

  create(createDocDto: CreateDocDto, ownerId: string) {
    if (!ownerId) throw new Error('Owner userid missing');

    const now = Date.now();
    const newDoc: Doc = {
      ...createDocDto,
      id: '' + this.store.docs.length++,
      owner: { id: ownerId },
      signers: createDocDto.signers.map((sid) => ({ id: sid })),
      lastUpdatedBy: { id: ownerId },
      lastUpdatedOn: now,
      uploadedOn: now,
      isRecalled: false,
      isSigned: false,
    };
    this.store.docs.push(newDoc);
    return newDoc;
  }

  findAll(ownerId: string) {
    return this.store.docs.filter(({ owner }) => owner.id === ownerId);
  }

  #findOneIndex(id: number, ownerId: string = '') {
    return this.store.docs.findIndex(
      ({ id: _id, owner: { id: _ownerId } }) =>
        id.toString() === _id && (ownerId ? ownerId === _ownerId : true),
    );
  }

  #throwIfDocNotFound(id: number, ownerId: string = '') {
    const docInd = this.#findOneIndex(id, ownerId);
    if (docInd < 0) throw new Error('Document not found.');
    return docInd;
  }

  findOne(id: number, ownerId: string) {
    const docInd = this.#throwIfDocNotFound(id, ownerId);
    return this.store.docs[docInd];
  }

  #updateDoc(
    index: number,
    by: string,
    upDoc: Partial<Doc>,
    oldDoc: Doc = null,
  ) {
    let newDoc = upDoc as Doc;
    if (oldDoc) {
      newDoc = {
        ...oldDoc,
        ...upDoc,
        id: oldDoc.id,
        lastUpdatedOn: Date.now(),
        lastUpdatedBy: { id: by },
      };
    }
    this.store.docs[index] = newDoc;
    return newDoc;
  }

  update(id: number, ownerId: string, updateDocDto: UpdateDocDto) {
    const docInd = this.#throwIfDocNotFound(id, ownerId);
    const uDoc = {
      ...updateDocDto,
      owner: { id: ownerId },
      signers: updateDocDto.signers.map((sid) => ({ id: sid })),
    };
    return this.#updateDoc(docInd, ownerId, uDoc, this.store.docs[docInd]);
  }

  remove(id: number, ownerId: string) {
    const docInd = this.#throwIfDocNotFound(id, ownerId);
    delete this.store.docs[docInd];
    return true;
  }

  send(id: number, ownerId: string) {
    const docInd = this.#throwIfDocNotFound(id, ownerId);
    const doc = this.store.docs[docInd];

    if (!doc.signers.length) throw new Error('Signers not registered');

    const firstSigner = doc.signers.at(1);
    if (firstSigner?.lastAlertedOn - Date.now() > 0)
      throw new Error('Document already sent.');
    try {
      const user = this.userService.findOne(+firstSigner.id);
      this.alertService.alertSigner(user, doc);
    } catch (error) {
      const { message: mesg } = error as Error;
      this.alertService.alertOwnerSignError({ id: firstSigner.id }, doc, mesg);
      throw error;
    }
  }

  sign(id: number, signerId: string) {
    const docInd = this.#throwIfDocNotFound(id);
    const doc = this.store.docs[docInd];

    if (doc.signers.findIndex(({ id }) => id === signerId.toString()) < 0) {
      throw new Error('Signer-Id not found.');
    }

    if (doc.isRecalled) new Error('Document not found.');
    if (doc.isSigned) new Error('Document is not available to sign.');

    let nextSignUser: User = null;
    let isLastSign = false;
    let signErr = null;

    const newDoc = this.store.docs[docInd];

    newDoc.signers = newDoc.signers.map((signer, signInd, arr) => {
      if (signer.id !== signerId.toString()) return signer;
      signer.signedOn = Date.now();
      if (signInd != arr.length - 1) {
        const nextSignId = arr[signInd + 1].id;
        try {
          nextSignUser = this.userService.findOne(+nextSignId); // constraint: signer and signee to be registered in the system
          if (signInd === arr.length - 1) {
            isLastSign = true;
          }
        } catch (error) {
          const { message } = error as Error;
          signErr = message;
        }
      }
      return signer;
    });

    if (signErr) {
      this.alertService.alertOwnerSignError(
        { id: nextSignUser.id },
        newDoc,
        signErr,
      );
      throw new Error(signErr);
    }

    if (isLastSign) {
      newDoc.isSigned = true;
    }

    this.#updateDoc(docInd, signerId, newDoc);

    if (isLastSign) {
      this.alertService.alertOwnerSigned(newDoc);
    } else {
      this.alertService.alertSigner(nextSignUser, newDoc);
    }
  }

  recall(id: number, ownerId: string) {
    const docInd = this.#throwIfDocNotFound(id, ownerId);
    const doc = this.store.docs[docInd];
    doc.isRecalled = true;
    return this.#updateDoc(id, ownerId, doc);
  }
}
