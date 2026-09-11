/**
 * Types for the Duolingo-style Customer Service ASL Training System
 */

export type CustomerMood = "WAITING" | "HAPPY" | "CONFUSED" | "NEEDS_SMILE" | "SUCCESS";

export type ExerciseType =
  | "learn"
  | "identify"
  | "choose-response"
  | "practice"
  | "scenario";

export interface LearnContent {
  workplaceSituation: string;
  signName: string;
  meaning: string;
  customerEtiquetteTip: string;
  facialExpressionTip: string;
  imageSrc?: string;
  videoSrc?: string;
  motionDescription: string;
  keyRule: string;
}

export interface IdentifyContent {
  customerContext: string;
  customerPrompt: string;
  customerSignVisual?: string;
  customerMoodInitial: CustomerMood;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  explanation: string;
}

export interface ChooseResponseContent {
  customerContext: string;
  customerDialogue: string;
  customerSignSummary: string;
  customerMoodInitial: CustomerMood;
  question: string;
  options: {
    id: string;
    text: string;
    isAppropriate: boolean;
    customerReaction: CustomerMood;
    serviceOutcome: string;
  }[];
  whyThisMatters: string;
}

export interface PracticeContent {
  workplaceScenario: string;
  promptToWorker: string;
  targetSign: string;
  customerMoodInitial: CustomerMood;
  idealFacialExpression: string;
  handShapeTip: string;
  referenceImageSrc?: string;
  referenceVideoSrc?: string;
  criteria: string[];
}

export interface DialogueTurn {
  customerSpeech: string;
  customerSign: string;
  workerExpectedSign: string;
  workerOptions: {
    id: string;
    label: string;
    isCorrect: boolean;
    customerReaction: CustomerMood;
    feedback: string;
  }[];
}

export interface ScenarioContent {
  setting: string;
  customerPersona: {
    name: string;
    avatar: string;
    note: string;
  };
  customerGoal: string;
  turns: DialogueTurn[];
  successSummary: string;
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  title: string;
  description: string;
  xpReward: number;
  content:
    | LearnContent
    | IdentifyContent
    | ChooseResponseContent
    | PracticeContent
    | ScenarioContent;
}

export interface Lesson {
  id: string;
  levelId: string;
  title: string;
  subtitle: string;
  description: string;
  xp: number;
  iconName: string;
  exercises: Exercise[];
}

export interface Level {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  theme: string;
  description: string;
  badge: string;
  accentColor: string;
  lessons: Lesson[];
}

export interface WorkerTrainingProgress {
  xp: number;
  streakDays: number;
  lastTrainedDate: string;
  completedLessonIds: string[];
  currentLevelNumber: number;
}

export interface SimulatedEvaluationResult {
  detectedSign: string;
  accuracyScore: number;
  facialExpressionValid: boolean;
  feedbackTip: string;
  customerReaction: CustomerMood;
}
