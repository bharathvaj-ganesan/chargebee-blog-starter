import { config } from '@/lib/server/config';

import Container from '@/components/Container';
import BlogPost from '@/components/BlogPost';
import Pagination from '@/components/Pagination';
import { getAllPosts } from '@/lib/notion';

export default function Page({ postsToShow, page, showNext }) {
  return (
    <Container>
      {postsToShow && postsToShow.map((post) => <BlogPost key={post.id} post={post} />)}
      <Pagination page={page} showNext={showNext} />
    </Container>
  );
}

export const getServerSideProps = async (ctx) => {
  const { page } = ctx.params; // Get Current Page No.
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
  const postsToShow = posts.slice(0, config.postsPerPage);
  const totalPosts = posts.length;
  const showNext = totalPosts > config.postsPerPage;
  return {
    props: {
      page,
      postsToShow,
      showNext,
    },
  };
};
