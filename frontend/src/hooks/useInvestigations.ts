import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient, type CreateInvestigationInput, type InvestigationFilters } from "@/services";

export function useInvestigations(filters?: InvestigationFilters) {
  return useQuery({
    queryKey: ["investigations", filters],
    queryFn: () => apiClient.getInvestigations(filters),
  });
}

export function useInvestigation(id: string) {
  return useQuery({
    queryKey: ["investigation", id],
    queryFn: () => apiClient.getInvestigation(id),
    enabled: Boolean(id),
  });
}

export function useCreateInvestigation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateInvestigationInput) => apiClient.createInvestigation(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["investigations"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardMetrics"] });
    },
  });
}
