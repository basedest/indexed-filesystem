import { create } from 'zustand';

import IDBManager from './IDBManager';

interface IdbStore {
    idb: IDBManager | null;
    root: FileSystemDirectoryHandle | null;
    getInstance: () => Promise<IDBManager>;
    setRoot: (handle: FileSystemDirectoryHandle) => Promise<'root'>;
}

export const useIdbStore = create<IdbStore>((set, get) => ({
    idb: null,
    root: null,

    async getInstance() {
        const idb = await IDBManager.getInstance();
        const root = await idb.getRoot();
        set({ idb, root });
        return idb;
    },
    async setRoot(handle: FileSystemDirectoryHandle) {
        if (!get().idb) {
            throw new Error('No instance of the IndexedDB manager');
        }
        set({ root: handle });
        return get().idb!.setRoot(handle);
    },
}));
