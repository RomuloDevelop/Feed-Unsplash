import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {FETCH_STATE} from 'config/enums';
import {Basic} from 'unsplash-js/dist/methods/photos/types';
import {getPhotos} from 'services/index';

interface PhotosState {
  photos: Basic[];
  loading: FETCH_STATE;
  photoShowed: null | undefined | Basic;
}

const initialState: PhotosState = {
  photos: [],
  photoShowed: null,
  loading: FETCH_STATE.IDLE,
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
      state.loading = FETCH_STATE.PENDING;
    });
    builder.addCase(fetchPhotos.fulfilled, state => {
      state.loading = FETCH_STATE.SUCCEEDED;
    });
    builder.addCase(fetchPhotos.rejected, state => {
      state.loading = FETCH_STATE.FAILED;
    });
  },
});

export const fetchPhotos = createAsyncThunk(
  'photos/fetchPhotos',
  async (page: number, thunkApi) => {
    const response = await getPhotos(page);
    if (!response || !response?.results?.length) {
      return thunkApi.rejectWithValue(null);
    }
    const {results} = response;
    if (page <= 1) {
      thunkApi.dispatch(setPhotos(results));
    } else {
      thunkApi.dispatch(addPhotos(results));
    }
    return results;
  },
);

export const {setPhotoShowed, setPhotos, addPhotos} = photosSlice.actions;
export default photosSlice.reducer;
