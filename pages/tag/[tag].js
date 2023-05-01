import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { getAllPosts, getAllTagsFromPosts } from '@/lib/notion';
import SearchLayout from '@/layouts/search';

export default function Tag({ tags, posts, currentTag }) {
  return <SearchLayout tags={tags} posts={posts} currentTag={currentTag} />;
}

export const getServerSideProps = async (ctx) => {
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
  const tags = getAllTagsFromPosts(posts);
  const currentTag = ctx.params.tag;
  const filteredPosts = posts.filter((post) => post && post.tags && post.tags.includes(currentTag));
  return {
    props: {
      tags,
      posts: filteredPosts,
      currentTag,
    },
  };
};
