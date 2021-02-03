import Api from './Api';
import DjangoApiClient from './DjangoApiClient';
import FakeApi from './FakeApi';

const api: Api =
  process.env.NODE_ENV === 'test' ? new FakeApi() : new DjangoApiClient();

export default api;
