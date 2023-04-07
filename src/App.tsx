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
    <main className="app">
      <button onClick={onChooseDirectoryClicked}>Choose Directory</button>
      {directoryHandle && <DirectoryView directoryHandle={directoryHandle} />}
    </main>
  );
}

export default App;