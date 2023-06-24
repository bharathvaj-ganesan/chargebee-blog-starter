import getAPIClient from 'lib/notion/client.js';

export async function getPostBlocks(id) {
  const api = getAPIClient();
  const pageBlock = await api.getPage(id);
  return pageBlock;
}
