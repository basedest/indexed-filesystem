import React, { useState } from "react";
import getCpuCores from "./getCpuCores";

function App() {
  const [directoryHandle, setDirectoryHandle] = useState<null | FileSystemHandle>(null);

  console.log(getCpuCores());
  
  function onChooseDirectoryClicked(event : React.MouseEvent) {
    window.showDirectoryPicker({type: "openDirectory"})
    .then((handle) => setDirectoryHandle(handle))
    .catch(console.error)
  }

  return (
    <div>
      <button onClick={onChooseDirectoryClicked}>Choose Directory</button>
      {/*directoryHandle && <Directory directoryHandle={directoryHandle} />*/}
    </div>
  );
}

export default App;