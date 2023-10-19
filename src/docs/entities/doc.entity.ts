import { Signee } from './signee.entity';
import { Signer } from './signer.entity';

export class Doc {
  id: string;
  title: string;
  location: string;
  signers: Partial<Signer>[];
  owner: Signee;
  expiry: number;
  lastUpdatedOn: number;
  lastUpdatedBy: Signer | Signee;
  isRecalled: boolean;
  isSigned: boolean;
  uploadedOn: number;
}
