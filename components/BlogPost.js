import Link from 'next/link';
import { useConfig } from '@/lib/config';
import FormattedDate from '@/components/FormattedDate';

const BlogPost = ({ post }) => {
  const BLOG = useConfig();

  return (
    <Link href={`${BLOG.path}/${post.slug}`}>
      <article key={post.id} className="mb-6 md:mb-8">
        <header className="flex flex-col justify-between md:flex-row md:items-baseline mb-2">
          <div className="flex gap-2 items-center">
            <h2 className="text-lg md:text-xl font-medium cursor-pointer text-black dark:text-gray-100">
              <span>{post.title}</span>

              {!post.isAllowed && (
                <svg className="h-5 inline text-amber-500 " fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              )}
            </h2>
          </div>
          <time className="flex-shrink-0 text-gray-600 dark:text-gray-400">
            <FormattedDate date={post.date} />
          </time>
        </header>
        <main>
          <p className="hidden md:block leading-8 text-gray-700 dark:text-gray-300">{post.summary}</p>
        </main>
      </article>
    </Link>
  );
};

export default BlogPost;
