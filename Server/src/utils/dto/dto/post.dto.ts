export interface CreatePostRequestDTO {
  title: string;
  content: string;
  image?: string;
  author: string;
  category: string;
  tags: string[];
  status: "draft" | "published";
}

export interface UpdatePostRequestDTO {
  title?: string;
  content?: string;
  image?: string;
  category?: string;
  tags?: string[];
  status?: "draft" | "published";
}

export interface PostAuthorDTO {
  id: string;
  fullName: string;
  email: string;
  profileImage?: string;
}

export interface PostResponseDTO {
  id: string;
  title: string;
  content: string;
  image?: string;
  author: string | PostAuthorDTO;
  category: string;
  tags: string[];
  status: "draft" | "published";
  createdAt?: Date;
  updatedAt?: Date;
}
