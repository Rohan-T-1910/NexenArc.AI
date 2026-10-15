import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/services";

export function useAITeam() {
  return useQuery({
    queryKey: ["aiTeam"],
    queryFn: () => apiClient.getTeamMembers(),
  });
}
