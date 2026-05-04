import api from "../Services/api";
import axios, { type AxiosRequestConfig } from "axios";
import { showErrorToast } from "../Elements/ErrorToast";
import type { HttpMethod } from "../constants/httpMethod";

export const apiRequest = async <T>(
  method: HttpMethod,
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const response = await api({
      method,
      url,
      data,
      ...config,
    });
    return response.data as T;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      let message = "Request failed";

      if (typeof error.response?.data === "string") {
        message = error.response.data;
      } else if (error.response?.data?.message) {
        message = error.response.data.message;
      }
      const err = {
        message,
      };
      console.log(message, "mess");
      throw err;
    } else if (error instanceof Error) {
      showErrorToast(error.message);
    } else {
      showErrorToast("An unknown error occurred");
    }

    throw error;
  }
};
