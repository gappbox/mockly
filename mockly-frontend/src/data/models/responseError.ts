export type ResponseError = {
  data: {
    errorCode: string;
    errorMessage: string;
    path: string;
    status: number;
    timestamp: string;
  };
};