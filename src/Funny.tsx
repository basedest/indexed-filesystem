import { openDB } from "idb";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    showDirectoryPicker(options:{type: string}) : Promise<FileSystemHandle>
  }
}

const DB_NAME = "my-db-2";
const STORE_NAME = "my-store";
const KEY_NAME = "my-key";

export default function Funny() {
  const [dirHandle, setDirHandle] = useState<FileSystemHandle | null>(null);

  useEffect(() => {
    openDB(DB_NAME, 1, {
      upgrade(db) {
        db.createObjectStore(STORE_NAME);
      },
    }).then(db => {
      db.get(STORE_NAME, KEY_NAME).then(async val => {
        if (val) {
          setDirHandle(val);
        } else {
          const handle = await window.showDirectoryPicker({
            type: "openDirectory"
          });
          setDirHandle(handle);
        }
      })
    })
  }, []);

  function handleGetValue() {
    openDB(DB_NAME, 1).then(db => {
      db.get(STORE_NAME, KEY_NAME).then(async val => {
        if (val) {
          setDirHandle(val);
        } else {
          const handle = await window.showDirectoryPicker({
            type: "openDirectory"
          });
          setDirHandle(handle);
        }
      });
    });
  }

  function handleSetValue() {
    if (!dirHandle) {
      alert("no handle found");
      return;
    }
    openDB(DB_NAME, 1).then(db => {
      db.put(STORE_NAME, dirHandle, KEY_NAME).then(() => {
        console.log("yappy");
      });
    });
  }

  return (
    <div>
      <button onClick={handleGetValue}>Get Directory Handle</button>
      <button onClick={handleSetValue}>
        Store handle in DB
      </button>
      {dirHandle && <p>{dirHandle.name}</p>}
    </div>
  );
}