import 'prism-theme-vars/base.css';
import 'react-notion-x/src/styles.css';
import 'katex/dist/katex.min.css';
import App from 'next/app';
import '@/styles/globals.css';
import '@/styles/notion.css';
import loadLocale from '@/assets/i18n';
import { ConfigProvider } from '@/lib/config';
import { LocaleProvider } from '@/lib/locale';
import { prepareDayjs } from '@/lib/dayjs';
import { ThemeProvider } from '@/lib/theme';
import Scripts from '@/components/Scripts';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';

export default function MyApp({ Component, pageProps, config, locale }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  return (
    <ConfigProvider value={config}>
      <Scripts />
      <LocaleProvider value={locale}>
        <ThemeProvider>
          <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps?.initialSession}>
            <>
              <Component {...pageProps} />
            </>
          </SessionContextProvider>
        </ThemeProvider>
      </LocaleProvider>
    </ConfigProvider>
  );
}

MyApp.getInitialProps = async (ctx) => {
  const config = typeof window === 'object' ? await fetch('/api/config').then((res) => res.json()) : await import('@/lib/server/config').then((module) => module.config);

  prepareDayjs(config.timezone);

  return {
    ...App.getInitialProps(ctx),
    config,
    locale: await loadLocale('basic', config.lang),
  };
};
