import { useRouter } from 'next/router';
import { openPortal } from '@/lib/portal';
import { useUser } from '@supabase/auth-helpers-react';

export default function MaskedContent() {
  const router = useRouter();
  const user = useUser();

  return (
    <div className="notion relative flex justify-center">
      {user && (
        <button
          onClick={() =>
            openPortal({
              router,
            })
          }
          className="bg-blue-500 absolute mt-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded z-10"
        >
          Upgrade
        </button>
      )}
      <div className="blur">
        <h4 className="notion-h-title">What is Lorem Ipsum?</h4>
        <br />
        <div className="notion-text">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        </div>
        <br />
        <div className="notion-text">
          It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum. Why do we use it?
        </div>
        <div className="notion-text">
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less
          normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem
          Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident,
          sometimes on purpose (injected humour and the like).
        </div>
      </div>
    </div>
  );
}
