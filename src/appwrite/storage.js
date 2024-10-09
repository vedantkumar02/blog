import conf from "../conf/conf";
import { Client, Storage, ID } from "appwrite";

export class StorageService {
  Client = new Client();
  Storage;

  constructor() {
    this.Client.setEndpoint(conf.appwriteUrl);
    this.Client.setProject(conf.appwriteProjectId);
    this.Storage = new Storage(this.Client);
  }

  async uploadFile(file) {
    try {
      return await this.Storage.createFile(
        conf.appwritebucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error(
        "Error during file upload. Please check the provided file and try again.",
        error
      );
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwritebucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwritebucketId, fileId);
  }
}

const storageService = new StorageService();
export default storageService;
