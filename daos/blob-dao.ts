import { BlobServiceClient, HttpRequestBody } from "@azure/storage-blob";

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE);
const containerClient = blobServiceClient.getContainerClient("images");

export default interface BlobDAO{

    createBlob(name: string, buffer: HttpRequestBody, size: number): Promise<string>

}

export class BlobDao implements BlobDAO{
    
    async createBlob(name: string, buffer: HttpRequestBody, size: number): Promise<string> {
        const uniqueId = Math.random().toString().replace(/0\./, '');
        const uniqueName = `${uniqueId}-${name}`;
        await containerClient.getBlockBlobClient(uniqueName).upload(buffer, size);
        return containerClient.getBlockBlobClient(uniqueName).url;
    }
}