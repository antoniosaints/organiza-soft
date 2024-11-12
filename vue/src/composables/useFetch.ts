import axiosService from "@/services/http/axiosService";
import { ref } from "vue";
type IMethods = "get" | "post" | "put" | "delete" | "patch";
export function useFetch(
  url: string,
  method: IMethods = "get",
  body: any = null
) {
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const fetchData = async () => {
    loading.value = true;
    try {
      let response = null;
      if (method === "get") {
        response = await axiosService.get(url);
      } else if (method === "post") {
        if (!body) body = {};
        response = await axiosService.post(url, body);
      } else if (method === "put") {
        if (!body) body = {};
        response = await axiosService.put(url, body);
      } else if (method === "delete") {
        response = await axiosService.delete(url);
      } else if (method === "patch") {
        if (!body) body = {};
        response = await axiosService.patch(url, body);
      }
      data.value = await response?.data;
    } catch (err: any) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  fetchData();

  return { data, loading, error };
}
