import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Loading } from '@/components/Loading';
import { PostModal } from '@/components/Post/postModal';
import { paths } from '@/router/paths';
import { useDeletePost, useGetPostById } from '@/services/post';
import { formatDate } from '@/utils/dateUtils';

export const PostViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const { data, isLoading } = useGetPostById(id!);
  const { mutateAsync: deletePost } = useDeletePost();

  const handleDelete = useCallback(async () => {
    try {
      await deletePost(id!);
      toast.success('Post successfully deleted');
      navigate(paths.post.index);
    } catch (err) {
      console.log(err);
    }
  }, [deletePost, navigate, id]);

  if (!data || isLoading) {
    return <Loading />;
  }

  return (
    <>
      <section className="mx-auto max-w-full sm:max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        <div className="mb-auto">
          <div className="mx-auto max-w-full sm:max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
            <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
              <header className="pt-6 xl:pb-6 relative">
                <div className="space-y-1 text-center">
                  <dl className="space-y-10">
                    <div>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={data.createdAt}>
                          {formatDate(data.createdAt)}
                        </time>
                      </dd>
                    </div>
                  </dl>
                  <div className="relative">
                    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                      {data.title}
                    </h1>

                    <div className="absolute right-0 top-0 mt-2 mr-4 flex flex-col sm:flex-row gap-2 sm:gap-4">
                      <button
                        className="inline-block rounded bg-blue-700 px-4 py-1 text-center text-xs font-semibold leading-loose text-white hover:bg-blue-300 sm:w-auto w-full"
                        onClick={() => {
                          setIsUpdateModalOpen(true);
                        }}
                      >
                        UPDATE
                      </button>
                      <button
                        className="inline-block rounded bg-red-700 px-4 py-1 text-center text-xs font-semibold leading-loose text-white hover:bg-red-300 sm:w-auto w-full"
                        onClick={handleDelete}
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                </div>
              </header>
              <div className="pt-5 prose prose-sm sm:prose lg:prose-lg xl:prose-xl text-gray-900 dark:text-gray-100">
                {data.content}
              </div>
            </div>
          </div>
        </div>
      </section>
      {isUpdateModalOpen && (
        <PostModal setIsModalOpen={setIsUpdateModalOpen} post={data} />
      )}
    </>
  );
};
