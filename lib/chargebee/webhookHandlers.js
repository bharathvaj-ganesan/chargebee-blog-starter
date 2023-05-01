import supabaseAdminClient from '@/lib/supabase/admin';
import { config } from '@/lib/server/config';

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

async function subscriptionHandler({ content }) {
  const subscription = content.subscription;

  const itemPriceId = subscription.subscription_items?.find((item) => item.item_type === 'plan')?.item_price_id;

  await supabaseAdminClient
    .from('profiles')
    .update({
      chargebee_plan: getKeyByValue(config.subscription.itemPriceMapping, itemPriceId),
    })
    .eq('chargebee_customer', subscription.customer_id);
}

export async function webhookHandlers(payload) {
  if (!payload) {
    throw new Error('Empty body');
  }
  const eventType = payload.event_type;
  const content = payload.content;

  switch (eventType) {
    case 'subscription_changed':
      await subscriptionHandler({
        content,
      });
      break;
  }
  return;
}
