// Helper function to sanitize the input values
export const sanitizeInput = (value: string | undefined) => {
  return value?.replace(/[^\w-]/g, ''); // Remove unexpected characters
};
