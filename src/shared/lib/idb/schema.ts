import { DBSchema } from 'idb';

export const DB_NAME = 'FileViewerApp/DB';
export const STORE_NAME = 'root';
export const ROOT_KEY = 'root';

export interface AppSchema extends DBSchema {
    [STORE_NAME]: {
        key: typeof ROOT_KEY;
        value: FileSystemDirectoryHandle;
    };
}
