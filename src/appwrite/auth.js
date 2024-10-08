import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  Client = new Client();
  Account;

  constructor() {
    this.Client.setEndpoint(conf.appwriteUrl).setProject(
      conf.appwriteProjectId
    );
    this.Account = new Account(this.Client);
  }

  async signUp({ email, password, name }) {
    try {
      const account = await this.Account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (account) {
        console.log("Account created successfully. Account details:", account);
        this.login({ email, password });
      } else {
        console.error(
          "Error during sign up. Please check the provided details and try again."
        );
        return account;
      }
    } catch (error) {
      console.error(
        "Error during sign up. Please check the provided details and try again. Error details:",
        error
      );
    }
  }

  async login({ email, password }) {
    try {
      return await this.Account.createEmailPasswordSession({ email, password });
    } catch (error) {
      console.error(
        "Error during login. Please check the provided details and try again.",
        error
      );
    }
  }

  async logout() {
    try {
      return await this.Account.deleteSessions();
    } catch (error) {
      console.error("Error during logout. Please try again.", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.Account.get();
    } catch (error) {
      console.error("Error while fetching user details. Error details:", error);
    }
  }
}

const authService = new AuthService();

export default authService;
