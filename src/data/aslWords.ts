import { AslWord } from "../types";
import helloImage from "../assets/images/asl_hello_gesture_1789126726923.jpg";
import thankYouImage from "../assets/images/asl_thank_you_1789126742990.jpg";
import helpImage from "../assets/images/asl_help_gesture_1789126757505.jpg";
import yesImage from "../assets/images/asl_yes_gesture_1789126771568.jpg";
import noImage from "../assets/images/asl_no_gesture_1789126788397.jpg";

export const ASL_WORDS: AslWord[] = [
  {
    id: "hello",
    word: "HELLO",
    category: "Greetings",
    emoji: "👋",
    imageSrc: helloImage,
    videoSrc: "/videos/asl_hello_demo.mp4",
    description: "Touch your fingertips to your temple or forehead, then extend your hand outward in a friendly salute gesture.",
    motionTip: "Open flat 5-hand palm facing outward, moving smoothly away from your temple.",
    handShapeTips: [
      "Fingers together and straight",
      "Thumb resting gently alongside the palm",
      "Salute outward about 6 inches toward your viewer"
    ]
  },
  {
    id: "thank_you",
    word: "THANK YOU",
    category: "Politeness",
    emoji: "🙏",
    imageSrc: thankYouImage,
    videoSrc: "/videos/asl_thank_you_demo.mp4",
    description: "Start with the fingertips of your flat dominant hand lightly touching your chin or lips, then move your hand forward and down toward the person.",
    motionTip: "Gentle outward sweep from your chin, smiling warmly.",
    handShapeTips: [
      "Flat open hand with fingers together",
      "Touch chin/lower lip with fingertips",
      "Move palm forward and slightly upward"
    ]
  },
  {
    id: "help",
    word: "HELP",
    category: "Essentials",
    emoji: "🤝",
    imageSrc: helpImage,
    videoSrc: "/videos/asl_help_demo.mp4",
    description: "Form a thumbs-up fist with your dominant hand and place it on top of your flat, open non-dominant palm. Lift both hands together slightly.",
    motionTip: "Upward supportive lifting motion of both hands together.",
    handShapeTips: [
      "Non-dominant hand flat, palm facing up",
      "Dominant hand makes an 'A' thumbs-up fist",
      "Rest fist on palm and lift upward 2-3 inches"
    ]
  },
  {
    id: "yes",
    word: "YES",
    category: "Answers",
    emoji: "👍",
    imageSrc: yesImage,
    videoSrc: "/videos/asl_yes_demo.mp4",
    description: "Make an 'S' fist at chest height and tilt your wrist up and down repeatedly, mimicking a nodding head.",
    motionTip: "Wrist flexes forward and back twice, like a head nodding 'yes'.",
    handShapeTips: [
      "Closed fist with thumb folded across fingers",
      "Hold fist at shoulder/chest level",
      "Flex wrist up and down rhythmically"
    ]
  },
  {
    id: "no",
    word: "NO",
    category: "Answers",
    emoji: "🙅",
    imageSrc: noImage,
    videoSrc: "/videos/asl_no_demo.mp4",
    description: "Extend your index and middle fingers together, then snap them firmly downward to tap your thumb twice, like a bird's beak snapping shut.",
    motionTip: "Quick, decisive closure of two fingers against the thumb.",
    handShapeTips: [
      "Index and middle fingers extended together",
      "Thumb pointed outward underneath them",
      "Snap the two fingers down to meet the thumb"
    ]
  }
];
