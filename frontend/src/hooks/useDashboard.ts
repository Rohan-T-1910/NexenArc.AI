import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/services";

export function useDashboardMetrics() {
  return useQuery({
    queryKey: ["dashboardMetrics"],
    queryFn: () => apiClient.getDashboardMetrics(),
  });
}
