import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {FETCH_STATE} from 'config/enums';
import {Basic as BasicPhoto} from 'unsplash-js/dist/methods/photos/types';
import {Basic} from 'unsplash-js/dist/methods/users/types';
import {getUserPhotos} from 'services/index';

interface UserState {
  user: Basic | null;
  photos: BasicPhoto[];
  loading: FETCH_STATE;
}

const initialState: UserState = {
  user: null,
  photos: [],
  loading: FETCH_STATE.IDLE,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Basic>) {
      state.user = action.payload;
    },
    setUserPhotos(state, action: PayloadAction<BasicPhoto[]>) {
      state.photos = action.payload;
    },
    addUserPhotos(state, action: PayloadAction<BasicPhoto[]>) {
      state.photos = state.photos.concat(action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUserPhotos.pending, state => {
      state.loading = FETCH_STATE.PENDING;
    });
    builder.addCase(fetchUserPhotos.fulfilled, state => {
      state.loading = FETCH_STATE.SUCCEEDED;
    });
    builder.addCase(fetchUserPhotos.rejected, state => {
      state.loading = FETCH_STATE.FAILED;
    });
  },
});

export const fetchUserPhotos = createAsyncThunk(
  'photos/fetchUserPhotos',
  async (params: {page: number; username: string}, thunkApi) => {
    const {page, username} = params;
    const response = await getUserPhotos(page, username);
    if (!response || !response?.results?.length) {
      return thunkApi.rejectWithValue(null);
    }
    const {results} = response;
    if (page <= 1) {
      thunkApi.dispatch(setUserPhotos(results));
    } else {
      thunkApi.dispatch(addUserPhotos(results));
    }
    return results;
  },
);

export const {setUser, setUserPhotos, addUserPhotos} = userSlice.actions;
export default userSlice.reducer;
