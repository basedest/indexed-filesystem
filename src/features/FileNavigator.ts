export default class FileNavigator {
    private readonly root : FileSystemDirectoryHandle;
    private pathStack : FileSystemDirectoryHandle[];

    public constructor(root : FileSystemDirectoryHandle) {
        this.root = root;
        this.pathStack = [this.root];
    }

    public goUp() {
        if (this.pathStack.length < 2) {
            throw new Error("can't go higher than root");
        }
        return this.pathStack.pop()!;
    }

    public async goDown(dirName: string) {
        try {
            const subdirectoryHandle = await this.pathStack.at(-1)!.getDirectoryHandle(dirName);
            this.pathStack.push(subdirectoryHandle);
            return subdirectoryHandle; 
        } catch (error) {
            throw new Error("unreachable subdirectory");
        }
    }

    public async getContents() {
        for await (const value of this.pathStack.at(-1)!.values()) {
            if (value instanceof FileSystemDirectoryHandle) {
                logEntries(value, `${prefix}/${key}`);
            } else {
                console.log({key:`${prefix}/${key}`, value})
            }
        }
    }
}