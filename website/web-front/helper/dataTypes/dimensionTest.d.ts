export interface Answer {
  id: number;
  dimensionId: number;
  questionId: number;
  subject: string;
}

export interface Question {
  id: number;
  subject: string;
  topicId: number;
  answers: Answer[];
}

export interface Topic {
  id: number;
  name: string;
}

export interface CurrentAnswer {
  questionId: number;
  topicId: number;
  dimensionId: number;
  answerId: number;
}

export interface QuestionGroup {
  id: number;
  name: string;
  questionsPerPage: number;
  questions: Question[];
}
