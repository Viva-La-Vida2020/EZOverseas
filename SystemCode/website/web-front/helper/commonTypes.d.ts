export interface ErrorMessage {
  message: string;
  code: number;
}

export interface StandardResponse {
  success: boolean;
  message: string;
  status?: number;
  data: any;
}

export interface PaddingList {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}
