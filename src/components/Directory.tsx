import { useState, useEffect, useMemo, useCallback } from 'react';
import ArrowLeftIcon from '@heroicons/react/24/outline/ArrowLeftIcon';
import FileNavigator from '../features/navigation/FileNavigator';
import DirectoryEntryEntity from '../entities/DirectoryEntry';
import DirectoryEntry from './DirectoryEntry';
import { isDir } from '../utils/commonUtils';

const sortCallback = (lhs: DirectoryEntryEntity, rhs: DirectoryEntryEntity) => {
    const lhsDir = isDir(lhs.handle);
    const rhsDir = isDir(rhs.handle);

    if (lhsDir && !rhsDir) {
        return -1;
    }
    if (lhsDir && rhsDir) {
        return 0;
    }
    return 1;
};

export default function DirectoryView({
    directoryHandle: rootHandle,
}: {
    directoryHandle: FileSystemDirectoryHandle;
}) {
    const [directoryEntries, setDirectoryEntries] = useState<
        DirectoryEntryEntity[]
    >([]);

    const fileNavigator = useMemo(
        () => new FileNavigator(rootHandle),
        [rootHandle],
    );
    const path = useMemo(
        () => fileNavigator.getPath().slice(0, -1),
        [directoryEntries],
    );

    useEffect(() => {
        fileNavigator
            .getContents()
            .then((contents) => setDirectoryEntries(contents));
    }, [rootHandle]);

    const handleEntryClick = useCallback(
        async (entry: FileSystemHandle) => {
            try {
                console.debug(entry);
                if (!(entry instanceof FileSystemDirectoryHandle)) {
                    return;
                }
                await fileNavigator.goDown(entry.name);
                const contents = await fileNavigator.getContents();
                setDirectoryEntries(contents);
            } catch (error) {
                console.error(error);
            }
        },
        [fileNavigator],
    );

    const handleBackClick = useCallback(() => {
        const handle = fileNavigator.goUp();
        if (!handle) {
            return;
        }
        fileNavigator
            .getContents()
            .then((contents) => setDirectoryEntries(contents));
    }, [fileNavigator]);

    return (
        <div className="mx-auto max-w-screen-md">
            <div className="flex items-center mb-4">
                {!fileNavigator.isRoot() && (
                    <button
                        type="button"
                        className="text-blue-500 hover:underline mr-2"
                        onClick={handleBackClick}
                    >
                        <ArrowLeftIcon className="h-5 w-5" />
                    </button>
                )}
                <h2 className="text-lg font-medium">{path}</h2>
            </div>
            <ul className="space-y-2">
                {directoryEntries.sort(sortCallback).map((entry) => (
                    <DirectoryEntry
                        key={entry.handle.name}
                        entry={entry}
                        handleClick={handleEntryClick}
                    />
                ))}
            </ul>
        </div>
    );
}
