export function getDefaultMessage(status: number): string {
  const defaultMessages: Record<number, string> = {
    200: 'Request Successful',
    201: 'Resource Created',
    204: 'Resource Deleted',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    409: 'Conflict',
    429: "Too Many Requests",
    500: 'Internal Server Error',
  };
  return defaultMessages[status] || 'Unknown';
}