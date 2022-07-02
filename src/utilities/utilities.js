export const errorHandler = (error) => {
  return (
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.message.toString()
  );
};
