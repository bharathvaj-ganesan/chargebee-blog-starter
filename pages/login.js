import { useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createServerSupabaseClient, createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { getURL } from '@/lib/urlUtils';

const url = getURL();

export default function LoginPage() {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  return (
    <div className="notion notion-login notion-app light-mode">
      <div className="notion-login-container">
        <Auth
          redirectTo={url}
          appearance={{
            theme: ThemeSupa,
          }}
          supabaseClient={supabaseClient}
          providers={['google']}
          socialLayout="horizontal"
        />
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
