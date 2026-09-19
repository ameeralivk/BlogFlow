import { Types } from "mongoose";
import { PostDocument } from "../../../models/Post";
import { PostAuthorDTO, PostResponseDTO } from "../dto/post.dto";

interface PopulatedAuthor {
  _id: Types.ObjectId | string;
  fullName: string;
  email: string;
  profileImage?: string;
}

const isPopulatedAuthor = (
  author: PostDocument["author"] | PopulatedAuthor,
): author is PopulatedAuthor => {
  return typeof author === "object" && author !== null && "fullName" in author;
};

const toAuthorDTO = (
  author: PostDocument["author"] | PopulatedAuthor,
): string | PostAuthorDTO => {
  if (isPopulatedAuthor(author)) {
    return {
      id: author._id.toString(),
      fullName: author.fullName,
      email: author.email,
      profileImage: author.profileImage,
    };
  }
  return author.toString();
};

export const toPostResponseDTO = (post: PostDocument): PostResponseDTO => {
  return {
    id: post._id.toString(),
    title: post.title,
    content: post.content,
    image: post.image,
    author: toAuthorDTO(post.author as PostDocument["author"] | PopulatedAuthor),
    category: post.category,
    tags: post.tags ?? [],
    status: post.status,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
};

export const toPostResponseDTOList = (posts: PostDocument[]): PostResponseDTO[] => {
  return posts.map((post) => toPostResponseDTO(post));
};
