import { forwardRef, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import Script from 'next/script';
import { useConfig } from '@/lib/config';
import { useLocale } from '@/lib/locale';
import useTheme from '@/lib/theme';
import { openPortal } from '@/lib/portal';

function initChargebee() {
  return window.Chargebee.init({
    site: process.env.NEXT_PUBLIC_CHARGEBEE_DOMAIN,
    isItemsModel: true,
  });
}

const ThemeToggle = () => {
  const { dark, toggle } = useTheme();

  return (
    <>
      <button aria-label="Toggle Dark Mode" className="block ml-4 h-8 w-8 rounded p-1 sm:ml-4" onClick={() => toggle()}>
        {dark ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="text-gray-900 dark:text-gray-100">
            <path
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="text-gray-900 dark:text-gray-100">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
          </svg>
        )}
      </button>
    </>
  );
};

const NavBar = () => {
  const BLOG = useConfig();
  const user = useUser();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const locale = useLocale();
  const links = [
    { id: 0, name: locale.NAV.BLOGS, to: '/blogs', show: true },
    { id: 1, name: locale.NAV.ABOUT, to: '/about', show: BLOG.showAbout },
  ];

  async function handleLogout() {
    await supabaseClient.auth.signOut();
    router.push('/');
  }

  return (
    <div className="flex justify-center flex-shrink-0 px-4 py-4">
      <ul className="flex flex-row items-center justify-center">
        {links.map(
          (link) =>
            link.show && (
              <li key={link.id} className="block ml-4 text-black dark:text-gray-50 nav">
                <Link href={link.to}>{link.name}</Link>
              </li>
            )
        )}
      </ul>
      {user && (
        <div className="ml-4 text-red-500 dark:text-red-400 nav cursor-pointer" onClick={handleLogout}>
          Logout
        </div>
      )}
    </div>
  );
};

export default function Header({ navBarTitle, fullWidth, showNav }) {
  const BLOG = useConfig();
  const user = useUser();
  const router = useRouter();

  const useSticky = !BLOG.autoCollapsedNavBar;
  const navRef = useRef(/** @type {HTMLDivElement} */ undefined);
  const sentinelRef = useRef(/** @type {HTMLDivElement} */ undefined);
  const handler = useCallback(
    ([entry]) => {
      if (useSticky && navRef.current) {
        navRef.current?.classList.toggle('sticky-nav-full', !entry.isIntersecting);
      } else {
        navRef.current?.classList.add('remove-sticky');
      }
    },
    [useSticky]
  );

  useEffect(() => {
    const sentinelEl = sentinelRef.current;
    const observer = new window.IntersectionObserver(handler);
    observer.observe(sentinelEl);

    return () => {
      sentinelEl && observer.unobserve(sentinelEl);
    };
  }, [handler, sentinelRef]);

  const titleRef = useRef(/** @type {HTMLParagraphElement} */ undefined);

  function handleClickHeader(/** @type {MouseEvent} */ ev) {
    if (![navRef.current, titleRef.current].includes(ev.target)) return;

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <>
      <div className="observer-element h-4 md:h-12" ref={sentinelRef}></div>
      <div id="sticky-nav" className={`sticky-nav mb-2 md:mb-12 m-auto w-full ${!fullWidth ? 'max-w-3xl px-4' : 'px-4 md:px-24'}`}>
        <div className={`group h-6 flex flex-row justify-between items-center py-8 bg-opacity-60`} ref={navRef} onClick={handleClickHeader}>
          <Link href="/" aria-label={BLOG.title}>
            <div className="flex items-center">
              <HeaderName ref={titleRef} siteTitle={BLOG.title} siteDescription={BLOG.description} postTitle={navBarTitle} onClick={handleClickHeader} />
            </div>
          </Link>

          <div className="flex items-center">
            <div className="block ml-4 text-black dark:text-gray-50 nav">
              {user ? (
                <div
                  className="cursor-pointer"
                  onClick={() =>
                    openPortal({
                      router,
                    })
                  }
                >
                  Manage Subscription
                </div>
              ) : (
                <Link href="/login">Signup/Login</Link>
              )}
            </div>
            <ThemeToggle />
          </div>
        </div>
        {showNav && (
          <>
            <hr className="border-gray-200 dark:border-gray-600"></hr>
            <NavBar />
          </>
        )}
      </div>
      {user && (
        <Script
          src="https://js.chargebee.com/v2/chargebee.js"
          onLoad={() => {
            window.cbInstance = initChargebee();
          }}
        />
      )}
    </>
  );
}

const HeaderName = forwardRef(function HeaderName({ siteTitle, siteDescription, postTitle, onClick }, ref) {
  return (
    <p ref={ref} className="header-name ml-2 font-medium text-gray-600 dark:text-gray-300 capture-pointer-events grid-rows-1 grid-cols-1" onClick={onClick}>
      {postTitle && <span className="post-title row-start-1 col-start-1">{postTitle}</span>}
      <span className="row-start-1 col-start-1">
        <span className="site-title">{siteTitle}</span>
        <span className="site-description font-normal hidden">, {siteDescription}</span>
      </span>
    </p>
  );
});
