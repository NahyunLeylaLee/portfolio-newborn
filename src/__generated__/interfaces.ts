import { QuestionType } from './globalTypes';

export interface ISurvey {
  id: string;
  title: string;
  description: string;
  order: number;
  isMain: boolean;
  isBasic: boolean;
  startSending: boolean;
  nextSectionId: string;
  age: number;
  term: number;
}

export interface IQuestion {
  id: string | number;
  surveyId: string;
  type: QuestionType;
  title: string;
  order: number;
  isRequired: boolean;
  basedOnAnswer: boolean;
  minLabel: string;
  maxLabel: string;
}

export interface IOption {
  surveyId: string;
  questionId: string | number;
  order: number;
  title: string;
  isRow: boolean;
}

