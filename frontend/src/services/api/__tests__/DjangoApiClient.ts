import { assert } from 'console';
import { DjangoApiClient } from '../DjangoApiClient';

describe('DjangoApiClient', () => {
  it('Can be constructed', () => {
    expect(new DjangoApiClient()).toBeDefined();
  });
});
