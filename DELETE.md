# What I need for my DIPLOM

## Really-need
- Come up with protocol architecture
- Auth system (obviously)
- File Catalogue 
- DB (because previous 2)
- Local files manager
- Uploading PROTOCOL file info to catalogue
- Downloading file from Catalogue
- Peering
- Seeding
- Storing 1 instance of file on server just for it to exist (temporarily)
- Displaying stats (more on that later)
- link-access
- deleting files (editing doesn't make much sense)

## Cool, but can't do without
- notifications
- search, labels etc.
- PWA features
- own file format similar to .torrent

## What does protocol needs to do
- chunking file
- hashing
- peer/seed networking

## stats:
- basic file info (name,ext,size)
- uploading/downloading progress
- uploading/downloading bitrate
- peers/seeders count

## big-ass considering moments
- files should be identified by their hashes
- if we already got same hash we just gotta say "welp we've got it" 
- resolve cancelling as a feature and closing tab scenario

## TODO-list
- [ ] invent protocol schema
- [ ] make protocol info uploading
- [ ] peer discovery
- [ ] downloading file from catalogue's info entry 

## The App

The app should be a React+Redux SPA on frontend side.
For backend (ideally) there should be dedicated auth signaling server, auth service and file storage.


### Ideas, etc.
- reference files are stored temporary. If no one's seeding the file, file and corresponding FileInfo gets will be deleted in X days (hours). 

### Problems, etc.
- dude closes tab
- dude deletes file from file system
- invalid (file's no more available) links


### FileCatalogue

```typescript
class FileCatalogue {
    async list(filter: CatalogueFilter, page: number, pageSize: number): Promise<FileInfo[]>
    async get(hash: InfoHash): Promise<FileInfo>,
    async upload(fileInfo: FileInfo): Promise<UploadResult>,
    async delete(hash: InfoHash): Promise<DeleteResult>,
}
```

### What should Protocol agent be like?

- Has access to System Storage (e.g. AgentStorage idk)
- Knows how to reach signaling/auth server
- 
