import { Level } from "../types/training";
import helloImage from "../assets/images/asl_hello_gesture_1789126726923.jpg";
import thankYouImage from "../assets/images/asl_thank_you_1789126742990.jpg";
import helpImage from "../assets/images/asl_help_gesture_1789126757505.jpg";
import yesImage from "../assets/images/asl_yes_gesture_1789126771568.jpg";
import noImage from "../assets/images/asl_no_gesture_1789126788397.jpg";

export const TRAINING_LEVELS: Level[] = [
  // ==========================================
  // LEVEL 1: FOUNDATIONS
  // ==========================================
  {
    id: "level-1",
    number: 1,
    title: "Foundations",
    subtitle: "Getting Comfortable",
    theme: "Workplace Etiquette & First Impressions",
    description:
      "Learn the core principles of respectful interaction with deaf and hard-of-hearing customers before taking orders.",
    badge: "🌱",
    accentColor: "#10B981", // Emerald
    lessons: [
      {
        id: "l1-attention",
        levelId: "level-1",
        title: "Getting Their Attention",
        subtitle: "Visual etiquette & respectful greetings",
        description:
          "Learn respectful, natural ways to get a customer's attention in a busy counter environment.",
        xp: 20,
        iconName: "Eye",
        exercises: [
          {
            id: "l1-att-1",
            type: "learn",
            title: "Workplace Attention Rules",
            description: "How to connect with a deaf customer at your counter",
            xpReward: 5,
            content: {
              workplaceSituation:
                "A customer approaches the counter looking at the overhead menu. They have not noticed you yet.",
              signName: "Gentle Wave / Eye Contact",
              meaning: "Polite visual alert without startling",
              customerEtiquetteTip:
                "Deaf culture relies on visual cues. Never shout louder from behind the counter, snap fingers, or touch a customer unexpectedly.",
              facialExpressionTip:
                "Keep an open, pleasant expression with direct eye contact.",
              motionDescription:
                "Raise your hand to shoulder height and wave gently with a small, relaxed movement within their line of sight.",
              keyRule:
                "Rule #1: Wait for eye contact before signing or speaking. A gentle counter tap or small hand wave is respectful.",
              imageSrc: helloImage,
              videoSrc: "/videos/asl_hello_demo.mp4",
            },
          },
          {
            id: "l1-att-2",
            type: "choose-response",
            title: "Counter Situation: Customer Reading Menu",
            description: "Choose the most professional customer-service action",
            xpReward: 5,
            content: {
              customerContext:
                "A customer is standing in front of your register, looking down at their phone screen.",
              customerDialogue:
                "[The customer hasn't looked up yet, but stepped up to the ordering line.]",
              customerSignSummary: "Waiting for an opening",
              customerMoodInitial: "WAITING",
              question:
                "How should you respectfully signal that you are ready to take their order?",
              options: [
                {
                  id: "opt-1",
                  text: "Raise your hand gently in their peripheral sight, make eye contact, and smile.",
                  isAppropriate: true,
                  customerReaction: "HAPPY",
                  serviceOutcome:
                    "Excellent! The customer looks up, sees your warm welcoming gesture, and immediately feels at ease.",
                },
                {
                  id: "opt-2",
                  text: "Call out 'Next in line please!' loudly over the music.",
                  isAppropriate: false,
                  customerReaction: "CONFUSED",
                  serviceOutcome:
                    "Inquiry missed: Shouting or raising vocal volume doesn't assist deaf customers and can look dismissive.",
                },
                {
                  id: "opt-3",
                  text: "Reach across the counter and tap their shoulder firmly.",
                  isAppropriate: false,
                  customerReaction: "CONFUSED",
                  serviceOutcome:
                    "Unsolicited physical contact across a service counter can be startling. Stick to visual signals like a small wave.",
                },
              ],
              whyThisMatters:
                "In service environments, respectful visual engagement creates an immediate sense of safety and professional care.",
            },
          },
          {
            id: "l1-att-3",
            type: "identify",
            title: "Customer Readiness Signals",
            description: "Recognize when the customer is ready to sign",
            xpReward: 5,
            content: {
              customerContext:
                "The customer looks up from their wallet, locks eye contact with you, and raises both hands slightly above the counter.",
              customerPrompt: "The customer is making direct eye contact with relaxed, poised hands.",
              customerMoodInitial: "WAITING",
              question: "What does this posture signal in customer communication?",
              options: [
                {
                  id: "id-1",
                  text: "They are ready to communicate their order and are waiting for your attention.",
                  isCorrect: true,
                  feedback:
                    "Spot on! In sign language, raising hands to chest level with eye contact is the equivalent of clearing one's throat to speak.",
                },
                {
                  id: "id-2",
                  text: "They are unhappy and demanding to see a manager.",
                  isCorrect: false,
                  feedback: "Poised hands with calm eye contact indicates readiness to sign, not frustration.",
                },
                {
                  id: "id-3",
                  text: "They want you to hurry up and guess their order.",
                  isCorrect: false,
                  feedback: "Customer is simply preparing to express their needs visually.",
                },
              ],
              explanation:
                "Deaf customers transition to signing once they confirm the service worker is looking at them.",
            },
          },
        ],
      },
      {
        id: "l1-hello",
        levelId: "level-1",
        title: "Saying Hello",
        subtitle: "Welcoming every customer warmly",
        description:
          "Master the universal ASL greeting that sets a positive tone for the interaction.",
        xp: 20,
        iconName: "Hand",
        exercises: [
          {
            id: "l1-h-1",
            type: "learn",
            title: "The Sign for 'HELLO'",
            description: "Master the standard greeting sign",
            xpReward: 5,
            content: {
              workplaceSituation:
                "The customer walks up to your register. You want to offer a friendly, reassuring greeting.",
              signName: "HELLO",
              meaning: "Friendly greeting / Welcome",
              customerEtiquetteTip:
                "A clean, crisp 'HELLO' sign immediately signals that you are attentive and eager to accommodate them.",
              facialExpressionTip:
                "Warm smile with raised eyebrows! A blank face when signing 'HELLO' can appear robotic or cold.",
              motionDescription:
                "Start with dominant hand fingertips near your forehead/temple, open palm facing outward, and move smoothly away in a salute motion.",
              keyRule:
                "Keep fingers neat and straight together. Don't fling your wrist aggressively.",
              imageSrc: helloImage,
              videoSrc: "/videos/asl_hello_demo.mp4",
            },
          },
          {
            id: "l1-h-2",
            type: "practice",
            title: "Your Turn: Greet the Customer",
            description: "Sign HELLO with a welcoming smile",
            xpReward: 5,
            content: {
              workplaceScenario:
                "Customer Alex steps to the register counter and looks at your name tag.",
              promptToWorker:
                "Greet Alex with the sign for 'HELLO' to open the customer service interaction.",
              targetSign: "HELLO",
              customerMoodInitial: "WAITING",
              idealFacialExpression:
                "Open smile, friendly eye contact, slightly raised eyebrows.",
              handShapeTip:
                "Flat open 5-hand starting at temple and extending gently forward.",
              referenceImageSrc: helloImage,
              referenceVideoSrc: "/videos/asl_hello_demo.mp4",
              criteria: [
                "Dominant hand placed at forehead/temple",
                "Fingers together and extended",
                "Outward salute movement toward customer",
                "Warm, welcoming facial smile",
              ],
            },
          },
          {
            id: "l1-h-3",
            type: "choose-response",
            title: "Customer Welcomed",
            description: "How the customer perceives your greeting",
            xpReward: 5,
            content: {
              customerContext:
                "You signed 'HELLO' with a bright smile. Alex smiles back broadly and signs 'HELLO' back.",
              customerDialogue:
                "[Alex smiles and mirrors your 'HELLO' with a nod of relief.]",
              customerSignSummary: "HELLO! Thank you for greeting me.",
              customerMoodInitial: "HAPPY",
              question: "What is your best immediate follow-up action?",
              options: [
                {
                  id: "h-opt-1",
                  text: "Smile, keep steady eye contact, and hold hands ready to receive their order.",
                  isAppropriate: true,
                  customerReaction: "HAPPY",
                  serviceOutcome:
                    "Perfect! You maintain the connection and demonstrate that you are fully ready to attend to their request.",
                },
                {
                  id: "h-opt-2",
                  text: "Immediately look down at your screen and start punching random register keys.",
                  isAppropriate: false,
                  customerReaction: "CONFUSED",
                  serviceOutcome:
                    "Breaking eye contact right after greeting makes the customer unsure if you are still paying attention.",
                },
              ],
              whyThisMatters:
                "In visual communication, looking away abruptly halts the conversation.",
            },
          },
        ],
      },
      {
        id: "l1-polite",
        levelId: "level-1",
        title: "Basic Polite Signs",
        subtitle: "Thank you, Please & Assistance",
        description:
          "Essential courteous gestures that make every customer feel respected.",
        xp: 20,
        iconName: "Heart",
        exercises: [
          {
            id: "l1-p-1",
            type: "learn",
            title: "The Sign for 'THANK YOU'",
            description: "Express genuine customer gratitude",
            xpReward: 5,
            content: {
              workplaceSituation:
                "Handing over an order, receipt, or change at the counter.",
              signName: "THANK YOU",
              meaning: "Expressing gratitude and appreciation",
              customerEtiquetteTip:
                "Signing 'THANK YOU' at the end of every transaction leaves a lasting, positive impression.",
              facialExpressionTip:
                "Gently nod your head forward while smiling sincerely.",
              motionDescription:
                "Fingertips touch your chin or lips, then move outward and slightly downward toward the customer with an open palm.",
              keyRule:
                "Move outward toward the person you are thanking. Don't blow a kiss.",
              imageSrc: thankYouImage,
              videoSrc: "/videos/asl_thank_you_demo.mp4",
            },
          },
          {
            id: "l1-p-2",
            type: "practice",
            title: "Your Turn: Practice 'THANK YOU'",
            description: "Practice the outward chin movement",
            xpReward: 5,
            content: {
              workplaceScenario:
                "The customer has just tapped their payment card on the terminal.",
              promptToWorker:
                "Sign 'THANK YOU' to conclude the payment step professionally.",
              targetSign: "THANK YOU",
              customerMoodInitial: "WAITING",
              idealFacialExpression: "Pleasant smile with an affirming nod.",
              handShapeTip:
                "Flat dominant palm starting at lips/chin, moving outward toward customer.",
              referenceImageSrc: thankYouImage,
              referenceVideoSrc: "/videos/asl_thank_you_demo.mp4",
              criteria: [
                "Flat hand with fingers touching chin/lips",
                "Clean forward trajectory toward customer",
                "Warm customer-service facial expression",
              ],
            },
          },
          {
            id: "l1-p-3",
            type: "learn",
            title: "The Sign for 'HELP'",
            description: "Offering support or asking if help is needed",
            xpReward: 5,
            content: {
              workplaceSituation:
                "A customer looks at a retail shelf or menu board with uncertainty.",
              signName: "HELP / CAN I HELP?",
              meaning: "Offering customer service assistance",
              customerEtiquetteTip:
                "Pairing 'HELP' with raised eyebrows turns it into the polite question: 'May I help you?'",
              facialExpressionTip:
                "Slight tilt of the head and raised eyebrows to indicate an open offer.",
              motionDescription:
                "Place a dominant thumbs-up fist (A-hand) onto your flat, open non-dominant palm. Lift both hands together upward.",
              keyRule:
                "Lifting toward the customer implies 'help you'. Lifting toward yourself implies 'help me'.",
              imageSrc: helpImage,
              videoSrc: "/videos/asl_help_demo.mp4",
            },
          },
        ],
      },
      {
        id: "l1-expression",
        levelId: "level-1",
        title: "Facial Expression & Body Language",
        subtitle: "Why your face is half the sign",
        description:
          "In ASL and customer service, facial expressions convey grammar, warmth, and emotion.",
        xp: 20,
        iconName: "Smile",
        exercises: [
          {
            id: "l1-exp-1",
            type: "learn",
            title: "Grammar & Warmth in the Face",
            description: "Understand non-manual markers in Deaf culture",
            xpReward: 5,
            content: {
              workplaceSituation:
                "Why customer service workers cannot sign with a blank stare.",
              signName: "Non-Manual Signals (NMS)",
              meaning: "Facial expressions serve as punctuation and tone of voice",
              customerEtiquetteTip:
                "In spoken language, tone of voice expresses friendliness or sarcasm. In sign language, your facial expression is your tone of voice.",
              facialExpressionTip:
                "Raised eyebrows = Questions. Relaxed smile = Welcoming. Blank stare = Distant or irritated.",
              motionDescription:
                "Match your facial expression to the message. When saying 'THANK YOU', a warm smile confirms genuine appreciation.",
              keyRule:
                "Customer principle: Even a technically correct hand sign feels cold or hostile if accompanied by a scowl or blank stare.",
              imageSrc: thankYouImage,
              videoSrc: "/videos/asl_thank_you_demo.mp4",
            },
          },
          {
            id: "l1-exp-2",
            type: "choose-response",
            title: "Scenario: Flat Expression vs. Warm Smile",
            description: "Evaluate customer impact",
            xpReward: 5,
            content: {
              customerContext:
                "A customer approaches. The worker signs 'HELLO' correctly with their hand, but has furrowed brows and looks exhausted.",
              customerDialogue:
                "[Worker signs 'HELLO' with furrowed brow and zero smile.]",
              customerSignSummary: "Worker appears stressed or annoyed",
              customerMoodInitial: "NEEDS_SMILE",
              question: "How does the customer likely interpret this interaction?",
              options: [
                {
                  id: "exp-1",
                  text: "They may feel unwelcome or worry that they are an inconvenience to the worker.",
                  isAppropriate: true,
                  customerReaction: "NEEDS_SMILE",
                  serviceOutcome:
                    "Spot on. A furrowed brow in ASL can signal frustration, anger, or confusion.",
                },
                {
                  id: "exp-2",
                  text: "They will think the worker is demonstrating extreme professionalism.",
                  isAppropriate: false,
                  customerReaction: "CONFUSED",
                  serviceOutcome:
                    "In visual languages, a stern or deadpan face does not read as professional; it reads as upset.",
                },
              ],
              whyThisMatters:
                "Warmth and hospitality must be expressed through facial and posture cues when serving deaf customers.",
            },
          },
        ],
      },
    ],
  },

  // ==========================================
  // LEVEL 2: TAKING AN ORDER
  // ==========================================
  {
    id: "level-2",
    number: 2,
    title: "Taking Orders",
    subtitle: "Counter & Cafe Interactions",
    theme: "Drinks, Preferences & Confirmations",
    description:
      "Handle a complete beverage transaction: greetings, drink selections, milk preferences, and order confirmations.",
    badge: "☕",
    accentColor: "#F59E0B", // Amber
    lessons: [
      {
        id: "l2-greeting-order",
        levelId: "level-2",
        title: "Greeting & Asking What They Need",
        subtitle: "Opening the counter order",
        description:
          "Welcome the customer and invite them to share their drink preferences.",
        xp: 20,
        iconName: "Coffee",
        exercises: [
          {
            id: "l2-go-1",
            type: "learn",
            title: "Asking: 'WHAT YOU WANT?'",
            description: "Standard casual customer service inquiry",
            xpReward: 5,
            content: {
              workplaceSituation:
                "The customer arrives at the cafe counter ready to order.",
              signName: "WANT / WHAT WANT?",
              meaning: "What would you like? / What can I get for you?",
              customerEtiquetteTip:
                "Keep hands at mid-chest level where both you and the customer can view them comfortably.",
              facialExpressionTip:
                "Slight brow furrow with an open, inquiring gaze when asking 'WHAT'.",
              motionDescription:
                "Palms up with clawed/relaxed fingers, pulling slightly toward you to sign 'WANT'.",
              keyRule:
                "Stay patient and give the customer time to frame their request without rushing them.",
              imageSrc: helpImage,
            },
          },
          {
            id: "l2-go-2",
            type: "identify",
            title: "Customer Order: Drink Type",
            description: "Identify what the customer is ordering",
            xpReward: 5,
            content: {
              customerContext:
                "The customer makes a circular grinding motion with one fist over the other, then signs 'ICED'.",
              customerPrompt: "Customer signs: [COFFEE] + [ICED] + [LATTE]",
              customerMoodInitial: "WAITING",
              question: "What drink is the customer requesting?",
              options: [
                {
                  id: "dr-1",
                  text: "An Iced Latte (Cold espresso with milk)",
                  isCorrect: true,
                  feedback:
                    "Correct! The customer signed Coffee/Latte + Cold/Iced.",
                },
                {
                  id: "dr-2",
                  text: "A hot black drip coffee with no room",
                  isCorrect: false,
                  feedback: "Notice the 'ICED' gesture accompanied by latte motion.",
                },
                {
                  id: "dr-3",
                  text: "A glass of tap ice water",
                  isCorrect: false,
                  feedback: "The customer clearly indicated coffee/espresso.",
                },
              ],
              explanation:
                "Recognizing drink categories (Coffee, Tea, Water, Iced) lets you quickly narrow down cafe orders.",
            },
          },
        ],
      },
      {
        id: "l2-milk",
        levelId: "level-2",
        title: "Milk & Dietary Preferences",
        subtitle: "Oat milk, Almond & Dairy options",
        description:
          "Dietary choices are critical in food service. Learn to recognize milk preferences.",
        xp: 20,
        iconName: "Milk",
        exercises: [
          {
            id: "l2-m-1",
            type: "learn",
            title: "Understanding 'OAT MILK'",
            description: "Common cafe substitution",
            xpReward: 5,
            content: {
              workplaceSituation:
                "Customer points to the milk pitcher or signs 'O-A-T' fingerspelled followed by the squeezing 'MILK' sign.",
              signName: "O-A-T + MILK",
              meaning: "Requesting oat milk as a dairy alternative",
              customerEtiquetteTip:
                "Fingerspelling short 3-letter words like O-A-T is very common in cafes. Watch for letter shapes O, A, T.",
              facialExpressionTip:
                "Affirmative nod once you catch the letters O-A-T.",
              motionDescription:
                "Fingerspell O-A-T, followed by dominant fist squeezing downward twice like milking.",
              keyRule:
                "Always confirm dietary milk swaps clearly to prevent food allergy issues.",
              imageSrc: helpImage,
            },
          },
          {
            id: "l2-m-2",
            type: "choose-response",
            title: "Responding to Milk Request",
            description: "Confirming the substitution accurately",
            xpReward: 5,
            content: {
              customerContext:
                "Customer signs: 'ICED LATTE, O-A-T MILK, PLEASE.'",
              customerDialogue:
                "'I would like an iced latte with oat milk please.'",
              customerSignSummary: "Oat milk preference stated",
              customerMoodInitial: "WAITING",
              question: "How should you respond to confirm their milk preference?",
              options: [
                {
                  id: "m-opt-1",
                  text: "Nod affirmatively, sign 'YES', and point to the Oat Milk option on your screen/cup.",
                  isAppropriate: true,
                  customerReaction: "HAPPY",
                  serviceOutcome:
                    "Excellent! The customer sees you understood their dietary preference and feels confident in their order.",
                },
                {
                  id: "m-opt-2",
                  text: "Pour regular dairy milk immediately without acknowledging.",
                  isAppropriate: false,
                  customerReaction: "CONFUSED",
                  serviceOutcome:
                    "Ignoring dietary preferences can trigger lactose intolerance or allergic reactions.",
                },
                {
                  id: "m-opt-3",
                  text: "Sign 'NO' and shake your head without explaining.",
                  isAppropriate: false,
                  customerReaction: "CONFUSED",
                  serviceOutcome:
                    "Signing 'NO' abruptly leaves the customer confused about whether oat milk is out of stock.",
                },
              ],
              whyThisMatters:
                "Confirmation provides peace of mind for dietary accommodations.",
            },
          },
          {
            id: "l2-m-3",
            type: "practice",
            title: "Your Turn: Confirm with 'YES'",
            description: "Practice the ASL 'YES' nodding gesture",
            xpReward: 5,
            content: {
              workplaceScenario:
                "The customer asks if you have oat milk available today.",
              promptToWorker:
                "Sign 'YES' with a friendly nodding fist to confirm you have oat milk in stock.",
              targetSign: "YES",
              customerMoodInitial: "WAITING",
              idealFacialExpression:
                "Smiling head nod matching the wrist movement.",
              handShapeTip:
                "Make an S-fist at chest height and tilt your wrist up and down rhythmically.",
              referenceImageSrc: yesImage,
              referenceVideoSrc: "/videos/asl_yes_demo.mp4",
              criteria: [
                "Closed fist at chest/shoulder level",
                "Wrist flexes forward and down like a nodding head",
                "Warm affirming facial expression",
              ],
            },
          },
        ],
      },
      {
        id: "l2-confirm",
        levelId: "level-2",
        title: "Confirming the Order",
        subtitle: "Reviewing details before payment",
        description:
          "Verify cup size, temperature, and total before charging the customer.",
        xp: 20,
        iconName: "CheckSquare",
        exercises: [
          {
            id: "l2-c-1",
            type: "learn",
            title: "Order Confirmation Technique",
            description: "Visual recap at the register",
            xpReward: 5,
            content: {
              workplaceSituation:
                "Before processing payment, recap the full drink to ensure zero mistakes.",
              signName: "Order Recap & Screen Pointing",
              meaning: "Showing customer-facing register display or thumbs up",
              customerEtiquetteTip:
                "Turn the customer-facing tablet screen or point to the register display so the deaf customer can visually verify items and prices.",
              facialExpressionTip:
                "Questioning tilt with raised eyebrows: 'Everything look correct?'",
              motionDescription:
                "Point clearly to the screen summary, look at customer, and nod.",
              keyRule:
                "Visual receipts and screen confirmations eliminate 99% of register mistakes.",
              imageSrc: yesImage,
            },
          },
          {
            id: "l2-c-2",
            type: "scenario",
            title: "Full Scenario: Complete Drink Order",
            description: "Serve customer Maya from greeting to confirmation",
            xpReward: 10,
            content: {
              setting: "Busy morning cafe counter",
              customerPersona: {
                name: "Maya",
                avatar: "👩‍💼",
                note: "Deaf professional ordering morning caffeine before work",
              },
              customerGoal: "Order an iced latte with oat milk smoothly",
              turns: [
                {
                  customerSpeech: "Maya walks up to the counter and waits for eye contact.",
                  customerSign: "Eye contact established",
                  workerExpectedSign: "HELLO",
                  workerOptions: [
                    {
                      id: "t1-1",
                      label: "Sign 'HELLO' with a welcoming smile",
                      isCorrect: true,
                      customerReaction: "HAPPY",
                      feedback: "Maya smiles warmly and feels welcomed!",
                    },
                    {
                      id: "t1-2",
                      label: "Look down at register and wait in silence",
                      isCorrect: false,
                      customerReaction: "WAITING",
                      feedback: "Maya isn't sure if you've opened the register.",
                    },
                  ],
                },
                {
                  customerSpeech: "Maya signs: 'ICED LATTE + OAT MILK + PLEASE.'",
                  customerSign: "Iced Latte with Oat Milk",
                  workerExpectedSign: "YES",
                  workerOptions: [
                    {
                      id: "t2-1",
                      label: "Sign 'YES' (nodding fist) and turn screen to show 'Iced Oat Latte'",
                      isCorrect: true,
                      customerReaction: "HAPPY",
                      feedback: "Maya gives a thumbs up: 'Perfect, thank you!'",
                    },
                    {
                      id: "t2-2",
                      label: "Shake head and sign 'NO' without checking stock",
                      isCorrect: false,
                      customerReaction: "CONFUSED",
                      feedback: "Maya looks confused: 'Do you not have oat milk?'",
                    },
                  ],
                },
                {
                  customerSpeech: "Maya taps her payment card on the terminal reader.",
                  customerSign: "Payment complete",
                  workerExpectedSign: "THANK YOU",
                  workerOptions: [
                    {
                      id: "t3-1",
                      label: "Sign 'THANK YOU' (chin to outward palm) with a smile",
                      isCorrect: true,
                      customerReaction: "SUCCESS",
                      feedback: "Maya smiles broadly, signs 'THANK YOU', and waits by pickup!",
                    },
                    {
                      id: "t3-2",
                      label: "Turn around immediately to make espresso with back turned",
                      isCorrect: false,
                      customerReaction: "WAITING",
                      feedback: "Maya stands wondering if payment went through.",
                    },
                  ],
                },
              ],
              successSummary:
                "Order completed flawlessly! Maya had a frictionless, dignified, and delightful customer experience.",
            },
          },
        ],
      },
    ],
  },

  // ==========================================
  // LEVEL 3: HANDLING REQUESTS
  // ==========================================
  {
    id: "level-3",
    number: 3,
    title: "Handling Requests",
    subtitle: "Inquiries, Restrooms & Changes",
    theme: "Common Workplace Inquiries",
    description:
      "Master responses to frequent customer questions: 'Where is...?', 'Do you have...?', and accommodating order adjustments.",
    badge: "🧭",
    accentColor: "#3B82F6", // Blue
    lessons: [
      {
        id: "l3-where",
        levelId: "level-3",
        title: "Giving Clear Directions",
        subtitle: "Where is the restroom / pickup?",
        description:
          "Use directional pointing and spatial referencing to guide customers.",
        xp: 20,
        iconName: "Compass",
        exercises: [
          {
            id: "l3-w-1",
            type: "learn",
            title: "The Sign for 'BATHROOM / RESTROOM'",
            description: "Recognize the shaking 'T' handshape",
            xpReward: 5,
            content: {
              workplaceSituation:
                "A customer approaches holding a handbag, looking around the dining room.",
              signName: "BATHROOM / RESTROOM (T-handshake)",
              meaning: "Customer asking where the facilities are",
              customerEtiquetteTip:
                "The ASL sign for bathroom is the letter 'T' (thumb between index and middle fingers) shaken side-to-side.",
              facialExpressionTip:
                "Slight head tilt and pointing clearly toward the hallway or door.",
              motionDescription:
                "Form the 'T' fist and shake it gently from side to side at chest level.",
              keyRule:
                "Point directly in the true physical direction of the restroom rather than speaking complicated street addresses.",
              imageSrc: helpImage,
            },
          },
          {
            id: "l3-w-2",
            type: "choose-response",
            title: "Guiding the Customer",
            description: "How to direct without speaking long verbal sentences",
            xpReward: 5,
            content: {
              customerContext:
                "Customer shakes the 'T' sign with questioning raised eyebrows: 'Bathroom where?'",
              customerDialogue: "'Excuse me, where is your restroom located?'",
              customerSignSummary: "Restroom query",
              customerMoodInitial: "WAITING",
              question: "How should you direct the customer clearly?",
              options: [
                {
                  id: "dir-1",
                  text: "Point toward the hallway to your left, trace a corner turn in the air, and nod with a smile.",
                  isAppropriate: true,
                  customerReaction: "HAPPY",
                  serviceOutcome:
                    "Outstanding visual direction! The customer immediately spots the hallway doorway and nods thank you.",
                },
                {
                  id: "dir-2",
                  text: "Say verbally: 'Down the stairs past the second door behind the supply closet.'",
                  isAppropriate: false,
                  customerReaction: "CONFUSED",
                  serviceOutcome:
                    "Long verbal sentences with rapid lip movement are nearly impossible to lipread in a noisy cafe.",
                },
              ],
              whyThisMatters:
                "Visual pointing and spatial gestures are universally clear.",
            },
          },
        ],
      },
      {
        id: "l3-changes",
        levelId: "level-3",
        title: "Modifying an Order",
        subtitle: "Customer wants to change an item",
        description:
          "Handle changes gracefully when a customer changes their mind before drink preparation.",
        xp: 20,
        iconName: "RefreshCw",
        exercises: [
          {
            id: "l3-ch-1",
            type: "identify",
            title: "Customer Change Request",
            description: "Understand the sign for 'CHANGE / SWAP'",
            xpReward: 5,
            content: {
              customerContext:
                "Customer crosses two hooked fists and twists them to reverse positions, pointing to their iced drink.",
              customerPrompt: "Customer signs: [CHANGE] + [HOT]",
              customerMoodInitial: "WAITING",
              question: "What is the customer asking to modify?",
              options: [
                {
                  id: "ch-1",
                  text: "They want to change their order to a HOT drink instead of iced.",
                  isCorrect: true,
                  feedback:
                    "Exactly right! 'CHANGE' + 'HOT' means they'd prefer the hot version.",
                },
                {
                  id: "ch-2",
                  text: "They are requesting their cash change back in quarters.",
                  isCorrect: false,
                  feedback: "The twist gesture refers to changing the drink type.",
                },
                {
                  id: "ch-3",
                  text: "They want to cancel their entire party reservation.",
                  isCorrect: false,
                  feedback: "They are simply swapping drink temperatures.",
                },
              ],
              explanation:
                "Being flexible and understanding when orders change builds tremendous customer loyalty.",
            },
          },
          {
            id: "l3-ch-2",
            type: "practice",
            title: "Confirming: Sign 'YES / NO PROBLEM'",
            description: "Reassure customer the change is accepted",
            xpReward: 5,
            content: {
              workplaceScenario:
                "Customer asks: 'Can you make that hot instead?'",
              promptToWorker:
                "Sign 'YES' with an affirming head nod to communicate that the change is no trouble.",
              targetSign: "YES",
              customerMoodInitial: "WAITING",
              idealFacialExpression:
                "Reassuring smile indicating happy accommodation.",
              handShapeTip: "S-fist flexing up and down at chest height.",
              referenceImageSrc: yesImage,
              referenceVideoSrc: "/videos/asl_yes_demo.mp4",
              criteria: [
                "Firm, friendly 'YES' fist nod",
                "Reassuring customer service eye contact",
              ],
            },
          },
        ],
      },
      {
        id: "l3-availability",
        levelId: "level-3",
        title: "Explaining Out-of-Stock Items",
        subtitle: "Polite 'NO' and alternative suggestions",
        description:
          "Deliver disappointing news politely without frustrating the customer.",
        xp: 20,
        iconName: "AlertCircle",
        exercises: [
          {
            id: "l3-av-1",
            type: "learn",
            title: "The Sign for 'NO'",
            description: "How to sign 'NO' respectfully in customer service",
            xpReward: 5,
            content: {
              workplaceSituation:
                "A customer asks if you have fresh blueberry muffins left in the pastry case.",
              signName: "NO / ALL-GONE",
              meaning: "Negative response / Out of stock",
              customerEtiquetteTip:
                "When delivering a 'NO' in service, soften it with a gentle head shake and a slight apologetic smile so it doesn't appear blunt.",
              facialExpressionTip:
                "Mild sympathetic expression: 'I wish we had it, but unfortunately not.'",
              motionDescription:
                "Index and middle fingers together snap firmly down to tap the thumb twice like a beak.",
              keyRule:
                "Follow up a 'NO' by offering an alternative: point to almond milk or chocolate croissants!",
              imageSrc: noImage,
              videoSrc: "/videos/asl_no_demo.mp4",
            },
          },
          {
            id: "l3-av-2",
            type: "practice",
            title: "Your Turn: Sign 'NO' with Empathy",
            description: "Practice the 2-finger snap with soft expression",
            xpReward: 5,
            content: {
              workplaceScenario:
                "Customer points to the empty croissant basket and looks questioning.",
              promptToWorker:
                "Sign 'NO' with a sympathetic head shake to communicate they are sold out.",
              targetSign: "NO",
              customerMoodInitial: "WAITING",
              idealFacialExpression:
                "Sympathetic, apologetic face with small head shake.",
              handShapeTip:
                "Index and middle fingers extended, snapping down to meet the thumb.",
              referenceImageSrc: noImage,
              referenceVideoSrc: "/videos/asl_no_demo.mp4",
              criteria: [
                "Index and middle fingers together",
                "Snap down cleanly against thumb",
                "Polite, apologetic facial expression",
              ],
            },
          },
        ],
      },
    ],
  },

  // ==========================================
  // LEVEL 4: DIFFICULT SITUATIONS
  // ==========================================
  {
    id: "level-4",
    number: 4,
    title: "Difficult Situations",
    subtitle: "Misunderstandings & Recovery",
    theme: "Staying Calm, Professional & Patient",
    description:
      "When communication breaks down, what should a worker do? Learn clarifying gestures, pen-and-paper etiquette, and staying composed.",
    badge: "🛡️",
    accentColor: "#8B5CF6", // Purple
    lessons: [
      {
        id: "l4-dont-understand",
        levelId: "level-4",
        title: "When You Don't Understand",
        subtitle: "Admitting limits respectfully",
        description:
          "Never guess or pretend to understand. Learn how to politely ask for clarification.",
        xp: 20,
        iconName: "HelpCircle",
        exercises: [
          {
            id: "l4-du-1",
            type: "learn",
            title: "The Golden Rule: Don't Pretend",
            description: "Why nodding along when lost is dangerous",
            xpReward: 5,
            content: {
              workplaceSituation:
                "A customer signs rapidly. You caught the first sign, but missed the rest.",
              signName: "AGAIN, PLEASE / SLOW",
              meaning: "Please repeat more slowly; I am learning",
              customerEtiquetteTip:
                "Deaf customers deeply respect workers who are honest about learning. Pretending to understand and handing them the wrong food is frustrating.",
              facialExpressionTip:
                "Apologetic brow, small head tilt, sincere smile.",
              motionDescription:
                "Bent dominant fingers curve into the flat non-dominant palm to sign 'AGAIN', then open palm moves slowly down for 'SLOW'.",
              keyRule:
                "Honesty + patience beats fake nodding every single time.",
              imageSrc: helpImage,
            },
          },
          {
            id: "l4-du-2",
            type: "choose-response",
            title: "Scenario: Rapid Signing",
            description: "What to do when lost during an interaction",
            xpReward: 5,
            content: {
              customerContext:
                "The customer signs a complex custom sandwich order at rapid native speed. You only recognized 'BREAD'.",
              customerDialogue:
                "[Rapid multi-clause sign sequence with fingerspelled toppings]",
              customerSignSummary: "Complex customization",
              customerMoodInitial: "WAITING",
              question: "What is your best customer-service response?",
              options: [
                {
                  id: "ru-1",
                  text: "Sign 'AGAIN, SLOW PLEASE' with an open smile, pointing gently to the ingredients display.",
                  isAppropriate: true,
                  customerReaction: "HAPPY",
                  serviceOutcome:
                    "The customer smiles gratefully, slows down, and points directly to turkey and swiss.",
                },
                {
                  id: "ru-2",
                  text: "Nod your head 'YES', punch a random item on the screen, and charge their credit card.",
                  isAppropriate: false,
                  customerReaction: "CONFUSED",
                  serviceOutcome:
                    "The customer ends up paying for the wrong food, requiring a refund and manager intervention.",
                },
                {
                  id: "ru-3",
                  text: "Throw hands up in the air and yell 'Can anyone here talk to this person?'",
                  isAppropriate: false,
                  customerReaction: "CONFUSED",
                  serviceOutcome:
                    "Deeply disrespectful and alienating for the customer.",
                },
              ],
              whyThisMatters:
                "Maintaining poise and asking for a slower repeat keeps the customer feeling valued.",
            },
          },
        ],
      },
      {
        id: "l4-tools",
        levelId: "level-4",
        title: "Alternative Communication Tools",
        subtitle: "Pen, Paper & Phone Notes",
        description:
          "Use smart workplace tools when signs aren't enough to reach 100% clarity.",
        xp: 20,
        iconName: "FileText",
        exercises: [
          {
            id: "l4-t-1",
            type: "learn",
            title: "Counter Pen & Paper Etiquette",
            description: "Seamlessly offering a writing notepad",
            xpReward: 5,
            content: {
              workplaceSituation:
                "When words or numbers are too detailed to fingerspell.",
              signName: "WRITE / PAPER",
              meaning: "Offering a notepad or showing phone screen",
              customerEtiquetteTip:
                "Always keep a clean mini dry-erase board or notepad by the register. Point to it and offer the pen gently.",
              facialExpressionTip: "Encouraging, cooperative expression.",
              motionDescription:
                "Mimic writing with a pen in your dominant hand across your flat non-dominant palm.",
              keyRule:
                "Write clearly and concisely: 'No almond milk today. Oat or soy?'",
              imageSrc: helpImage,
            },
          },
          {
            id: "l4-t-2",
            type: "identify",
            title: "Customer Phone Gesture",
            description: "Recognize when the customer prepared notes",
            xpReward: 5,
            content: {
              customerContext:
                "A customer pulls out their smartphone, taps the screen, and turns the screen toward you across the counter.",
              customerPrompt: "Customer holds up phone showing a typed Notes app screen.",
              customerMoodInitial: "WAITING",
              question: "What is the customer asking you to do?",
              options: [
                {
                  id: "ph-1",
                  text: "Read their typed order from their phone screen and confirm with a nod.",
                  isCorrect: true,
                  feedback:
                    "Correct! Many deaf individuals prepare phone notes in advance for speed and convenience.",
                },
                {
                  id: "ph-2",
                  text: "Take their phone and inspect their personal photos.",
                  isCorrect: false,
                  feedback: "They are simply displaying their order details.",
                },
                {
                  id: "ph-3",
                  text: "Refuse to read it because store policy only allows verbal orders.",
                  isCorrect: false,
                  feedback: "Reading typed notes is standard accessible service.",
                },
              ],
              explanation:
                "Welcoming typed phone notes shows great empathy and speeds up service times.",
            },
          },
        ],
      },
      {
        id: "l4-mistakes",
        levelId: "level-4",
        title: "Correcting a Mistake Gracefully",
        subtitle: "Acknowledge, apologize & resolve",
        description:
          "When a cup is made wrong or a sign was misread, fix it without defensiveness.",
        xp: 20,
        iconName: "CheckCircle",
        exercises: [
          {
            id: "l4-m-1",
            type: "choose-response",
            title: "Scenario: Wrong Milk Poured",
            description: "Handle drink remake politely",
            xpReward: 5,
            content: {
              customerContext:
                "The barista poured whole milk instead of oat milk. The customer points to the cup, shakes head 'NO', and signs 'O-A-T'.",
              customerDialogue:
                "'Excuse me, this looks like dairy milk. I ordered oat milk.'",
              customerSignSummary: "Drink correction needed",
              customerMoodInitial: "WAITING",
              question: "How should you respond at the counter?",
              options: [
                {
                  id: "fix-1",
                  text: "Place hand over chest in 'SORRY' circle, take the cup back, and sign 'REMAKE OAT NOW' with a smile.",
                  isAppropriate: true,
                  customerReaction: "SUCCESS",
                  serviceOutcome:
                    "Excellent recovery! You validate their concern immediately, apologize visually, and fix the order with priority.",
                },
                {
                  id: "fix-2",
                  text: "Argue that they didn't sign oat milk clearly enough.",
                  isAppropriate: false,
                  customerReaction: "CONFUSED",
                  serviceOutcome:
                    "Never blame a customer for communication gaps. It destroys trust.",
                },
              ],
              whyThisMatters:
                "A swift, gracious apology turns an error into an exceptional customer service memory.",
            },
          },
        ],
      },
    ],
  },

  // ==========================================
  // LEVEL 5: REAL CUSTOMER INTERACTIONS
  // ==========================================
  {
    id: "level-5",
    number: 5,
    title: "Real Interactions",
    subtitle: "Full Simulation Challenges",
    theme: "Simulated Roleplay Under Pressure",
    description:
      "Test your complete skills across multi-turn workplace scenarios with simulated deaf customers. Evaluates signs, manners, and facial expressions.",
    badge: "🏆",
    accentColor: "#EC4899", // Rose / Pink
    lessons: [
      {
        id: "l5-coffee-rush",
        levelId: "level-5",
        title: "The Morning Coffee Shop Rush",
        subtitle: "High speed, high hospitality",
        description:
          "Serve customer Jordan during the busy 8:30 AM cafe rush without breaking a sweat.",
        xp: 25,
        iconName: "Zap",
        exercises: [
          {
            id: "l5-cr-1",
            type: "scenario",
            title: "Rush Hour Counter Simulation",
            description: "Multi-turn roleplay with simulated customer Jordan",
            xpReward: 15,
            content: {
              setting: "Metropolitan Espresso Bar (Peak Morning Rush)",
              customerPersona: {
                name: "Jordan",
                avatar: "🧔",
                note: "Deaf architect on their way to a project kickoff",
              },
              customerGoal: "Get a large iced oat latte and a blueberry scone quickly",
              turns: [
                {
                  customerSpeech: "Jordan arrives at your register counter and looks at you.",
                  customerSign: "Customer stands attentive at register",
                  workerExpectedSign: "HELLO",
                  workerOptions: [
                    {
                      id: "j-1",
                      label: "Greet with 'HELLO' + warm eye contact and smile",
                      isCorrect: true,
                      customerReaction: "HAPPY",
                      feedback: "Jordan smiles back and signs 'HELLO!'. Great opening!",
                    },
                    {
                      id: "j-2",
                      label: "Rush Jordan by waving payment scanner aggressively",
                      isCorrect: false,
                      customerReaction: "CONFUSED",
                      feedback: "Jordan feels rushed and unsettled.",
                    },
                  ],
                },
                {
                  customerSpeech: "Jordan signs: [LARGE] + [ICED] + [COFFEE] + [O-A-T MILK]",
                  customerSign: "Large Iced Coffee with Oat Milk",
                  workerExpectedSign: "YES",
                  workerOptions: [
                    {
                      id: "j-3",
                      label: "Nod 'YES' firmly, point to the pastry case: 'PASTRY WANT?'",
                      isCorrect: true,
                      customerReaction: "HAPPY",
                      feedback: "Jordan nods happily: 'YES, SCONE PLEASE!'",
                    },
                    {
                      id: "j-4",
                      label: "Pour small hot tea without verifying size",
                      isCorrect: false,
                      customerReaction: "CONFUSED",
                      feedback: "Jordan signed LARGE and ICED.",
                    },
                  ],
                },
                {
                  customerSpeech: "Jordan signs: 'THANK YOU!' and taps payment card.",
                  customerSign: "Gratitude & payment",
                  workerExpectedSign: "THANK YOU",
                  workerOptions: [
                    {
                      id: "j-5",
                      label: "Sign 'THANK YOU' with a warm nod and point to pickup counter",
                      isCorrect: true,
                      customerReaction: "SUCCESS",
                      feedback: "Jordan beams with gratitude: 'You made my morning! Have a great day.'",
                    },
                    {
                      id: "j-6",
                      label: "Turn back to coffee grinder without closing interaction",
                      isCorrect: false,
                      customerReaction: "WAITING",
                      feedback: "Jordan waits unsure where to pick up their drink.",
                    },
                  ],
                },
              ],
              successSummary:
                "Incredible job! You handled a fast-paced morning order with complete accuracy, warmth, and respectful Deaf culture etiquette.",
            },
          },
        ],
      },
      {
        id: "l5-retail",
        levelId: "level-5",
        title: "The Retail Customer Desk",
        subtitle: "Returns, receipts & bag options",
        description:
          "Help customer Priya return an item and locate a replacement size on the retail floor.",
        xp: 25,
        iconName: "ShoppingBag",
        exercises: [
          {
            id: "l5-rt-1",
            type: "scenario",
            title: "Retail Customer Service Simulation",
            description: "Multi-turn interaction with simulated customer Priya",
            xpReward: 15,
            content: {
              setting: "Apparel Store Customer Service Desk",
              customerPersona: {
                name: "Priya",
                avatar: "👩‍🦰",
                note: "Deaf university student exchanging a jacket size",
              },
              customerGoal: "Exchange medium jacket for large size",
              turns: [
                {
                  customerSpeech: "Priya places a garment bag on the counter with a receipt.",
                  customerSign: "Priya holds up receipt and signs 'CHANGE SIZE'",
                  workerExpectedSign: "HELLO",
                  workerOptions: [
                    {
                      id: "p-1",
                      label: "Sign 'HELLO', take the receipt gently, and nod 'YES'",
                      isCorrect: true,
                      customerReaction: "HAPPY",
                      feedback: "Priya appreciates your prompt attentiveness.",
                    },
                    {
                      id: "p-2",
                      label: "Ignore the receipt and shout 'Did you buy that here?'",
                      isCorrect: false,
                      customerReaction: "CONFUSED",
                      feedback: "Priya points to the printed store logo on the receipt.",
                    },
                  ],
                },
                {
                  customerSpeech: "Priya signs: 'WANT LARGE. WHERE?'",
                  customerSign: "Asking for location of large jackets",
                  workerExpectedSign: "HELP",
                  workerOptions: [
                    {
                      id: "p-3",
                      label: "Sign 'HELP', step around the counter, and guide Priya to the outerwear rack",
                      isCorrect: true,
                      customerReaction: "SUCCESS",
                      feedback: "Priya finds the large size immediately: 'THANK YOU SO MUCH!'",
                    },
                    {
                      id: "p-4",
                      label: "Point vaguely toward the entire back wall of the store",
                      isCorrect: false,
                      customerReaction: "CONFUSED",
                      feedback: "Too ambiguous in a large department store.",
                    },
                  ],
                },
              ],
              successSummary:
                "Priya successfully exchanged her jacket and felt valued and supported by an inclusive retail team!",
            },
          },
        ],
      },
      {
        id: "l5-final-challenge",
        levelId: "level-5",
        title: "Master Customer-Service Challenge",
        subtitle: "The ultimate certification test",
        description:
          "Demonstrate total mastery of greetings, order taking, clarification, and polite departure.",
        xp: 35,
        iconName: "Award",
        exercises: [
          {
            id: "l5-fc-1",
            type: "choose-response",
            title: "Core Service Ethos Assessment",
            description: "What defines world-class customer service for deaf patrons?",
            xpReward: 10,
            content: {
              customerContext:
                "A trainee colleague asks you why your cafe gets rave reviews from the local Deaf community.",
              customerDialogue:
                "'What is the most important thing to remember when serving deaf customers?'",
              customerSignSummary: "Best practice summary",
              customerMoodInitial: "WAITING",
              question: "Which statement best summarizes our customer-service goal?",
              options: [
                {
                  id: "eth-1",
                  text: "Treat them with natural dignity, keep eye contact, use clear visual cues, smile warmly, and communicate with patience and respect.",
                  isAppropriate: true,
                  customerReaction: "SUCCESS",
                  serviceOutcome:
                    "Gold standard! You understand that true customer service is about connection, respect, and accessible hospitality.",
                },
                {
                  id: "eth-2",
                  text: "Only speak louder and hope they can read lips while you look at your phone.",
                  isAppropriate: false,
                  customerReaction: "CONFUSED",
                  serviceOutcome: "Fails basic accessibility standards.",
                },
              ],
              whyThisMatters:
                "Confidence serving deaf customers transforms daily routine visits into joyful human experiences.",
            },
          },
        ],
      },
    ],
  },
];
