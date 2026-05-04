import { apiRequest } from "../api/apiRequest";
import { HTTP_METHOD } from "../constants/httpMethod";
import { API_ROUTES } from "../constants/ApiRoutes";

export const createPost = async (formData: FormData): Promise<any> => {
  return apiRequest(HTTP_METHOD.POST, API_ROUTES.POSTS.BASE, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updatePost = async (id: string, formData: FormData): Promise<any> => {
  return apiRequest(HTTP_METHOD.PUT, API_ROUTES.POSTS.BY_ID(id), formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deletePost = async (id: string): Promise<any> => {
  return apiRequest(HTTP_METHOD.DELETE, API_ROUTES.POSTS.BY_ID(id));
};

export const getAllPosts = async (): Promise<any> => {
  return apiRequest(HTTP_METHOD.GET, API_ROUTES.POSTS.BASE);
};

export const getPostsByAuthor = async (authorId: string): Promise<any> => {
  return apiRequest(HTTP_METHOD.GET, API_ROUTES.POSTS.BY_AUTHOR(authorId));
};

export const getPostById = async (id: string): Promise<any> => {
  return apiRequest(HTTP_METHOD.GET, API_ROUTES.POSTS.BY_ID(id));
};
