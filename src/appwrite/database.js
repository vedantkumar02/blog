import conf from "../conf/conf";
import { Client, Databases, ID } from "appwrite";

export class DatabaseService {
  Client = new Client();
  Databases;

  constructor() {
    this.Client.setEndpoint(conf.appwriteUrl);
    this.Client.setProject(conf.appwriteProjectId);
    this.Databases = new Databases(this.Client);
  }

  async createArticle({ title, content, slug, featuredImage, status, userId }) {
    try {
      return await this.Databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.error(
        "Error during article creation. Please check the provided details and try again.",
        error
      );
    }
  }

  async editArticle(slug, { title, content, featuredImage, status }) {
    try {
      return await this.Databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.error(
        "Error during article update. Please check the provided details and try again.",
        error
      );
    }
  }

  async deleteArticle(slug) {
    try {
      return await this.Databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.error(
        "Error during article deletion. Please check the provided details and try again.",
        error
      );
    }
  }

  async getAllArticle(slug) {
    try {
      return await this.Databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        []
      );
    } catch (error) {
      console.error(
        "Error during article retrieval. Please check the provided details and try again.",
        error
      );
    }
  }

  async getPost(slug) {
    try {
      return await this.Databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite serive :: getPost :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.Databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error);
      return false;
    }
  }
}

const databaseService = new DatabaseService();
export default databaseService;
