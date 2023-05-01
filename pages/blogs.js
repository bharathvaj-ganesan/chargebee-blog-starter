import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { getAllPosts, getAllTagsFromPosts } from '@/lib/notion';
import SearchLayout from '@/layouts/search';

export default function Blogs({ tags, posts }) {
  return <SearchLayout tags={tags} posts={posts} />;
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
  return {
    props: {
      tags,
      posts,
    },
  };
};
