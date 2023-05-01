import { useRouter } from 'next/router';
import cn from 'classnames';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { getAllPosts, getPostBlocks } from '@/lib/notion';
import { useLocale } from '@/lib/locale';
import { useConfig } from '@/lib/config';
import Container from '@/components/Container';
import Post from '@/components/Post';
import Comments from '@/components/Comments';

export default function BlogPost({ post, blockMap }) {
  const router = useRouter();
  const BLOG = useConfig();
  const locale = useLocale();

  // TODO: It would be better to render something
  if (router.isFallback) return null;

  const fullWidth = post.fullWidth ?? false;

  return (
    <Container
      layout="blog"
      title={post.title}
      description={post.summary}
      slug={post.slug}
      // date={new Date(post.publishedAt).toISOString()}
      type="article"
      fullWidth={fullWidth}
    >
      <Post post={post} blockMap={blockMap} fullWidth={fullWidth} />

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

      <Comments frontMatter={post} />
    </Container>
  );
}

export async function getServerSideProps(ctx) {
  const {
    params: { slug },
  } = ctx;
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  let plan = null;

  if (session?.user) {
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', session?.user.id).single();
    plan = profile?.chargebee_plan;
  }

  const posts = await getAllPosts({ plan });
  const post = posts.find((t) => t.slug === slug);

  if (!post) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  const blockMap = await getPostBlocks(post.id);

  return {
    props: { post, blockMap },
  };
}
