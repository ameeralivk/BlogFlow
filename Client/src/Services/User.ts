import { apiRequest } from "../api/apiRequest";
import { HTTP_METHOD } from "../constants/httpMethod";
import { API_ROUTES } from "../constants/ApiRoutes";

export const getUserProfile = async (id: string): Promise<any> => {
  return apiRequest(HTTP_METHOD.GET, API_ROUTES.AUTH.PROFILE(id));
};

export const updateUserProfile = async (id: string, data: FormData): Promise<any> => {
  return apiRequest(HTTP_METHOD.PUT, API_ROUTES.AUTH.PROFILE(id), data);
};
