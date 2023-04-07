import React, { useState } from "react";
import DirectoryView from "./Directory";

function App() {
  const [directoryHandle, setDirectoryHandle] = useState<null | FileSystemDirectoryHandle>(null);

  function onChooseDirectoryClicked(event : React.MouseEvent) {
    window.showDirectoryPicker({type: "openDirectory"})
    .then((handle) => setDirectoryHandle(handle as FileSystemDirectoryHandle))
    .catch(console.error)
  }

  return (
    <main className="flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-md p-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full mb-4 mx-auto block" onClick={onChooseDirectoryClicked}>Set new root</button>
        {directoryHandle && <DirectoryView directoryHandle={directoryHandle} />}
      </div>
    </main>
  );
}

export default App;