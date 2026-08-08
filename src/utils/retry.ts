export const retryDelay = (attempt: number): number => Math.min(1000 * 2 ** attempt, 8000);

export const isRetryableStatus = (status: number | undefined): boolean => {
  return status === 429 || status === 502 || status === 503;
};
