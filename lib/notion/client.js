import fs from 'fs';
import path from 'path';
import { NotionAPI } from 'notion-client';

let apiClient = null;
const CACHE_DIR = path.join(__dirname, '.blogs');
const CACHE_FILE_PATH = path.join(CACHE_DIR, 'db.json');

function getAPIClient() {
  if (apiClient) {
    return apiClient;
  }

  const authToken = process.env.NOTION_ACCESS_TOKEN || null;
  apiClient = new NotionAPI({ authToken });
  return apiClient;
}

export async function fetchNotionDatabase(id) {
  const api = getAPIClient();
  const response = await api.getPage(id);
  return response;
}

export async function getNotionTableData(id) {
  const data = await fetchNotionDatabase(id);
  return data;
  // let cachedData;

  // try {
  //   if (fs.existsSync(CACHE_FILE_PATH)) {
  //     cachedData = JSON.parse(fs.readFileSync(CACHE_FILE_PATH), 'utf8');
  //   }
  // } catch (error) {
  //   console.log(error);
  //   console.log('Cache not initialized');
  // }

  // if (!cachedData) {
  //   const data = await fetchNotionDatabase(id);

  //   try {
  //     !fs.existsSync(CACHE_DIR) && fs.mkdirSync(CACHE_DIR);
  //     fs.writeFileSync(CACHE_FILE_PATH, JSON.stringify(data), 'utf8');
  //     console.log('Wrote to cache');
  //   } catch (error) {
  //     console.log('ERROR WRITING CACHE TO FILE');
  //     console.log(error);
  //   }

  //   cachedData = data;
  // }

  // return cachedData;
}
