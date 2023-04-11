import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import IDBManager from '../idb/IDBManager'
import { AppDispatch, AppState } from '../../app/store'
import FileNavigator from './FileNavigator'

interface NavigationState {
    rootDir: {
        value?: FileSystemDirectoryHandle,
        state: 'missing' | 'loading' | 'loaded'
    },
    navigator?: FileNavigator
    idb?: IDBManager 
}

const initialState : NavigationState = {
    rootDir: {
        state: 'missing'
    },
}

export const loadIdb = createAsyncThunk('navigation/loadIdb', () => IDBManager.init())
export const loadStoredRoot = createAsyncThunk<
FileSystemDirectoryHandle | undefined,
undefined,
{
    dispatch: AppDispatch,
    state: AppState
}
>('navigation/loadStoredRoot', (_, thunkAPI) => {
    return thunkAPI.getState().navigation.idb!.getRoot()
})

export const setRoot = createAsyncThunk<
void,
FileSystemDirectoryHandle,
{
    dispatch: AppDispatch,
    state: AppState
}
>('navigation/setRoot', async (newRoot, thunkAPI) => {
    thunkAPI.dispatch(navigationSlice.actions.navigatorLoaded(new FileNavigator(newRoot)));
    await thunkAPI.getState().navigation.idb!.setRoot(newRoot);
})

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    navigatorLoaded(state, action: PayloadAction<FileNavigator>) {
        state.navigator = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadIdb.fulfilled, (state, action) => {
      state.idb = action.payload
    });
    builder.addCase(loadStoredRoot.fulfilled, (state, action) => {
        if (!action.payload) {
            state.rootDir.state = 'missing'
            return
        }
        setRoot(action.payload)
    })
  }
})

export default navigationSlice.reducer