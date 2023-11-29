export default interface DirectoryEntry {
    handle: FileSystemFileHandle | FileSystemDirectoryHandle;
    file?: File;
}
