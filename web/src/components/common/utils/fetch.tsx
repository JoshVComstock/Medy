import { serverAPI } from "@/config";
import { ApiResponse } from "@/types/interfaces/ApiResponse";
import { getAuthCookie } from "@/utils/authCookie";

export const PostRequets = async <T,>(
  data: T,
  url: string
): Promise<ApiResponse<T>> => {
  try {
    const token = getAuthCookie();

    const apiUrl = serverAPI + url;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error");
    let errorMessage = "Ocurrio un error en el servidor";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return {
      status: 500,
      message: errorMessage,
      data: {} as T,
    };
  }
};


export const PutRequest = async <T,>(
  data: T,
  url: string
): Promise<ApiResponse<T>> => {
  try {
    const token = getAuthCookie();

    const apiUrl = serverAPI + url;

    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    console.log(response);

    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error");
    let errorMessage = "Ocurrio un error en el servidor";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return {
      status: 500,
      message: errorMessage,
      data: {} as T,
    };
  }
};