import BlobDAO, { BlobDao } from "../daos/blob-dao";
import {Blob} from 'node:buffer'

const blobDao: BlobDAO = new BlobDao();

interface FakeFile{
    name: string
    body: string
    mimeType: string
}

const createFileFromMockFile = (file: FakeFile): File => {
    const blob = new Blob([file.body], { type: file.mimeType});
    blob['lastModifiedDate'] = new Date();
    return blob as File;
}

describe("Blob DAO Tests", ()=>{

    const file = createFileFromMockFile({name: "myfakefile.txt", body: "aasdfkjas;dflkjaf", mimeType: 'text/plain'});  

    it("Should upload file", async ()=>{
        const blobUri = await blobDao.createBlob(file.name, await file.arrayBuffer(), file.size);
        expect(blobUri).toBeTruthy();
    })
})