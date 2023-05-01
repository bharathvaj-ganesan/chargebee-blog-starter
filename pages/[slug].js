import { useRouter } from 'next/router';
import cn from 'classnames';
import { getAllPages, getPostBlocks } from '@/lib/notion';
import { useLocale } from '@/lib/locale';
import { useConfig } from '@/lib/config';
import Container from '@/components/Container';
import Post from '@/components/Post';

export default function Page({ post, blockMap }) {
  const router = useRouter();
  const BLOG = useConfig();
  const locale = useLocale();

  // TODO: It would be better to render something
  if (router.isFallback) return null;

  const fullWidth = post.fullWidth ?? false;

  return (
    <Container
      layout="blog"
      isBlog={true}
      title={post.title}
      description={post.summary}
      slug={post.slug}
      // date={new Date(post.publishedAt).toISOString()}
      type="article"
      fullWidth={fullWidth}
    >
      <Post post={post} blockMap={blockMap} fullWidth={fullWidth} hasMaskedContent={false} />

      {/* Back and Top */}
      <div className={cn('px-4 flex justify-between font-medium text-gray-500 dark:text-gray-400 my-5', fullWidth ? 'md:px-24' : 'mx-auto max-w-2xl')}>
        <a>
          <button onClick={() => router.push(BLOG.path || '/')} className="mt-2 cursor-pointer hover:text-black dark:hover:text-gray-100">
            ← {locale.POST.BACK}
          </button>
        </a>
        <a>
          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }
            className="mt-2 cursor-pointer hover:text-black dark:hover:text-gray-100"
          >
            ↑ {locale.POST.TOP}
          </button>
        </a>
      </div>
    </Container>
  );
}

export async function getStaticPaths() {
  const pages = await getAllPages();
  return {
    paths: pages.map((row) => `/${row.slug}`),
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const posts = await getAllPages();
  const post = posts.find((t) => t.slug === slug);

  if (!post) return { notFound: true };

  const blockMap = await getPostBlocks(post.id);

  return {
    props: { post, blockMap },
    revalidate: 86400,
  };
}
