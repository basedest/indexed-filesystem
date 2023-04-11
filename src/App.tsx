import { useCallback, useEffect, useState } from "react";
import DirectoryView from "./components/Directory";
import IDBManager from "./features/idb/IDBManager";

const buttonClasses = "bg-blue-600 hover:bg-blue-700 transition hover:scale-105 text-white py-2 px-4 rounded-xl mb-4 mx-auto block"

function App() {
  const [directoryHandle, setDirectoryHandle] = useState<null | FileSystemDirectoryHandle>(null);
  const [idb, setIdb] = useState<IDBManager | null>(null);
  const [popUp, setPopUp] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      const idbInstance = await IDBManager.init();
      setIdb(idbInstance);
      const storedValue = await idbInstance.getRoot();
      if (!storedValue) {
        return;
      } 
      setDirectoryHandle(storedValue);
      setPopUp(true);
    })() 
  }, [])
  
  const onPopUpClicked = useCallback(async () => {
    try {
      // @ts-ignore
      const permission = await directoryHandle.requestPermission({mode: "readwrite"});
      if (permission !== "granted") {
        throw new Error("Permission was not granted");
      }
    } catch (e: unknown) {
      console.error(e);
      setError(true);
    } finally {
      setPopUp(false);
    }
  }, [directoryHandle]);

  async function onChooseDirectoryClicked() {
    try {
      // @ts-ignore
      const handle = await window.showDirectoryPicker({type: "openDirectory"})
      setDirectoryHandle(handle);
      idb!.setRoot(handle);
      setError(false);
    } catch (e: unknown) {
      console.error(e);
      setError(true);
    }
  }

  return (
    <main className="flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-3xl bg-white shadow-md p-5 min-h-screen">
      {
        popUp ? 
        <button onClick={onPopUpClicked} className={buttonClasses}>
          Grant permission
        </button>
        : <button 
        disabled={!idb}
        className={buttonClasses} 
        onClick={onChooseDirectoryClicked}
        >
          Set new root
        </button>
      }
      {
        error ?
        <section className="flex flex-col items-center">
          <h1 className="text-lg font-medium text-red-600">Oops! Seems like there's an error</h1>
          <p className="text-gray-600">See logs to find the issue</p>
        </section>
        : (directoryHandle && !popUp) && <DirectoryView directoryHandle={directoryHandle} />
      }
      </div>
    </main>
  );
}

export default App;