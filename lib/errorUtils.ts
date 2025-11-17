export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  // This handles Supabase PostgrestError and other error-like objects
  if (error && typeof error === 'object' && 'message' in error && typeof (error as any).message === 'string') {
    return (error as any).message;
  }
  if (typeof error === 'string') {
    return error;
  }
  // Fallback for unexpected error types
  try {
    return `An unexpected error occurred: ${JSON.stringify(error)}`;
  } catch {
    return 'An unknown and non-serializable error occurred';
  }
};
