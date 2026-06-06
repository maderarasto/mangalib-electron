import {Account, Client, Realtime} from "appwrite";

export const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const realtime = new Realtime(client);

export const isUserSignedIn = async () => {
  try {
    return !!(await account.get());
  } catch {
    return false;
  }
}

export { ID } from "appwrite";