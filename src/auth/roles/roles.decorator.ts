import { Reflector } from '@nestjs/core';

type Role = 'Signee' | 'Signer';

export const Roles = Reflector.createDecorator<Role[]>();
