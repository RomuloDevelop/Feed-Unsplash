import {unsplash} from './api';

export const getUser = async (username: string) => {
  return unsplash.users.get({username});
};

export const getUserPhotos = async (page: number, username: string) => {
  try {
    const result = await unsplash.users.getPhotos({
      page,
      username,
      perPage: 10,
    });
    return result.response;
  } catch (err) {
    console.error(err);
  }
};
