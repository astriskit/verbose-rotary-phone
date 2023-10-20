import { Test, TestingModule } from '@nestjs/testing';
import { Store } from './store';

describe('Store', () => {
  let provider: Store;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Store],
    }).compile();

    provider = module.get<Store>(Store);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
