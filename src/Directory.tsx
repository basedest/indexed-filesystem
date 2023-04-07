import { useState, useEffect, useMemo } from "react";
import FileNavigator from "./features/FileNavigator";
import FolderIcon from "@heroicons/react/24/outline/FolderIcon";
import FileIcon from "@heroicons/react/24/outline/DocumentIcon";
import ArrowLeftIcon from "@heroicons/react/24/outline/ArrowLeftIcon";

export default function DirectoryView({ directoryHandle: rootHandle }: {directoryHandle: FileSystemDirectoryHandle}) {
  const [directoryEntries, setDirectoryEntries] = useState<DirectoryEntry[]>([]);
  const fileNavigator = useMemo(() => new FileNavigator(rootHandle), [rootHandle])
  const path = useMemo(() => fileNavigator.getPath().slice(0,-1), [directoryEntries]);

  useEffect(() => {
    fileNavigator.getContents()
    .then(contents => setDirectoryEntries(contents))
  }, [rootHandle]);

  function handleEntryClick(entry: FileSystemHandle) {
    console.log(entry);
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

  return (
    <div className="mx-auto max-w-screen-md">
      <div className="flex items-center mb-4">
        {
          !fileNavigator.isRoot() &&
          <button className="text-blue-500 hover:underline mr-2" onClick={handleBackClick}><ArrowLeftIcon className="h-5 w-5" /></button>
        }
        <h2 className="text-lg font-medium">{path}</h2>
      </div>
      <ul className="space-y-2">
        {directoryEntries.sort(sortCallback).map(({handle, file}) => (
          <li key={handle.name} className="flex justify-between items-center p-3 rounded-md cursor-pointer hover:bg-gray-100 transition duration-300" onClick={() => handleEntryClick(handle)}>
            <div className="flex">
              <div className="w-8 h-8 flex items-center justify-center mr-4">
                {isDir(handle) ? <FolderIcon className="h-6 w-6 text-blue-500" /> : <FileIcon className="h-6 w-6 text-gray-400" />}
              </div>
              <div>{handle.name}</div>
            </div>
            {
              file && <div className="flex items-center ml-auto text-gray-500">
              <div className="w-17 text-right">{bytesToSize(file.size)}</div>
              <time className="ml-4">{new Date(file!.lastModified).toLocaleDateString()}</time>
              </div>
            }
          </li>
        ))}
      </ul>
    </div>
  );
}

function bytesToSize(bytes: number) {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 B';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}


const isDir = (handle:any) => handle instanceof FileSystemDirectoryHandle;

const sortCallback = (lhs:any,rhs:any) => {
  const lhsDir = isDir(lhs.handle);
  const rhsDir = isDir(rhs.handle);
  
  if (lhsDir && !rhsDir) {
    return -1;
  }
  if (lhsDir && rhsDir) {
    return 0;
  }
  return 1;
}