import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Loading } from '@/components/Loading';
import { PostModal } from '@/components/Post/postModal';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/consts';
import useDebounce from '@/hooks/use-debounce';
import { paths } from '@/router/paths';
import { useGetAllPosts } from '@/services/post';
import { GetAllPostsQuery } from '@/services/post/types';
import { classNames, truncateText } from '@/utils';
import { changeDateFormat } from '@/utils/dateUtils';

interface BlogCardProps {
  image: string;
  date: string;
  CardTitle: string;
  CardDescription: string;
  postId: string;
}

const BlogCard = ({
  image,
  date,
  CardTitle,
  CardDescription,
  postId,
}: BlogCardProps) => {
  const navigate = useNavigate();
  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/3">
      <div className="mb-10 w-full">
        <div className="mb-8 overflow-hidden rounded">
          <img src={image} alt="" className="w-full" />
        </div>
        <div>
          {date && (
            <span className="mb-5 inline-block rounded bg-blue-700 px-4 py-1 text-center text-xs font-semibold leading-loose text-white">
              {changeDateFormat(date)}
            </span>
          )}
          <h3>
            <a
              className="mb-4 inline-block text-xl font-semibold text-dark hover:text-primary dark:text-white sm:text-2xl lg:text-xl xl:text-2xl hover:cursor-pointer"
              onClick={() =>
                navigate(`${paths.post.view.replace(':id', postId)}`)
              }
            >
              {CardTitle}
            </a>
          </h3>
          <p className="text-base text-body-color dark:text-dark-6">
            {CardDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export const PostPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(DEFAULT_PAGE);
  const limit = DEFAULT_PAGE_SIZE;
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 1000);

  const query: GetAllPostsQuery = {
    page,
    limit,
    searchQuery: debouncedSearchQuery,
  };

  const { data, isLoading, refetch } = useGetAllPosts(query);

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (!data) return;
      if (newPage > 0 && newPage <= data.totalPages) {
        setPage(newPage);
      }
    },
    [data],
  );

  const handleSearch = useCallback(() => {
    refetch();
    setPage(1);
  }, [refetch]);

  if (!data || isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full">
      <div className="bg-white pt-2 dark:bg-dark lg:pt-[10px]">
        <div className="px-4 sm:px-6 lg:px-10 pt-2 flex flex-wrap justify-end">
          <div className="relative flex gap-2 justify-center align-center w-full sm:max-w-[300px] md:max-w-[400px] lg:max-w-[400px] mb-[30px] text-center lg:mb-4 sm:mr-4 md:mr-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for a title..."
                className="w-full px-4 py-1 text-md border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-lg text-primary mr-4"
                onClick={handleSearch}
              >
                🔍
              </button>
            </div>
            <div className="flex">
              <button
                className="inline-block rounded bg-blue-700 px-4 py-1 text-center text-xs font-semibold leading-loose text-white hover:bg-blue-300"
                onClick={() => setIsCreateModalOpen(true)}
              >
                CREATE
              </button>
            </div>
          </div>

          <div className="w-full flex flex-wrap">
            {data.posts.length === 0 && (
              <div className="text-center pb-8 w-full font-sans text-base sm:text-lg md:text-xl text-gray-400">
                No data
              </div>
            )}
            {data.posts.map((post) => (
              <BlogCard
                key={post._id}
                date={post.createdAt}
                CardTitle={post.title}
                CardDescription={truncateText(post.content, 100)}
                image="https://i.ibb.co/Cnwd4q6/image-01.jpg"
                postId={post._id}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => handlePageChange(page - 1)}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(page + 1)}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            disabled={page === data.totalPages}
          >
            Next
          </button>
        </div>

        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{' '}
              <span className="font-medium">
                {(data.currentPage - 1) * limit + 1}
              </span>{' '}
              to{' '}
              <span className="font-medium">
                {(data.currentPage - 1) * limit + data.posts.length}
              </span>{' '}
              of <span className="font-medium">{data.totalPosts}</span> results
            </p>
          </div>
          <div>
            <nav
              aria-label="Pagination"
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            >
              <ul className="inline-flex -space-x-px text-base h-10">
                <li>
                  <button
                    className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: data?.totalPages }, (_, index) => (
                  <li key={index}>
                    <button
                      className={classNames(
                        'flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
                        page === index + 1
                          ? 'bg-blue-600 text-blue-100'
                          : 'text-gray-300 hover:bg-blue-400 hover:text-white',
                      )}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}

                <li>
                  <button
                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === data.totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      {isCreateModalOpen && <PostModal setIsModalOpen={setIsCreateModalOpen} />}
    </div>
  );
};
