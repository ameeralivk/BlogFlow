import { PostResponseDTO } from "../dto/post.dto";

export const toPostResponseDTO = (post: any): PostResponseDTO => {
  return {
    id: post._id ? post._id.toString() : post.id,
    title: post.title,
    content: post.content,
    image: post.image,
    author: post.author,
    category: post.category,
    tags: post.tags,
    status: post.status,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
};

export const toPostResponseDTOList = (posts: any[]): PostResponseDTO[] => {
  return posts.map((post) => toPostResponseDTO(post));
};
