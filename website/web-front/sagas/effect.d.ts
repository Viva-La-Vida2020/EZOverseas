export interface ResponseData {
  success: boolean;
  message: string;
  data: Array<any>;
}

export interface StandardResponse {
  data: any;
  success: boolean;
  message: string;
  code?: number;
}
