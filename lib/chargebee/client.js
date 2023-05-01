import chargebee from 'chargebee';

let apiClient = (() => {
  chargebee.configure({ site: process.env.NEXT_PUBLIC_CHARGEBEE_DOMAIN, api_key: process.env.CHARGEBEE_API_KEY });
  return chargebee;
})();

export default apiClient;
