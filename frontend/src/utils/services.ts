import type { AxiosError } from "axios";
import { toast } from "react-toastify";

interface ErrorResponse {
  message?: string;
}

export const handleResponseError = (errorDefaultMessage?: string) => {
  return (error: AxiosError<ErrorResponse>) => {
    const errorMessage =
      error.response?.data?.message ||
      errorDefaultMessage ||
      "Um error ocorreu, tente novamente mais tarde";

    toast.error(errorMessage);

    throw error;
  };
};
