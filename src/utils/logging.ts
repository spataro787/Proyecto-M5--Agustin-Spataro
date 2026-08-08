export const logError = (message: string, meta?: Record<string, unknown>) => {
  console.error(message, meta ?? {});
};
