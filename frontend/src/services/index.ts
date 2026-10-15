import type { ApiClient } from "./api.interface";
import { MockApiClient } from "./mockClient";

// In Phase 1 & 2 we use MockApiClient.
// In Phase 3, this can be swapped to HttpApiClient with zero component changes.
export const apiClient: ApiClient = new MockApiClient();

export * from "./api.interface";
