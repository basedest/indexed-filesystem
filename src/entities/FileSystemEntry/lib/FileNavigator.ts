import type { FileSystemEntryEntity } from '../model';

export default class FileNavigator {
    private readonly root: FileSystemDirectoryHandle;

    private pathStack: FileSystemDirectoryHandle[];

    public constructor(root: FileSystemDirectoryHandle) {
        this.root = root;
        this.pathStack = [this.root];
    }

    public goUp() {
        if (this.pathStack.length < 2) {
            throw new Error("can't go higher than root");
        }
        return this.pathStack.pop()!;
    }

    public getCurrentDirectory() {
        return this.pathStack.at(-1)!;
    }

    public async goDown(dirName: string) {
        try {
            const subdirectoryHandle =
                await this.getCurrentDirectory().getDirectoryHandle(dirName);
            this.pathStack.push(subdirectoryHandle);
            return subdirectoryHandle;
        } catch (error) {
            throw new Error('unreachable subdirectory');
        }
    }

    public async getContents() {
        const entries: FileSystemEntryEntity[] = [];
        // @ts-expect-error because TypeScript doesn't know about FileSystemDirectoryHandle.values() yet
        // eslint-disable-next-line no-restricted-syntax
        for await (const handle of this.pathStack.at(-1)!.values()) {
            if (handle instanceof FileSystemDirectoryHandle) {
                entries.push({ handle });
            } else {
                const file = await handle.getFile();
                entries.push({ handle, file });
            }
        }
        return entries;
    }

    public isRoot() {
        return this.pathStack.length === 1;
    }

    public getPath() {
        return this.pathStack.reduce(
            (path: string, elem) => path.concat(`${elem.name}/`),
            '',
        );
    }
}
