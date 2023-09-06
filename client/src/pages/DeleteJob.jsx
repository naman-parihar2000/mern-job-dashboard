import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";

export const action = async ({ params }) => {
  try {
    await customFetch.delete(`/jobs/${params.id}`);
    toast.success("Job deleted successfully");
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.msg || "Server error";
      toast.error(errorMessage);
    } else if (error.request) {
      toast.error("No response from the server");
    } else {
      toast.error("An error occurred");
    }
  }
  return redirect("/dashboard/all-jobs");
};
