import {unsplash} from './api';

export const getPhotos = async (page: number) => {
  try {
    const result = await unsplash.photos.list({
      page,
      perPage: 10,
    });
    return result.response;
  } catch (err) {
    console.error(err);
  }
};
