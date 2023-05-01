import apiClient from './client';

export async function createPortal(customerId) {
  const payload = {
    customer: {
      id: customerId,
    },
  };

  const result = await apiClient.portal_session.create(payload).request();

  return result.portal_session;
}
