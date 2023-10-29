import { StandardResponse } from "./commonTypes.d";

export const SIGN_IN_MESSAGE: string = "测试需要登录账号，请点击右上角登录。";
export const TEST_MESSAGE: string = "test";
export const NUMBER_OF_CONSULTANTS_PER_PAGE: number = 3;
export const NUMBER_OF_RANKING_PER_PAGE: number = 20;
export const POPULAR_REGIONS_FOR_RANKING: string[] = [
  "美国",
  "英国",
  "澳大利亚",
  "加拿大",
];

export const CONNECTION_FAILURE: StandardResponse = {
  success: false,
  message: "无法连接到服务器。",
  status: 500,
  data: null,
};

export const sectionPaddingLeft: any = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 5,
  xl: 5,
  xxl: 5,
};

export const sectionPaddingRight: any = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 5,
  xl: 5,
  xxl: 5,
};

export const sectionPaddingTop: any = {
  xs: 3,
  sm: 4,
  md: 5,
  lg: 5,
  xl: 8,
  xxl: 9,
};

export const sectionPaddingBottom: any = {
  xs: 3,
  sm: 4,
  md: 5,
  lg: 5,
  xl: 8,
  xxl: 9,
};

export const divDefaultPadding: any = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 3,
  xl: 5,
  xxl: 5,
};

export const deviationMeasureList: number[] = [
  0, 0.25, 0.5, 0.75, 1, 1.25, 1.33, 1.55, 1.9, 2.25, 2.5, 3, 4,
];
