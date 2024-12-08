import axios from "axios";

export const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Server responded with an error
      throw new Error(
        error.response.data?.message ||
          `Server error: ${error.response.status} ${error.response.statusText}`
      );
    } else if (error.request) {
      // No response received from the server
      throw new Error("No response received from the server.");
    } else {
      // Error in request setup
      throw new Error(
        error.message || "An error occurred while making the request."
      );
    }
  } else {
    // Generic non-Axios error
    throw new Error(
      (error as Error).message || "An unexpected error occurred."
    );
  }
};
