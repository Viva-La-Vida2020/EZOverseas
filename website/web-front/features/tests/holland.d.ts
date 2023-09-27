export interface Characteristic {
  code: string;
  category: string;
  value: string;
}

export interface HollandTestResultCode {
  code: string;
  description: string;
  id: number;
  name: string;
}

export interface HollandTestResultDetails {
  code: string;
  codeId: number;
  desc: string;
  deviation: number;
  id: number;
  title: string;
  total: number;
}

export interface HollandTestResultData {
  codes: HollandTestResultCode[];
  resultDetails: HollandTestResultDetails[];
  title: string;
}

export interface HollandTestResult {
  success: boolean;
  message: string;
  status: number;
  data: HollandTestResultData | null;
}

export interface HollandResultProgram {
  code: string;
  codeGroup: string;
  title: string;
  pId: number;
  pcId: number;
  relatedPrograms: string[];
  rankingBy: string;
  nameForRanking: string;
}

export interface HollandResultJob {
  code: string;
  codeGroup: string;
  title: string;
}

export interface OnEditAnswer {
  id: number;
  value: number;
  topicId: number;
}

export interface OnEditAnswerAndUserInfo {
  OnEditAnswers: OnEditAnswer[];
  userName: string;
  age: number;
  phoneNumber: string;
  source: string;
  reason: string;
}

export interface ResultResponse {
  success: boolean;
  data: {
    newResultId: number;
  } | null;
  message: string;
}

export interface HollandTestResultCode {
  code: string;
  description: string;
  id: number;
  name: string;
}

export interface HollandTestResultDetails {
  code: string;
  codeId: number;
  desc: string;
  deviation: number;
  id: number;
  title: string;
  total: number;
}

export interface HollandTestResultData {
  codes: HollandTestResultCode[];
  resultDetails: HollandTestResultDetails[];
  title: string;
}

export interface HollandTestResult {
  success: boolean;
  message: string;
  status: number;
  data: HollandTestResultData | null;
}
