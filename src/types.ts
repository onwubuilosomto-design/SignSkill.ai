export interface EvaluationResult {
  is_correct: boolean;
  score: number;
  feedback: string;
}

export interface AslWord {
  id: string;
  word: string;
  category: string;
  description: string;
  motionTip: string;
  handShapeTips: string[];
  emoji: string;
  imageSrc?: string;
  videoSrc?: string;
}

export interface MediaCapturePayload {
  videoBase64?: string;
  imageBase64?: string;
  keyframeBase64?: string;
  mimeType?: string;
  previewUrl?: string;
}
