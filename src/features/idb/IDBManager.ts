import { IDBPDatabase, openDB } from "idb";
import { DB_NAME, ROOT_KEY, STORE_NAME, AppSchema } from "./schema";

export default class IDBManager {
    private constructor(private db : IDBPDatabase<AppSchema>) {}

    public static async init(dbName = DB_NAME) : Promise<IDBManager> {
        const db = await openDB<AppSchema>(dbName, 1, {
            upgrade(database) {
                database.createObjectStore(STORE_NAME);
            },
        });
        return new IDBManager(db);
    }

    public async getRoot() {
        return this.db.get(STORE_NAME, ROOT_KEY);
    }

    public async setRoot(handle : FileSystemDirectoryHandle) {
        return this.db.put(STORE_NAME, handle, ROOT_KEY);
    }
}