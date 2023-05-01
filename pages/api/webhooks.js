import { CHARGEBEE_WEBHOOKS_REQUEST_ORIGINS } from '@/lib/chargebee/config';
import { webhookHandlers } from '@/lib/chargebee';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const requestIp = req.headers['x-real-ip'] || req.headers['x-forwarded-for'];

      if (requestIp && CHARGEBEE_WEBHOOKS_REQUEST_ORIGINS.find((ip) => ip === requestIp)) {
        await webhookHandlers(req.body, {
          req,
          res,
        });

        res.send('ok');
      } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('IP Address Not Allowed');
      }
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
