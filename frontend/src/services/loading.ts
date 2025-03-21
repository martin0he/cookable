import { QueryClient } from "react-query";

const conditionalDelay = async <T>(
  promise: Promise<T>,
  thresholdMs: number,
  delayMs: number
): Promise<T> => {
  const startTime = Date.now();
  const result = await promise;
  const elapsedTime = Date.now() - startTime;

  if (elapsedTime < thresholdMs) {
    const remainingDelay = delayMs - elapsedTime;
    await new Promise((resolve) => setTimeout(resolve, remainingDelay));
  }
  return result;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const url = `/api${queryKey[0]}`;
        const fetchPromise = fetch(url).then((res) => {
          if (!res.ok) throw new Error("Network response was not ok");
          return res.json();
        });

        return conditionalDelay(fetchPromise, 400, 1500);
      },
      staleTime: 10 * 60 * 1000, // 10 minutes
      cacheTime: 60 * 60 * 1000, // 60 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
    },
  },
});
