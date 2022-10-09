import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {Basic as BasicPhoto} from 'unsplash-js/dist/methods/photos/types';
import {Basic} from 'unsplash-js/dist/methods/users/types';
import {getUserPhotos} from '../services';

interface UserState {
  user: Basic | null;
  photos: BasicPhoto[];
  loading: boolean;
}

const initialState: UserState = {
  user: null,
  photos: [],
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Basic>) {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUserPhotos.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchUserPhotos.fulfilled, (state, action) => {
      state.photos = state.photos.concat(action.payload || []);
      state.loading = false;
    });
    builder.addCase(fetchUserPhotos.rejected, state => {
      state.loading = false;
    });
  },
});

export const fetchUserPhotos = createAsyncThunk(
  'photos/fetchUserPhotos',
  async (params: {page: number; username: string}) => {
    const {page, username} = params;
    const response = await getUserPhotos(page, username);
    return response?.results;
  },
);

export const setUser = userSlice.actions.setUser;
export default userSlice.reducer;
