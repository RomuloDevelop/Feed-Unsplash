import Config from 'react-native-config';
import {createApi} from 'unsplash-js';
import * as nodeFetch from 'node-fetch';

export const unsplash = createApi({
  accessKey: Config.ACCESS_KEY,
  fetch: nodeFetch.default as unknown as typeof fetch,
});
