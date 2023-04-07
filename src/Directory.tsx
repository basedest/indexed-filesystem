import { useState, useEffect, useMemo } from "react";
import FileNavigator from "./features/FileNavigator";

export default function DirectoryView({ directoryHandle: rootHandle }: {directoryHandle: FileSystemDirectoryHandle}) {
  const [directoryEntries, setDirectoryEntries] = useState<FileSystemHandle[]>([]);
  const fileNavigator = useMemo(() => new FileNavigator(rootHandle), [rootHandle])
  const path = useMemo(() => fileNavigator.getPath().slice(0,-1), [directoryEntries]);

  useEffect(() => {
    fileNavigator.getContents()
    .then(contents => setDirectoryEntries(contents))
  }, [rootHandle]);

  function handleEntryClick(entry: FileSystemHandle) {
    if (!(entry instanceof FileSystemDirectoryHandle)) {
      return;
    }
    fileNavigator.goDown(entry.name)
    .then(() => fileNavigator.getContents())
    .then(contents => setDirectoryEntries(contents))
    .catch(console.error)
  }

  function handleBackClick() {
    const handle = fileNavigator.goUp();
    if (!handle) {
      return;
    }
    fileNavigator.getContents()
    .then(contents => setDirectoryEntries(contents))
  }

  const isDir = (entry:any) => entry instanceof FileSystemDirectoryHandle;

  return (
    <div>
      <h2>{path}</h2>
      {!fileNavigator.isRoot() && (
        <button onClick={handleBackClick}>Back</button>
      )}
      <ul className="entry-list">
        {directoryEntries.map((entry) => (
          <li key={entry.name} onClick={() => handleEntryClick(entry)} className={isDir(entry) ? "entry dir" : "entry"}>
            {entry.name}
          </li>
        ))}
      </ul>
    </div>
  );
}