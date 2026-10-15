import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/services";

export function useThreatLookup(indicator: string) {
  return useQuery({
    queryKey: ["threatLookup", indicator],
    queryFn: () => apiClient.lookupThreat(indicator),
    enabled: Boolean(indicator && indicator.trim().length > 0),
  });
}
