import {configureStore} from '@reduxjs/toolkit';
import photosReducer from './photos';
import userReducer from './user';

export const store = configureStore({
  reducer: {
    photos: photosReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
