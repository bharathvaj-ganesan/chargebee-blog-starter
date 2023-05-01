async function createPortalSession() {
  return await fetch('/api/create-customer-portal').then((res) => res.json());
}

export function openPortal({ router }) {
  const refreshData = () => {
    router.replace(router.asPath);
  };

  window.cbInstance?.setPortalSession(async () => {
    const portalPage = await createPortalSession();
    return portalPage;
  });
  const cbPortal = window.cbInstance?.createChargebeePortal();

  cbPortal.open({
    close: function () {
      // Refreshes the page once the subscription is changed
      refreshData();
    },
  });
}
