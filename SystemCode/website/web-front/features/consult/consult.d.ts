export interface InquiryForm {
  customerId?: number;
  age: number;
  fullName: string;
  cellphone?: string;
  wechatAccNo?: string;
  email: string;
  school?: string;
  inquiry: string;
}

export interface Region {
  id: number;
  name: string;
  index: number;
}

export interface ConsultantDetails {
  tutorId: number;
  programId: number;
  schoolId: number;
  programRankingBy: string;
  programRankingName: string;
  programTitle: string;
  schoolRegionId: number;
  schoolName: string;
  education: string;
}

export interface Consultant {
  id: number;
  fullName: string;
  nickName: string;
  educationLevel: string;
  introduction: string;
  thumbnail: string;
  details: ConsultantDetails[];
}

export interface ConsultingFilter {
  regionId: number;
  programCategoryId: number;
  educationLevel: string;
  keyword: string;
}
