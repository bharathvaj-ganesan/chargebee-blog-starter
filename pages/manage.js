import cn from 'classnames';
import Container from '@/components/Container';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default function ManagePage({ user }) {
  const title = 'Manage Subscription';

  return (
    <Container
      layout="blog"
      isBlog={true}
      title={title}
      // date={new Date(post.publishedAt).toISOString()}
      type="article"
    >
      <div className={cn('flex flex-col', 'items-center')}>
        <h1 className={cn('w-full font-bold text-3xl text-black dark:text-white', 'max-w-2xl px-4')}>{title}</h1>

        <div className="self-stretch -mt-4 flex flex-col items-center lg:flex-row lg:items-stretch">
          <div className="flex-1 hidden lg:block" />
          <div className={'flex-none w-full max-w-2xl px-4'}>
            <div className="mt-10">Email : {user.email}</div>

            <pre>{JSON.stringify(user, undefined, 2)}</pre>
          </div>
          <div className={cn('order-first lg:order-[unset] w-full lg:w-auto max-w-2xl lg:max-w-[unset] lg:min-w-[160px]', 'flex-1')}></div>
        </div>
      </div>
    </Container>
  );
}

export async function getServerSideProps(ctx) {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session.user;

  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: '/', permanent: false } };
  }

  // If there is a user, return it.
  return { props: { user } };
}
