import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { createPortal } from '@/lib/chargebee';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const supabase = createServerSupabaseClient({ req, res });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    const { data: profile } = await supabase.from('profiles').select('*').eq('id', session?.user.id).single();

    const portal = await createPortal(profile.chargebee_customer);
    return res.status(200).json(portal);
  } else {
    res.status(204).end();
  }
}
