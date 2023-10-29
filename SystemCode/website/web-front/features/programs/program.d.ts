export interface BookedProgram {
  userId: number;
  programBookmarkId: number;
  programTitle: string;
  programId: number;
  programDescription: string;
}

export interface ChildProgram {
  id: number;
  content: string;
  index: number;
  name: string;
  pId: number;
}

export interface Course {
  id: number;
  content: string;
  index: number;
  name: string;
  pId: number;
}

export interface Testimonial {
  id: number;
  feedback: string;
  grade: string;
  name: string;
  pId: number;
  program: string;
  school: string;
}

export interface Info {
  id: number;
  index: number;
  pId: number;
  content: string;
  type: string;
}

export interface SelfLearningInfoDetails {
  id: number;
  title: string;
  author: string;
  douban: string;
  is_link: string;
  image: string;
  url: string;
}

export interface SelfLearningInfo {
  id: number;
  image: string;
  index: number;
  title: string;
  details: SelfLearningInfoDetails[];
}

export interface RelatedProgram {
  programId: number;
  pcId: number;
  title: string;
  description: string;
  rankingBy: string;
  nameForRanking: string;
}

export interface ProgramDetails {
  programId: number;
  title: string;
  description: string;
  rankingBy: string;
  nameForRanking: string;
  details: {
    childPrograms: ChildProgram[];
    courses: Course[];
    testimonials: Testimonial[];
    info: Info[];
    description: string;
    programId: number;
    rankingBy: string;
    title: string;
    nameForRanking: string;
    selfLearningInfo: SelfLearningInfo[];
    relatedPrograms: RelatedProgram[];
  };
}

export interface ProgramItem {
  id: number;
  name: string;
  index: number;
  image: string;
  details: ProgramDetails[];
}
