import fs from 'fs';
import path from 'path';
import { NotionAPI } from 'notion-client';

let apiClient = null;

export default function getAPIClient() {
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
}
