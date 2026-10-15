import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/services";

export function useReports() {
  return useQuery({
    queryKey: ["reports"],
    queryFn: () => apiClient.getReports(),
  });
}
