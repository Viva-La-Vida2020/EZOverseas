export interface SchoolRankingItem {
  id: number;
  university: string;
  ranking: string;
  logoPath: string;
  country: string;
}

export interface ProgramRankingItem {
  id: string;
  university: string;
  ranking: string;
  country: string;
  logoPath: string;
  pId: number;
  programTitle: string;
  programDesc: string;
  pcId: number;
  relatedPrograms: string;
  rankingBy: string;
  nameForRanking: string;
}

export interface ProgramRankingFilterOption {
  id: string;
  name: string;
  group: string;
  value: any;
}

export interface ListHeaderData {
  title: string;
  xs: number;
  sm: number;
  md: number;
  lg: number;
}
