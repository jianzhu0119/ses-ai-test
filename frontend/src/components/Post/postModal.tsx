import { useCreatePost, useUpdatePost } from "@/services/post";
import { Post } from "@/services/post/types";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface IFormInputs {
  title: string;
  content: string;
}

interface PostModalProps {
  post?: Post;
  setIsModalOpen: (value: boolean) => void;
}

export const PostModal: React.FC<PostModalProps> = ({
  post,
  setIsModalOpen,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInputs>();
  const { mutateAsync: createPost } = useCreatePost();
  const { mutateAsync: updatePost } = useUpdatePost();

  useEffect(() => {
    if (post) {
      setValue("title", post.title);
      setValue("content", post.content);
    }
  }, [post, setValue]);

  const closeModal = useCallback(() => setIsModalOpen(false), [setIsModalOpen]);

  const onSubmit = useCallback(
    async (data: IFormInputs) => {
      try {
        if (post) {
          await updatePost({ ...data, _id: post._id } as Post);
          toast.success("Post successfully updated");
        } else {
          await createPost(data as Post);
          toast.success("Post successfully created");
        }
        closeModal();
      } catch (err) {
        console.error(err);
      }
    },
    [createPost, closeModal, updatePost, post]
  );

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
      ></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:items-start">
              <h3
                className="text-lg font-medium text-gray-900"
                id="modal-title"
              >
                {post ? "Edit Post" : "Create a Post"}
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-0 right-0 mt-3 mr-3 text-gray-500 hover:text-gray-700"
                aria-label="Close"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="bg-white sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-5 space-y-6 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="px-4">
                      <div className="flex items-center justify-between">
                        <label className="block text-sm/6 font-medium text-gray-900">
                          Title
                        </label>
                      </div>
                      <input
                        type="text"
                        {...register("title", {
                          required: "Title is required",
                        })}
                        id="title"
                        autoComplete="title"
                        placeholder="Title"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                      {errors.title && (
                        <p className="text-sm text-red-600">
                          {errors.title.message}
                        </p>
                      )}
                    </div>

                    <div className="px-4">
                      <div className="flex items-center justify-between">
                        <label className="block text-sm/6 font-medium text-gray-900">
                          Content
                        </label>
                      </div>
                      <textarea
                        {...register("content", {
                          required: "Content is required",
                        })}
                        id="content"
                        autoComplete="content"
                        placeholder="Content"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                      {errors.content && (
                        <p className="text-sm text-red-600">
                          {errors.content.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                >
                  {post ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
