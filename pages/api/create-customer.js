import chargebeeAPIClient from '@/lib/chargebee/client';
import supabaseAdminClient from '@/lib/supabase/admin';
import { config } from '@/lib/server/config';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    if (req.headers['x-api-secret'] !== process.env.API_ROUTE_SECRET) {
      return res.status(401).send('Not Allowed. Please send the API secret in the header x-api-secret');
    }

    const { full_name, email, id } = req.body.record;

    const [first_name, last_name] = full_name?.split(' ');

    const { customer } = await chargebeeAPIClient.customer
      .create({
        first_name,
        last_name,
        email,
      })
      .request();

    const itemPriceId = config.subscription.itemPriceMapping[process.env.DEFAULT_PLAN];

    await chargebeeAPIClient.subscription
      .create_with_items(customer.id, {
        subscription_items: [
          {
            item_price_id: itemPriceId,
          },
        ],
      })
      .request();

    await supabaseAdminClient
      .from('profiles')
      .update({
        chargebee_plan: process.env.DEFAULT_PLAN,
        chargebee_customer: customer.id,
      })
      .eq('id', id);

    return res.status(200).end();
  } else {
    res.status(204).end();
  }
}
