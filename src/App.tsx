import { useCallback, useEffect, useState } from "react";
import DirectoryView from "./Directory";
import IDBManager from "./features/idb/IDBManager";

const buttonClasses = "bg-blue-600 hover:bg-blue-700 transition hover:scale-105 text-white py-2 px-4 rounded-xl mb-4 mx-auto block"

function App() {
  const [directoryHandle, setDirectoryHandle] = useState<null | FileSystemDirectoryHandle>(null);
  const [idb, setIdb] = useState<IDBManager | null>(null);
  const [popUp, setPopUp] = useState(false);

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
    // @ts-ignore
    await directoryHandle.requestPermission({mode: 'readwrite'});
    setPopUp(false);
  }, [directoryHandle])

  function onChooseDirectoryClicked() {
    window.showDirectoryPicker({type: "openDirectory"})
    .then(handle => {
      setDirectoryHandle(handle as FileSystemDirectoryHandle);
      idb!.setRoot(handle as FileSystemDirectoryHandle);
    })
    .catch(console.error)
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
        {(directoryHandle && !popUp) && <DirectoryView directoryHandle={directoryHandle} />}
      </div>
    </main>
  );
}

export default App;