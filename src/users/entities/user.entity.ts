type Role = 'Signer' | 'Signee';

export class User {
  id: string;
  email: string;
  password: string;
  role: Role = undefined;
  createdOn: number;
}
