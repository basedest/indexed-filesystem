export default interface FileSystemEntryEntity {
    handle: FileSystemFileHandle | FileSystemDirectoryHandle;
    file?: File;
}
