export interface BaristaSign {
  id: string;
  name: string;
  meaning: string;
  description: string;
  motionTip: string;
  customerContext: string;
  etiquetteTip: string;
  facialExpressionTip: string;
  handShapeTips: string[];
  videoSrc?: string;
  imageSrc?: string;
  emoji: string;
}

export interface BaristaQuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
}

export interface BaristaQuestion {
  id: string;
  question: string;
  scenarioContext?: string;
  options: BaristaQuestionOption[];
  explanation: string;
}

export interface BaristaLesson {
  id: string;
  topicId: string;
  order: number;
  title: string;
  subtitle: string;
  sign: BaristaSign;
  questions: BaristaQuestion[];
  xp: number;
}

export interface BaristaTopic {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  badge: string;
  accentColor: string;
  description: string;
  phrases: string[];
  lessons: BaristaLesson[];
}

export interface BaristaProgress {
  completedLessonIds: string[];
  topicProgress: Record<string, number>; // topicId -> percentage
}
