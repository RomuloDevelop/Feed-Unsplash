import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {Basic} from 'unsplash-js/dist/methods/photos/types';
import {getPhotos} from '../services';

interface PhotosState {
  photos: Basic[];
  loading: boolean;
  photoShowed: null | undefined | Basic;
}

const initialState: PhotosState = {
  photos: [],
  photoShowed: null,
  loading: false,
};

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    setPhotos(state, action: PayloadAction<Basic[]>) {
      state.photos = action.payload;
    },
    addPhotos(state, action: PayloadAction<Basic[]>) {
      state.photos = state.photos.concat(action.payload);
    },
    setPhotoShowed(state, action: PayloadAction<number | string>) {
      state.photoShowed = state.photos.find(item => item.id === action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPhotos.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchPhotos.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(fetchPhotos.rejected, state => {
      state.loading = false;
    });
  },
});

export const fetchPhotos = createAsyncThunk(
  'photos/fetchPhotos',
  async (page: number, thunkApi) => {
    const response = await getPhotos(page);
    const results = response?.results || [];
    if (!page) {
      thunkApi.dispatch(setPhotos(results));
    } else {
      thunkApi.dispatch(addPhotos(results));
    }
    return results;
  },
);

export const {setPhotoShowed, setPhotos, addPhotos} = photosSlice.actions;
export default photosSlice.reducer;
