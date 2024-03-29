export const isDir = (handle: unknown) =>
    handle instanceof FileSystemDirectoryHandle;

export const bytesToSize = (bytes: number) => {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`;
};

// TODO: maybe use some sort of ellipsis instead
export const clipName = (name: string) =>
    name.length > 30 ? `${name.slice(0, 15)}...${name.slice(-15)}` : name;
