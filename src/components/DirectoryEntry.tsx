import { memo } from 'react';
import FolderIcon from '@heroicons/react/24/outline/FolderIcon';
import FileIcon from '@heroicons/react/24/outline/DocumentIcon';
import DirectoryEntryEntity from '../entities/DirectoryEntry';
import { bytesToSize, clipName, isDir } from '../utils/commonUtils';

interface Props {
    entry: DirectoryEntryEntity;
    handleClick: (handle: FileSystemHandle) => void;
}

function DirectoryEntry({ entry, handleClick }: Props) {
    const { handle, file } = entry;
    return (
        <li
            className="flex justify-between items-center p-3 rounded-md cursor-pointer hover:bg-gray-100 transition duration-300"
            onClick={() => handleClick(handle)}
        >
            <div className="flex basis-3/4">
                <div className="w-8 h-8 flex items-center justify-center mr-2 pb-1">
                    {isDir(handle) ? (
                        <FolderIcon className="h-6 w-6 text-blue-500" />
                    ) : (
                        <FileIcon className="h-6 w-6 text-gray-400" />
                    )}
                </div>
                <div>{clipName(handle.name)}</div>
            </div>
            {file && (
                <div className="flex justify-between ml-auto text-gray-500 basis-1/4">
                    <div className="w-17 text-right">
                        {bytesToSize(file.size)}
                    </div>
                    <time className="ml-4">
                        {new Date(file!.lastModified).toLocaleDateString()}
                    </time>
                </div>
            )}
        </li>
    );
}

export default memo(DirectoryEntry);
