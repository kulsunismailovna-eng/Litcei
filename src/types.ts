export type OperationType = 'addition' | 'subtraction' | 'mixed';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface ColumnDigit {
  char: string;
  isDecimalPoint?: boolean;
  isPaddedZero?: boolean;
  isCarried?: boolean;
  isBorrowed?: boolean;
}

export interface StepExplanation {
  stepNumber: number;
  title: string;
  description: string;
  highlightDigits?: string[];
}

export interface DecimalExample {
  id: string;
  num1: number;
  num2: number;
  operation: '+' | '-';
  result: number;
  difficulty: DifficultyLevel;
  category: 'кошуу' | 'кемитүү' | 'аралаш';
  title: string;
  explanation: string;
  steps: StepExplanation[];
  num1PaddedStr: string;
  num2PaddedStr: string;
  resultStr: string;
  wordProblemText?: string;
}

export interface PracticeQuestion {
  id: string;
  num1: number;
  num2: number;
  operation: '+' | '-';
  correctAnswer: number;
  difficulty: DifficultyLevel;
  num1PaddedStr: string;
  num2PaddedStr: string;
  hint: string;
  explanationSteps: string[];
}

export interface WordProblem {
  id: string;
  title: string;
  story: string;
  expression: string;
  num1: number;
  num2: number;
  operation: '+' | '-';
  correctAnswer: number;
  unit: string;
  explanation: string;
  steps: string[];
}
