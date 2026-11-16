export const getErrorMessage = (error: unknown): string => {
  if (!(error instanceof Error)) {
    return String(error);
  }

  return error.cause ? `${error.message}: ${getErrorMessage(error.cause)}` : error.message;
};
