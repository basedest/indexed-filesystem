import { useState, useEffect, useMemo, useCallback } from 'react';
import ArrowLeftIcon from '@heroicons/react/24/outline/ArrowLeftIcon';
import { isDir } from '@shared/lib/commonUtils';
import FileNavigator from '@entities/FileSystemEntry/lib/FileNavigator';
import FileSystemEntry from '@entities/FileSystemEntry/ui/FileSystemEntry';
import type { FileSystemEntryEntity } from '@entities/FileSystemEntry/model';
import { Breadcrumb, Button } from 'antd';

const sortCallback = (
    lhs: FileSystemEntryEntity,
    rhs: FileSystemEntryEntity,
) => {
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
        FileSystemEntryEntity[]
    >([]);

    const fileNavigator = useMemo(
        () => new FileNavigator(rootHandle),
        [rootHandle],
    );

    const breadCrumbsItems = useMemo(() => {
        const items = fileNavigator.getPathItems();
        return items.map((item) => ({ title: item }));
    }, [directoryEntries]);

    useEffect(() => {
        fileNavigator
            .getContents()
            .then((contents) => setDirectoryEntries(contents));
    }, [rootHandle]);

    const handleEntryClick = useCallback(
        async (entry: FileSystemHandle) => {
            try {
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
                <Button
                    type="link"
                    size="small"
                    icon={<ArrowLeftIcon className="h-5 w-5" />}
                    shape="circle"
                    className="text-blue-500 hover:underline mr-2"
                    onClick={handleBackClick}
                    disabled={fileNavigator.isRoot()}
                />
                <Breadcrumb items={breadCrumbsItems} />
            </div>
            <ul className="space-y-2">
                {directoryEntries.sort(sortCallback).map((entry) => (
                    <FileSystemEntry
                        key={entry.handle.name}
                        entry={entry}
                        handleClick={handleEntryClick}
                    />
                ))}
            </ul>
        </div>
    );
}
