import { useState, useEffect } from "react";

function DirectoryView({ directoryHandle }) {
  const [directoryEntries, setDirectoryEntries] = useState([]);

  useEffect(() => {
    if (directoryHandle) {
      directoryHandle
        .getEntries()
        .then((entries) => {
          setDirectoryEntries(entries);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [directoryHandle]);

  function handleEntryClick(entry) {
    if (entry instanceof FileSystemDirectoryHandle) {
      setDirectoryEntries([]);
      directoryHandle
        .getDirectory(entry.name, { create: false })
        .then((subDirectoryHandle) => {
          setDirectoryEntries([subDirectoryHandle]);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  function handleBackClick() {
    directoryHandle
      .getParent()
      .then((parentHandle) => {
        setDirectoryEntries([]);
        setDirectoryHandle(parentHandle);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      <h2>{directoryHandle?.name}</h2>
      {directoryHandle?.parent && (
        <button onClick={handleBackClick}>Back</button>
      )}
      <ul>
        {directoryEntries.map((entry) => (
          <li key={entry.name} onClick={() => handleEntryClick(entry)}>
            {entry.name}
          </li>
        ))}
      </ul>
    </div>
  );
}