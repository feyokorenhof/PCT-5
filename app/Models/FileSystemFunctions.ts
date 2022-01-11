import {knownFolders, Folder, File} from '@nativescript/core';

export function WriteFile(FileContent: any, FolderName: string, FileName: string)
        {
            const documents : Folder =<Folder>knownFolders.documents();
            const folder: Folder = <Folder>documents.getFolder(FolderName);
            const file: File = <File>folder.getFile(FileName);
            
            file.writeText(FileContent);
            return FileContent;
        }
        
export function ReadFile(FolderName: string, FileName: string): string
        {
            const documents : Folder =<Folder>knownFolders.documents();
            const folder: Folder = <Folder>documents.getFolder(FolderName);
            const file: File = <File>folder.getFile(FileName);
            var JSONstring: string = "";
            file.readText()
            .then((res) => {
                console.log("File content:")
                console.log(res)
                JSONstring = res;
                
            }
            )
            .catch((err) => {
            console.log("Error:")
            console.log(err.stack)
            }
            );
            return JSONstring;
        }


export function ReadFileSync(FolderName: string, FileName: string): string
        {
            const documents : Folder =<Folder>knownFolders.documents();
            const folder: Folder = <Folder>documents.getFolder(FolderName);
            const file: File = <File>folder.getFile(FileName);
            var JSONstring: string = "";
            JSONstring = file.readTextSync()
            return JSONstring;
        }
