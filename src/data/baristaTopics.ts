import { BaristaTopic } from "../types/barista";

export const BARISTA_TOPICS: BaristaTopic[] = [
  // ==========================================
  // TOPIC 1: Greetings & Customer Service
  // ==========================================
  {
    id: "greetings-customer-service",
    number: 1,
    title: "Greetings & Customer Service",
    subtitle: "Welcoming & Courteous Counter Connections",
    badge: "👋",
    accentColor: "#F59E0B",
    description:
      "Essential opening greetings, polite manners, and courteous closing phrases for café guests.",
    phrases: [
      "Hello",
      "Good morning",
      "Welcome",
      "How can I help you?",
      "Please",
      "Thank you",
      "You're welcome",
      "Goodbye",
      "Have a nice day"
    ],
    lessons: [
      {
        id: "b1-hello",
        topicId: "greetings-customer-service",
        order: 1,
        title: "Hello",
        subtitle: "Friendly Counter Opening",
        xp: 20,
        sign: {
          id: "hello",
          name: "Hello",
          meaning: "Standard friendly greeting to open service",
          description:
            "Touch fingertips of your dominant flat hand to your temple, then extend outward smoothly in a gentle salute.",
          motionTip: "Smooth outward motion away from your forehead with relaxed fingers.",
          customerContext: "A guest steps up to the counter register.",
          etiquetteTip: "Maintain direct eye contact with a warm smile before and during the greeting.",
          facialExpressionTip: "Warm smile and slightly raised eyebrows to project approachable warmth.",
          handShapeTips: [
            "Open flat 5-hand with fingers straight together",
            "Fingertips lightly touch temple/forehead edge",
            "Sweep hand gently forward toward customer"
          ],
          videoSrc: "/videos/asl_hello_demo.mp4",
          emoji: "👋"
        },
        questions: [
          {
            id: "b1-q1",
            question: "How do you sign 'Hello' to a customer at the café register?",
            scenarioContext: "A customer approaches your register counter.",
            options: [
              {
                id: "b1-q1-o1",
                text: "Touch temple with flat hand and extend forward in a gentle salute with a warm smile",
                isCorrect: true,
                feedback: "Spot on! The open salute from the temple is the universal ASL greeting."
              },
              {
                id: "b1-q1-o2",
                text: "Wave both fists aggressively across your chest",
                isCorrect: false,
                feedback: "Aggressive fist movements are not used for polite greetings."
              },
              {
                id: "b1-q1-o3",
                text: "Tap your index finger against your chin twice quickly",
                isCorrect: false,
                feedback: "Tapping the chin is part of other signs like 'candy' or colors, not 'Hello'."
              }
            ],
            explanation: "In ASL, 'HELLO' starts at the temple and extends smoothly forward toward the viewer."
          },
          {
            id: "b1-q2",
            question: "Why is facial expression so important when signing 'Hello'?",
            scenarioContext: "Greeting a Deaf patron on a busy morning.",
            options: [
              {
                id: "b1-q2-o1",
                text: "A friendly smile and open eye contact establishes welcoming customer service warmth",
                isCorrect: true,
                feedback: "Exactly! Facial expression in ASL conveys tone of voice and emotional warmth."
              },
              {
                id: "b1-q2-o2",
                text: "Facial expressions are optional and only hand shapes matter",
                isCorrect: false,
                feedback: "In ASL, non-manual markers (facial expressions) are critical for grammatical tone."
              },
              {
                id: "b1-q2-o3",
                text: "You should frown to indicate serious service efficiency",
                isCorrect: false,
                feedback: "A frown would signal disapproval or confusion, not hospitality."
              }
            ],
            explanation: "Facial warmth replaces tone of voice in ASL customer interactions."
          }
        ]
      },
      {
        id: "b1-good-morning",
        topicId: "greetings-customer-service",
        order: 2,
        title: "Good morning",
        subtitle: "Early Shift Welcome",
        xp: 20,
        sign: {
          id: "good_morning",
          name: "Good morning",
          meaning: "Greeting during morning café service",
          description:
            "First sign 'GOOD' (fingertips from chin to open non-dominant palm), then sign 'MORNING' (non-dominant arm horizontal, dominant arm rising like the sun).",
          motionTip: "Compound sign: 'Good' into dominant forearm rising from behind horizontal arm.",
          customerContext: "Serving early morning coffee commuters.",
          etiquetteTip: "Pairs well with nodding gently and acknowledging the morning rush with calm presence.",
          facialExpressionTip: "Bright, energetic morning expression.",
          handShapeTips: [
            "Part 1: Flat hand touches chin then lands softly in open palm ('GOOD')",
            "Part 2: Non-dominant arm rests flat representing horizon",
            "Part 3: Dominant hand rises upward under the crook of arm ('MORNING')"
          ],
          emoji: "🌅"
        },
        questions: [
          {
            id: "b1-gm-q1",
            question: "What two signs combine to form 'Good morning'?",
            options: [
              {
                id: "b1-gm-q1-1",
                text: "'GOOD' (chin to palm) followed by 'MORNING' (arm rising like the sun)",
                isCorrect: true,
                feedback: "Correct! ASL compounds 'GOOD' with 'MORNING' for this classic greeting."
              },
              {
                id: "b1-gm-q1-2",
                text: "'SUN' combined with 'COFFEE'",
                isCorrect: false,
                feedback: "While coffee is morning-related, the sign specifically uses 'GOOD' + 'MORNING'."
              },
              {
                id: "b1-gm-q1-3",
                text: "'HELLO' combined with 'DAY'",
                isCorrect: false,
                feedback: "'GOOD MORNING' specifically starts with 'GOOD'."
              }
            ],
            explanation: "'GOOD MORNING' is a compound sign where the sun rises above the horizon."
          }
        ]
      },
      {
        id: "b1-welcome",
        topicId: "greetings-customer-service",
        order: 3,
        title: "Welcome",
        subtitle: "Inviting Patrons In",
        xp: 20,
        sign: {
          id: "welcome",
          name: "Welcome",
          meaning: "Inviting the guest in or acknowledging their arrival",
          description:
            "Hold dominant hand out to the side with palm facing upward and slightly curved, then sweep it smoothly inward toward your torso.",
          motionTip: "Warm, open scooping motion toward yourself welcoming them in.",
          customerContext: "A guest enters the shop or steps up to the ordering zone.",
          etiquetteTip: "Make the sweep gentle, not rushed, showing they have your complete attention.",
          facialExpressionTip: "Gracious, receptive smile.",
          handShapeTips: [
            "Open flat hand tilted slightly upward",
            "Start slightly off to the side at chest height",
            "Draw hand inward toward center of body"
          ],
          emoji: "🤗"
        },
        questions: [
          {
            id: "b1-w-q1",
            question: "What motion represents 'Welcome' in ASL?",
            options: [
              {
                id: "b1-w-q1-1",
                text: "Open palm facing upward sweeping smoothly inward toward your torso",
                isCorrect: true,
                feedback: "Great job! It literally welcomes the person into the space."
              },
              {
                id: "b1-w-q1-2",
                text: "Pushing both flat hands outward toward the door",
                isCorrect: false,
                feedback: "Pushing outward indicates stopping or pushing away."
              },
              {
                id: "b1-w-q1-3",
                text: "Pointing directly at the cash register",
                isCorrect: false,
                feedback: "Pointing is referential, not the welcoming gesture."
              }
            ],
            explanation: "'WELCOME' sweeps inward toward yourself in an open, hospitable gesture."
          }
        ]
      },
      {
        id: "b1-how-can-i-help",
        topicId: "greetings-customer-service",
        order: 4,
        title: "How can I help you?",
        subtitle: "Ready to Assist",
        xp: 20,
        sign: {
          id: "how_can_i_help",
          name: "How can I help you?",
          meaning: "Offering customer service readiness",
          description:
            "Sign 'HELP' (dominant thumbs-up fist lifted on open non-dominant palm) moving slightly toward customer, with questioning raised eyebrows.",
          motionTip: "Lifting 'HELP' sign directed forward toward the customer.",
          customerContext: "Opening the order transaction at the register.",
          etiquetteTip: "Directing the sign forward transforms 'HELP' into 'I HELP YOU'.",
          facialExpressionTip: "Curious, helpful expression with eyebrows slightly raised.",
          handShapeTips: [
            "Non-dominant palm flat, facing upward",
            "Dominant hand makes an 'A' thumbs-up fist",
            "Lift together and push slightly toward patron"
          ],
          videoSrc: "/videos/asl_help_demo.mp4",
          emoji: "🤝"
        },
        questions: [
          {
            id: "b1-h-q1",
            question: "How do you direct the sign for 'HELP' to mean 'How can I help YOU'?",
            options: [
              {
                id: "b1-h-q1-1",
                text: "Form 'HELP' and angle/move it toward the customer with an attentive facial expression",
                isCorrect: true,
                feedback: "Excellent! In directional ASL verbs, moving toward the customer indicates helping them."
              },
              {
                id: "b1-h-q1-2",
                text: "Move 'HELP' toward your own chest",
                isCorrect: false,
                feedback: "Moving 'HELP' toward your own chest means 'Help me'."
              },
              {
                id: "b1-h-q1-3",
                text: "Shake your fist side to side",
                isCorrect: false,
                feedback: "Shaking the fist does not convey assistance."
              }
            ],
            explanation: "ASL is spatial: directional verbs like HELP move from the giver to the receiver."
          }
        ]
      },
      {
        id: "b1-please",
        topicId: "greetings-customer-service",
        order: 5,
        title: "Please",
        subtitle: "Polite Request Marker",
        xp: 20,
        sign: {
          id: "please",
          name: "Please",
          meaning: "Courteous request modifier",
          description:
            "Rub the palm of your flat dominant hand in a gentle clockwise circle over your chest.",
          motionTip: "Flat open hand rubbing chest in a circular motion.",
          customerContext: "Asking for a receipt preference or waiting for a moment.",
          etiquetteTip: "Always use when requesting a customer to hold on or tap their card.",
          facialExpressionTip: "Humble, polite facial demeanor.",
          handShapeTips: [
            "Open flat hand with fingers together",
            "Place over center of chest",
            "Circle clockwise 2-3 times gently"
          ],
          emoji: "🙏"
        },
        questions: [
          {
            id: "b1-p-q1",
            question: "How do you sign 'Please' in ASL?",
            options: [
              {
                id: "b1-p-q1-1",
                text: "Rub flat hand in a gentle circular motion over the center of your chest",
                isCorrect: true,
                feedback: "Perfect! 'PLEASE' comes from the heart in a circular chest motion."
              },
              {
                id: "b1-p-q1-2",
                text: "Cross both arms across your body",
                isCorrect: false,
                feedback: "Crossing arms over chest is the sign for 'LOVE'."
              },
              {
                id: "b1-p-q1-3",
                text: "Tap your chin twice",
                isCorrect: false,
                feedback: "Tapping the chin is 'THANK YOU', not 'PLEASE'."
              }
            ],
            explanation: "'PLEASE' is formed by rubbing a flat palm in a clockwise circle on the chest."
          }
        ]
      },
      {
        id: "b1-thank-you",
        topicId: "greetings-customer-service",
        order: 6,
        title: "Thank you",
        subtitle: "Gratitude & Appreciation",
        xp: 20,
        sign: {
          id: "thank_you",
          name: "Thank you",
          meaning: "Expressing gratitude to customer",
          description:
            "Touch fingertips of flat dominant hand to chin or lips, then move hand forward and slightly down toward customer.",
          motionTip: "Gentle outward sweep from chin toward the customer with a smile.",
          customerContext: "Upon receiving payment or handing over a drink.",
          etiquetteTip: "Never rush this sign; an honest, steady 'Thank you' leaves a lasting warm impression.",
          facialExpressionTip: "Warm smile and slight polite head nod.",
          handShapeTips: [
            "Fingertips together, hand flat",
            "Touch lower lip/chin",
            "Extend outward toward customer"
          ],
          videoSrc: "/videos/asl_thank_you_demo.mp4",
          emoji: "🙏"
        },
        questions: [
          {
            id: "b1-ty-q1",
            question: "Where does the sign for 'Thank you' originate?",
            options: [
              {
                id: "b1-ty-q1-1",
                text: "Fingertips touching the chin/lips, sweeping forward toward the other person",
                isCorrect: true,
                feedback: "Correct! 'THANK YOU' flows straight from the lips toward the patron."
              },
              {
                id: "b1-ty-q1-2",
                text: "From the forehead down to the stomach",
                isCorrect: false,
                feedback: "Forehead signs include 'KNOW' or 'FATHER', not 'THANK YOU'."
              },
              {
                id: "b1-ty-q1-3",
                text: "From the ear to the shoulder",
                isCorrect: false,
                feedback: "Ear touches relate to hearing/sound, not gratitude."
              }
            ],
            explanation: "'THANK YOU' starts at the chin and extends forward with appreciation."
          }
        ]
      },
      {
        id: "b1-youre-welcome",
        topicId: "greetings-customer-service",
        order: 7,
        title: "You're welcome",
        subtitle: "Courteous Reciprocation",
        xp: 20,
        sign: {
          id: "youre_welcome",
          name: "You're welcome",
          meaning: "Acknowledging customer thanks",
          description:
            "Either repeat a small polite nod with a welcoming inward sweep of the hand, or sign 'FINE' / 'WELCOME'.",
          motionTip: "Warm nod with an inward receptive gesture or thumbs-up acknowledging 'FINE'.",
          customerContext: "When the customer signs 'THANK YOU' after getting their drink.",
          etiquetteTip: "A sincere nod and gentle smile is universally understood and appreciated in Deaf culture.",
          facialExpressionTip: "Reassuring, content smile.",
          handShapeTips: [
            "Open palm sweeping gently inward, or",
            "Dominant 5-hand thumb touching chest with friendly nod ('FINE')"
          ],
          emoji: "✨"
        },
        questions: [
          {
            id: "b1-yw-q1",
            question: "How do Deaf customers commonly reciprocate 'You're welcome' in informal settings?",
            options: [
              {
                id: "b1-yw-q1-1",
                text: "With a sincere nod, smile, and a gentle welcoming hand sweep or 'FINE' sign",
                isCorrect: true,
                feedback: "Spot on! In everyday service, a pleasant nod with 'WELCOME' or 'FINE' is standard."
              },
              {
                id: "b1-yw-q1-2",
                text: "By immediately turning away without eye contact",
                isCorrect: false,
                feedback: "Turning away abruptly is considered dismissive."
              },
              {
                id: "b1-yw-q1-3",
                text: "By clapping loudly twice",
                isCorrect: false,
                feedback: "Clapping is applause, not 'You're welcome'."
              }
            ],
            explanation: "In fast-paced counter service, a respectful nod combined with 'WELCOME' is standard."
          }
        ]
      },
      {
        id: "b1-goodbye-have-a-nice-day",
        topicId: "greetings-customer-service",
        order: 8,
        title: "Goodbye & Have a nice day",
        subtitle: "Parting Well-Wishes",
        xp: 20,
        sign: {
          id: "goodbye_nice_day",
          name: "Goodbye / Have a nice day",
          meaning: "Warm send-off as customer leaves counter",
          description:
            "Sign 'GOOD' then 'DAY' (arm vertical settling onto horizontal elbow), followed by a relaxed wave goodbye.",
          motionTip: "Smooth 'GOOD' into 'DAY' arc, finished with a gentle open-palm wave.",
          customerContext: "Guest picking up their tray or leaving the pickup counter.",
          etiquetteTip: "Send them off with positive visual warmth.",
          facialExpressionTip: "Parting smile with eye contact.",
          handShapeTips: [
            "Sign 'GOOD' (chin to palm)",
            "Sign 'DAY' (index arm dropping across opposite arm like the sun setting)",
            "Wave comfortably at shoulder height"
          ],
          emoji: "👋"
        },
        questions: [
          {
            id: "b1-g-q1",
            question: "How do you conclude a positive customer interaction in ASL?",
            options: [
              {
                id: "b1-g-q1-1",
                text: "Sign 'GOOD DAY' or a friendly wave with eye contact and a warm smile",
                isCorrect: true,
                feedback: "Yes! Completing the interaction with visual well-wishes builds community trust."
              },
              {
                id: "b1-g-q1-2",
                text: "Look down at your shoes immediately",
                isCorrect: false,
                feedback: "Looking away too early truncates the visual connection."
              }
            ],
            explanation: "Sign 'GOOD DAY' or wave pleasantly as the customer departs."
          }
        ]
      }
    ]
  },

  // ==========================================
  // TOPIC 2: Taking an Order
  // ==========================================
  {
    id: "taking-an-order",
    number: 2,
    title: "Taking an Order",
    subtitle: "Counter Questions & Ordering Flow",
    badge: "📝",
    accentColor: "#D97706",
    description:
      "Master the key questions needed to guide the customer through their drink selection smoothly.",
    phrases: [
      "What would you like?",
      "What can I get for you?",
      "Order",
      "Menu",
      "Anything else?",
      "Is that all?",
      "For here",
      "Takeaway",
      "Your order"
    ],
    lessons: [
      {
        id: "b2-what-would-you-like",
        topicId: "taking-an-order",
        order: 1,
        title: "What would you like?",
        subtitle: "Inquiring Customer Choice",
        xp: 20,
        sign: {
          id: "what_would_you_like",
          name: "What would you like?",
          meaning: "Asking what the customer wishes to order",
          description:
            "Hold both hands out in front with palms up and fingers clawed/curved ('WANT'), pull hands toward yourself slightly, then shake palms open for 'WHAT?' with furrowed eyebrows.",
          motionTip: "Clawed hands pulling inward for 'WANT' + open palms swaying for 'WHAT?'.",
          customerContext: "When the customer steps up to place their coffee order.",
          etiquetteTip: "In ASL WH-questions (what, who, where), furrow your eyebrows slightly.",
          facialExpressionTip: "Furrowed eyebrows (indicating a 'WH-' question) with an open, friendly mouth posture.",
          handShapeTips: [
            "Start with both 5-hands curved like claws palms facing up",
            "Pull slightly toward yourself ('WANT')",
            "Flip or hold open hands shaking side to side ('WHAT?')"
          ],
          emoji: "❓"
        },
        questions: [
          {
            id: "b2-q1",
            question: "How do you sign 'What would you like?' at the coffee counter?",
            scenarioContext: "Customer steps up to order.",
            options: [
              {
                id: "b2-q1-1",
                text: "Combine 'YOU WANT WHAT?' with open palms and inquisitive furrowed eyebrows",
                isCorrect: true,
                feedback: "Correct! In ASL grammar, 'YOU WANT WHAT?' is the direct, natural equivalent."
              },
              {
                id: "b2-q1-2",
                text: "Point at your own watch repeatedly",
                isCorrect: false,
                feedback: "Pointing at your watch asks about time or implies being late."
              },
              {
                id: "b2-q1-3",
                text: "Wave a cup in the air",
                isCorrect: false,
                feedback: "Waving a cup does not convey the grammatical question."
              }
            ],
            explanation: "ASL structure uses topic-comment: YOU WANT WHAT? with furrowed question eyebrows."
          },
          {
            id: "b2-q2",
            question: "What should your eyebrows do when asking 'What would you like?'",
            options: [
              {
                id: "b2-q2-1",
                text: "Furrowed slightly downward (WH-question grammar)",
                isCorrect: true,
                feedback: "Spot on! WH-questions (what, where, who, how) require furrowed eyebrows in ASL."
              },
              {
                id: "b2-q2-2",
                text: "Raised high in surprise",
                isCorrect: false,
                feedback: "Raised eyebrows are used for Yes/No questions, not WH-questions."
              },
              {
                id: "b2-q2-3",
                text: "Completely motionless with closed eyes",
                isCorrect: false,
                feedback: "Eyes must remain open and attentive."
              }
            ],
            explanation: "In ASL grammar: WH-questions (what, why, how) = furrowed eyebrows; Yes/No questions = raised eyebrows."
          }
        ]
      },
      {
        id: "b2-what-can-i-get",
        topicId: "taking-an-order",
        order: 2,
        title: "What can I get for you?",
        subtitle: "Alternate Service Inquiry",
        xp: 20,
        sign: {
          id: "what_can_i_get",
          name: "What can I get for you?",
          meaning: "Offering to retrieve an order item",
          description:
            "Sign 'CAN I' (both hands in 'S' fists dropping slightly) then 'GET' (hands grasping inward) + 'WHAT?'.",
          motionTip: "Grasping motion toward self followed by open questioning hands.",
          customerContext: "Alternate phrase for opening the customer's order.",
          etiquetteTip: "Keep the motion relaxed and conversational.",
          facialExpressionTip: "Attentive, listening posture with head slightly tilted.",
          handShapeTips: [
            "Fists bob downward slightly ('CAN')",
            "Open hands reach out and close into fists ('GET')",
            "Palms up side-to-side ('WHAT?')"
          ],
          emoji: "☕"
        },
        questions: [
          {
            id: "b2-cg-q1",
            question: "When asking 'What can I get for you?', how is 'GET' signed?",
            options: [
              {
                id: "b2-cg-q1-1",
                text: "Both hands reach out open and close into fists over each other as if grasping",
                isCorrect: true,
                feedback: "Correct! The grasping hand shape represents retrieving or getting an item."
              },
              {
                id: "b2-cg-q1-2",
                text: "Flicking index fingers outward",
                isCorrect: false,
                feedback: "Flicking index fingers outward is 'UNDERSTAND' or 'HATE' depending on location."
              }
            ],
            explanation: "'GET' uses two hands reaching forward and closing as if pulling an item closer."
          }
        ]
      },
      {
        id: "b2-order-menu",
        topicId: "taking-an-order",
        order: 3,
        title: "Order & Menu",
        subtitle: "Key Counter Concepts",
        xp: 20,
        sign: {
          id: "order_menu",
          name: "Order & Menu",
          meaning: "Referencing the order or handing over the printed/board menu",
          description:
            "For 'ORDER': touch index finger to lips, then point forward firmly. For 'MENU': dominant hand runs down flat non-dominant palm like reading a list.",
          motionTip: "Order: Index from lips pointing forward. Menu: Flat hand tracing down open palm.",
          customerContext: "Pointing to the counter menu or checking order details.",
          etiquetteTip: "Have a printed or laminated counter menu within arm's reach to point at together.",
          facialExpressionTip: "Helpful and informative gaze.",
          handShapeTips: [
            "'ORDER': Index finger touches lips, moves forward",
            "'MENU': Non-dominant palm flat like a sheet of paper",
            "Dominant fingertips glide downward indicating reading items"
          ],
          emoji: "📋"
        },
        questions: [
          {
            id: "b2-om-q1",
            question: "How do you sign 'Menu' in a café setting?",
            options: [
              {
                id: "b2-om-q1-1",
                text: "Dominant fingers trace down a flat non-dominant palm like scanning a printed list",
                isCorrect: true,
                feedback: "Spot on! One hand acts as the paper menu and the other reads down it."
              },
              {
                id: "b2-om-q1-2",
                text: "Spinning both index fingers in circles overhead",
                isCorrect: false,
                feedback: "Spinning fingers overhead does not represent a menu."
              }
            ],
            explanation: "The sign for 'MENU' visualizes reading down a printed card or list."
          }
        ]
      },
      {
        id: "b2-anything-else",
        topicId: "taking-an-order",
        order: 4,
        title: "Anything else?",
        subtitle: "Checking for Add-ons",
        xp: 20,
        sign: {
          id: "anything_else",
          name: "Anything else?",
          meaning: "Inquiring if the guest wants additional items",
          description:
            "Sign 'OTHER' (thumbs-up 'A' hand rotating wrist outward) then 'MORE' (flattened O-hands tapping fingertips together) with questioning raised eyebrows.",
          motionTip: "Thumb rotates outward ('OTHER') then fingertips tap together ('MORE?').",
          customerContext: "After the customer specifies their main drink.",
          etiquetteTip: "Since this is a Yes/No question ('Anything else?'), RAISE your eyebrows!",
          facialExpressionTip: "Raised eyebrows and head tilted slightly forward.",
          handShapeTips: [
            "Dominant hand makes 'A' fist with thumb out",
            "Rotate wrist outward 180 degrees ('OTHER / ELSE')",
            "Bring fingertips together to tap ('MORE?')"
          ],
          emoji: "➕"
        },
        questions: [
          {
            id: "b2-ae-q1",
            question: "How do you sign 'Anything else?' in ASL?",
            options: [
              {
                id: "b2-ae-q1-1",
                text: "Sign 'OTHER / ELSE' (thumb flip) + 'MORE?' with raised eyebrows",
                isCorrect: true,
                feedback: "Yes! 'OTHER / MORE?' with raised eyebrows directly asks 'Anything else?'."
              },
              {
                id: "b2-ae-q1-2",
                text: "Shake head vigorously side to side",
                isCorrect: false,
                feedback: "Shaking head means 'No', not asking if they want anything else."
              },
              {
                id: "b2-ae-q1-3",
                text: "Cover your mouth with your hand",
                isCorrect: false,
                feedback: "Covering your mouth blocks visual communication."
              }
            ],
            explanation: "'OTHER / MORE?' with raised questioning eyebrows indicates 'Anything else?'."
          }
        ]
      },
      {
        id: "b2-is-that-all",
        topicId: "taking-an-order",
        order: 5,
        title: "Is that all?",
        subtitle: "Finalizing Order Items",
        xp: 20,
        sign: {
          id: "is_that_all",
          name: "Is that all?",
          meaning: "Confirming completion of the order",
          description:
            "Both open hands sweep inward, palms facing body, turning into 'FINISHED' (both open hands flick outward, palms facing down) with raised eyebrows.",
          motionTip: "Both hands flick outward from wrists ('FINISH / ALL DONE?').",
          customerContext: "Before moving to payment.",
          etiquetteTip: "The 'FINISH' sign is one of the most versatile and useful signs in ASL customer service.",
          facialExpressionTip: "Raised eyebrows with slight head tilt.",
          handShapeTips: [
            "Both 5-hands held at chest height",
            "Palms facing you, flick quickly outward facing down/forward",
            "Mouth shape softly articulates 'fish' or 'all done'"
          ],
          videoSrc: "/videos/asl_yes_demo.mp4",
          emoji: "✅"
        },
        questions: [
          {
            id: "b2-ita-q1",
            question: "What core ASL sign is used to ask 'Is that all / Are you finished?'",
            options: [
              {
                id: "b2-ita-q1-1",
                text: "'FINISH' (both open hands flicking outward from chest level) with raised eyebrows",
                isCorrect: true,
                feedback: "Exactly! 'FINISH?' is the quintessential sign for 'Is that all?'."
              },
              {
                id: "b2-ita-q1-2",
                text: "Punching the air forward twice",
                isCorrect: false,
                feedback: "Punching is not used for finalizing an order."
              }
            ],
            explanation: "'FINISH?' with raised questioning eyebrows directly conveys 'Is that all?'."
          }
        ]
      },
      {
        id: "b2-for-here-takeaway",
        topicId: "taking-an-order",
        order: 6,
        title: "For here or Takeaway?",
        subtitle: "Cup & Seating Selection",
        xp: 20,
        sign: {
          id: "for_here_takeaway",
          name: "For here or Takeaway?",
          meaning: "Asking whether the drink is for dine-in or to-go",
          description:
            "Point both index fingers down in front of you ('HERE'), pause, then take dominant hand and move it outward away from counter ('GO / TAKEAWAY').",
          motionTip: "Double point down ('HERE') or open hand traveling away ('GO/OUT').",
          customerContext: "Deciding between ceramic mug or to-go paper cup.",
          etiquetteTip: "You can also hold up a ceramic mug and a paper cup visually as a bilingual cue.",
          facialExpressionTip: "Shifting shoulders slightly between options A ('Here') and B ('To Go').",
          handShapeTips: [
            "'HERE': Both hands point downward with index fingers or flat palms at counter level",
            "'TAKEAWAY': Dominant hand gestures outward away from body ('TO GO')"
          ],
          emoji: "🥡"
        },
        questions: [
          {
            id: "b2-fht-q1",
            question: "How do you present the choice 'For here or Takeaway?' in ASL?",
            options: [
              {
                id: "b2-fht-q1-1",
                text: "Sign 'HERE' (point downward), shift body slightly, then sign 'TO GO' (gesture outward)",
                isCorrect: true,
                feedback: "Brilliant! Spatial contrast (shifting left and right) clearly delineates choices in ASL."
              },
              {
                id: "b2-fht-q1-2",
                text: "Wave both hands in circles above your head",
                isCorrect: false,
                feedback: "Circling above the head does not indicate destination."
              }
            ],
            explanation: "ASL contrasts alternatives by positioning 'HERE' and 'TO GO' in distinct spatial zones."
          },
          {
            id: "b2-fht-q2",
            question: "How do you sign 'Takeaway / To go'?",
            options: [
              {
                id: "b2-fht-q2-1",
                text: "Dominant hand moves outward away from the body/counter",
                isCorrect: true,
                feedback: "Correct! The outward movement clearly indicates taking the order to go."
              },
              {
                id: "b2-fht-q2-2",
                text: "Pulling both hands into your pockets",
                isCorrect: false,
                feedback: "Hands in pockets hides signing."
              }
            ],
            explanation: "'TO GO' moves forward and away from the counter."
          }
        ]
      }
    ]
  },

  // ==========================================
  // TOPIC 3: Coffee & Drinks
  // ==========================================
  {
    id: "coffee-and-drinks",
    number: 3,
    title: "Coffee & Drinks",
    subtitle: "Beverage Types & Temperatures",
    badge: "☕",
    accentColor: "#B45309",
    description:
      "Essential signs for hot and cold beverages: coffee, tea, espresso, latte, milk, and iced drinks.",
    phrases: [
      "Coffee",
      "Tea",
      "Espresso",
      "Latte",
      "Cappuccino",
      "Americano",
      "Hot chocolate",
      "Water",
      "Milk",
      "Hot",
      "Cold",
      "Iced"
    ],
    lessons: [
      {
        id: "b3-coffee",
        topicId: "coffee-and-drinks",
        order: 1,
        title: "Coffee",
        subtitle: "The Signature Sign",
        xp: 20,
        sign: {
          id: "coffee",
          name: "Coffee",
          meaning: "Standard brewed coffee",
          description:
            "Make two closed 'S' fists. Place dominant fist on top of non-dominant fist and grind in a circular motion, like turning an old-fashioned coffee mill.",
          motionTip: "Top fist rotates in a circular grinding motion over stationary bottom fist.",
          customerContext: "Core counter order sign.",
          etiquetteTip: "Keep the grinding motion smooth and distinct at chest height.",
          facialExpressionTip: "Pleasant, neutral or engaged expression.",
          handShapeTips: [
            "Both hands formed into 'S' fists",
            "Non-dominant fist stays stationary at bottom",
            "Dominant fist rotates in circles on top"
          ],
          emoji: "☕"
        },
        questions: [
          {
            id: "b3-c-q1",
            question: "How do you sign 'Coffee' in ASL?",
            scenarioContext: "Customer asks for a black coffee.",
            options: [
              {
                id: "b3-c-q1-1",
                text: "Rotate dominant fist in circles on top of stationary bottom fist (like a coffee grinder)",
                isCorrect: true,
                feedback: "Spot on! The movement mimics an old-fashioned coffee bean grinder."
              },
              {
                id: "b3-c-q1-2",
                text: "Pretend to blow bubbles through a straw",
                isCorrect: false,
                feedback: "Blowing bubbles is not the sign for coffee."
              },
              {
                id: "b3-c-q1-3",
                text: "Rub your palms together quickly",
                isCorrect: false,
                feedback: "Rubbing palms together signifies feeling cold or eager."
              }
            ],
            explanation: "'COFFEE' mimics two millstones or a manual grinder grinding coffee beans."
          },
          {
            id: "b3-c-q2",
            question: "What hand shape is used for both hands when signing 'Coffee'?",
            options: [
              {
                id: "b3-c-q2-1",
                text: "'S' fist (closed fist with thumb across fingers)",
                isCorrect: true,
                feedback: "Correct! Both hands form tight, neat 'S' fists."
              },
              {
                id: "b3-c-q2-2",
                text: "Open flat 5-hand",
                isCorrect: false,
                feedback: "Open flat hands are not used for 'Coffee'."
              }
            ],
            explanation: "Both hands form 'S' fists in the sign for 'COFFEE'."
          }
        ]
      },
      {
        id: "b3-tea",
        topicId: "coffee-and-drinks",
        order: 2,
        title: "Tea",
        subtitle: "Brewed Teas & Infusions",
        xp: 20,
        sign: {
          id: "tea",
          name: "Tea",
          meaning: "Hot or iced tea",
          description:
            "Make an 'O' cup with your non-dominant hand. Form an 'F' hand with dominant hand (thumb and index pinching like a tea bag string) and stir or dip into the cup.",
          motionTip: "Pinch tea bag string ('F' hand) and dip/stir in circular cup ('O' hand).",
          customerContext: "Customer ordering herbal, green, or black tea.",
          etiquetteTip: "Very iconic and instantly recognizable gesture.",
          facialExpressionTip: "Relaxed, attentive expression.",
          handShapeTips: [
            "Non-dominant hand forms an 'O' cup",
            "Dominant hand forms 'F' (thumb and index touching)",
            "Dipping motion into the cup rim twice"
          ],
          emoji: "🍵"
        },
        questions: [
          {
            id: "b3-t-q1",
            question: "How do you sign 'Tea' in American Sign Language?",
            options: [
              {
                id: "b3-t-q1-1",
                text: "Pinch thumb and index ('F' hand) and dip/stir into an 'O' cup hand",
                isCorrect: true,
                feedback: "Perfect! It mimics dipping a tea bag into a teacup."
              },
              {
                id: "b3-t-q1-2",
                text: "Tap the side of your nose",
                isCorrect: false,
                feedback: "Tapping the nose is not related to tea."
              }
            ],
            explanation: "'TEA' mimics steeping a tea bag into an open teacup."
          }
        ]
      },
      {
        id: "b3-hot-cold-iced",
        topicId: "coffee-and-drinks",
        order: 3,
        title: "Hot, Cold & Iced",
        subtitle: "Drink Temperatures",
        xp: 20,
        sign: {
          id: "hot_cold_iced",
          name: "Hot, Cold & Iced",
          meaning: "Specifying drink temperature",
          description:
            "'HOT': 'C' hand at mouth quickly thrown away. 'COLD': both 'S' fists shivering at shoulder height. 'ICE': fingerspell I-C-E or sign 'COLD' + 'FREEZE'.",
          motionTip: "'HOT' pulls away from mouth quickly; 'COLD' shivers at shoulders.",
          customerContext: "Clarifying whether they want an iced latte or hot latte.",
          etiquetteTip: "Always confirm temperature before pulling espresso shots.",
          facialExpressionTip: "Puckered mouth for 'HOT'; teeth chattering expression for 'COLD'.",
          handShapeTips: [
            "'HOT': Claw hand at mouth turns outward fast (like spitting hot food)",
            "'COLD': Both fists shiver side-to-side",
            "'ICED': Sign 'COLD' or finger-spell 'I-C-E'"
          ],
          emoji: "🧊"
        },
        questions: [
          {
            id: "b3-hci-q1",
            question: "How do you sign 'Hot' for a beverage?",
            options: [
              {
                id: "b3-hci-q1-1",
                text: "Place claw hand at mouth and flick it outward and downward quickly",
                isCorrect: true,
                feedback: "Yes! It reflects pulling away from something hot in your mouth."
              },
              {
                id: "b3-hci-q1-2",
                text: "Fan your face with both open hands",
                isCorrect: false,
                feedback: "Fanning face means feeling warm/sweaty, not the sign 'HOT'."
              }
            ],
            explanation: "'HOT' starts with a clawed hand at the mouth and tosses it outward."
          },
          {
            id: "b3-hci-q2",
            question: "How do you sign 'Cold'?",
            options: [
              {
                id: "b3-hci-q2-1",
                text: "Both 'S' fists held at chest/shoulder level shivering side-to-side",
                isCorrect: true,
                feedback: "Correct! The shivering fists represent cold/winter."
              },
              {
                id: "b3-hci-q2-2",
                text: "Rubbing your stomach in circles",
                isCorrect: false,
                feedback: "Rubbing stomach means 'hungry' or 'delicious'."
              }
            ],
            explanation: "'COLD' uses two shivering fists at chest level."
          }
        ]
      },
      {
        id: "b3-latte-cappuccino",
        topicId: "coffee-and-drinks",
        order: 4,
        title: "Latte & Espresso Drinks",
        subtitle: "Milk & Foam Specialities",
        xp: 20,
        sign: {
          id: "latte_espresso",
          name: "Latte, Espresso & Milk",
          meaning: "Espresso with steamed milk",
          description:
            "'MILK': squeeze dominant fist open and closed like milking a cow. 'LATTE': fingerspell L-A-T-T-E or sign 'MILK' + 'COFFEE'. 'ESPRESSO': fingerspell E-S-P or sign tiny cup + strong.",
          motionTip: "'MILK' squeezes fist at shoulder height; pair with 'COFFEE' for latte.",
          customerContext: "Handling specialty espresso bar orders.",
          etiquetteTip: "Most deaf customers fingerspell 'L-A-T-T-E' or use 'MILK + COFFEE'.",
          facialExpressionTip: "Focused and clear hand spelling.",
          handShapeTips: [
            "'MILK': Squeeze 'C' hand into 'S' fist twice at shoulder",
            "'COFFEE': Two fists grinding together",
            "Fingerspelling: Smooth, crisp letter shapes"
          ],
          emoji: "🥛"
        },
        questions: [
          {
            id: "b3-le-q1",
            question: "How do you sign 'Milk' in ASL?",
            options: [
              {
                id: "b3-le-q1-1",
                text: "Squeeze dominant fist open and closed twice at chest height (milking motion)",
                isCorrect: true,
                feedback: "Correct! 'MILK' squeezes like milking a cow."
              },
              {
                id: "b3-le-q1-2",
                text: "Slap the side of your neck",
                isCorrect: false,
                feedback: "Slapping the neck is not related to milk."
              }
            ],
            explanation: "'MILK' is signed by squeezing the fist open and closed twice."
          }
        ]
      },
      {
        id: "b3-water-hot-chocolate",
        topicId: "coffee-and-drinks",
        order: 5,
        title: "Water & Hot Chocolate",
        subtitle: "Hydration & Sweet Drinks",
        xp: 20,
        sign: {
          id: "water_chocolate",
          name: "Water & Hot Chocolate",
          meaning: "Tap water or cocoa",
          description:
            "'WATER': Tap index finger of 'W' hand to your chin twice. 'CHOCOLATE': Circle 'C' hand over back of non-dominant fist.",
          motionTip: "'W' hand taps chin twice for water. 'C' hand circles over fist for chocolate.",
          customerContext: "Providing iced water or hot chocolate for non-coffee drinkers.",
          etiquetteTip: "Offering free water cup is standard hospitality.",
          facialExpressionTip: "Pleasant smile.",
          handShapeTips: [
            "'WATER': 'W' hand (3 fingers up, thumb holding pinky), index taps chin",
            "'CHOCOLATE': 'C' hand circling over back of flat/fist hand"
          ],
          emoji: "💧"
        },
        questions: [
          {
            id: "b3-wc-q1",
            question: "How do you sign 'Water'?",
            options: [
              {
                id: "b3-wc-q1-1",
                text: "Tap the index finger of a 'W' hand against your chin twice",
                isCorrect: true,
                feedback: "Yes! 'W' at the chin is the universal sign for water."
              },
              {
                id: "b3-wc-q1-2",
                text: "Wiggle all five fingers like falling rain",
                isCorrect: false,
                feedback: "Wiggling fingers down is 'RAIN'."
              }
            ],
            explanation: "'WATER' uses a 'W' handshape tapping the chin twice."
          }
        ]
      }
    ]
  },

  // ==========================================
  // TOPIC 4: Customising a Drink
  // ==========================================
  {
    id: "customising-a-drink",
    number: 4,
    title: "Customising a Drink",
    subtitle: "Sizes, Milks, Sweeteners & Shots",
    badge: "🥛",
    accentColor: "#059669",
    description:
      "Sizes (Small, Medium, Large), dairy alternatives (Oat, Soy, Almond), sweetness, and espresso modifiers.",
    phrases: [
      "Small",
      "Medium",
      "Large",
      "Extra",
      "Less",
      "Sugar",
      "Milk",
      "Oat milk",
      "Soy milk",
      "Almond milk",
      "No milk",
      "Decaf",
      "Extra shot"
    ],
    lessons: [
      {
        id: "b4-sizes",
        topicId: "customising-a-drink",
        order: 1,
        title: "Sizes: Small, Medium, Large",
        subtitle: "Cup Volumes",
        xp: 20,
        sign: {
          id: "drink_sizes",
          name: "Small, Medium, Large",
          meaning: "Cup size options at the counter",
          description:
            "'SMALL': two flat palms close together. 'MEDIUM': flat hand slicing midpoint between waist and chest, or fingerspell M-E-D. 'LARGE': 'L' hands pulling apart wide with puffed cheeks.",
          motionTip: "Hands close for small; hands wide with puffed cheeks for large.",
          customerContext: "Confirming cup size when customer orders coffee.",
          etiquetteTip: "Show the actual physical cups on the counter to eliminate ambiguity.",
          facialExpressionTip: "Squint slightly for 'small', puff cheeks for 'large'.",
          handShapeTips: [
            "'SMALL': Palms facing each other close together",
            "'MEDIUM': Open palm flat horizontal at mid-level",
            "'LARGE': 'L' hands or open curved hands expanding wide"
          ],
          emoji: "📏"
        },
        questions: [
          {
            id: "b4-sz-q1",
            question: "How do you sign 'Large' cup size in ASL?",
            options: [
              {
                id: "b4-sz-q1-1",
                text: "Both hands spread wide apart with puffed cheeks ('cha' mouth morpheme)",
                isCorrect: true,
                feedback: "Correct! Puffed cheeks ('cha') denotes large size in ASL."
              },
              {
                id: "b4-sz-q1-2",
                text: "Pinch your thumb and index finger tiny",
                isCorrect: false,
                feedback: "Pinching tiny is 'SMALL', not 'LARGE'."
              }
            ],
            explanation: "In ASL, size is modified by hand distance and the puffed-cheeks facial morpheme."
          }
        ]
      },
      {
        id: "b4-dairy-alternatives",
        topicId: "customising-a-drink",
        order: 2,
        title: "Oat, Soy & Almond Milk",
        subtitle: "Dietary Milk Substitutions",
        xp: 20,
        sign: {
          id: "dairy_alternatives",
          name: "Oat, Soy, Almond & No Milk",
          meaning: "Specialty milk requests",
          description:
            "Fingerspell O-A-T, S-O-Y, or A-L-M-O-N-D followed by 'MILK'. For 'NO MILK': sign 'MILK' followed by 'NO' (two fingers snapping to thumb) or 'NONE'.",
          motionTip: "Quick fingerspell + 'MILK' squeeze. 'NO MILK' = milk + 'NO'.",
          customerContext: "Deaf patron ordering an allergy or lifestyle milk preference.",
          etiquetteTip: "Always double-check oat vs. dairy for customer health and safety.",
          facialExpressionTip: "Attentive verification nod.",
          handShapeTips: [
            "Fingerspell 'O-A-T' smoothly",
            "Sign 'MILK' (squeezing fist)",
            "For 'NO MILK': snap index/middle to thumb ('NO')"
          ],
          videoSrc: "/videos/asl_no_demo.mp4",
          emoji: "🌾"
        },
        questions: [
          {
            id: "b4-da-q1",
            question: "How do customers commonly communicate 'Oat milk'?",
            options: [
              {
                id: "b4-da-q1-1",
                text: "Fingerspell 'O-A-T' followed by the sign for 'MILK'",
                isCorrect: true,
                feedback: "Spot on! Crisp fingerspelling of O-A-T with MILK is universally clear."
              },
              {
                id: "b4-da-q1-2",
                text: "Pretend to eat cereal",
                isCorrect: false,
                feedback: "Eating cereal does not clearly specify oat milk."
              }
            ],
            explanation: "Short food loan-words like OAT and SOY are typically fingerspelled then paired with MILK."
          },
          {
            id: "b4-da-q2",
            question: "How do you sign 'No milk'?",
            options: [
              {
                id: "b4-da-q2-1",
                text: "Sign 'MILK' followed by 'NO' (index and middle snap down to thumb)",
                isCorrect: true,
                feedback: "Yes! 'MILK + NO' or 'NO + MILK' clearly signifies dairy-free."
              },
              {
                id: "b4-da-q2-2",
                text: "Hide both hands behind your back",
                isCorrect: false,
                feedback: "Hiding hands stops the conversation."
              }
            ],
            explanation: "'MILK' + 'NO' (two fingers snapping down to thumb) means no milk."
          }
        ]
      },
      {
        id: "b4-sugar-sweetener",
        topicId: "customising-a-drink",
        order: 3,
        title: "Sugar & Sweetness",
        subtitle: "Sugar, Extra & Less",
        xp: 20,
        sign: {
          id: "sugar_sweetness",
          name: "Sugar, Extra & Less",
          meaning: "Modifying syrup and sugar levels",
          description:
            "'SUGAR': rub index and middle fingertips down your chin twice ('SWEET'). 'EXTRA': dominant curved hand placed on top of non-dominant hand. 'LESS': flat hand lowers down.",
          motionTip: "Brush chin down for 'SUGAR'. Lower hand for 'LESS'.",
          customerContext: "Adding raw sugar, vanilla syrup, or asking for half-sweet.",
          etiquetteTip: "Confirming 'LESS SWEET' or 'EXTRA SWEET' prevents remake waste.",
          facialExpressionTip: "Sweet, smiling expression.",
          handShapeTips: [
            "'SUGAR / SWEET': Two fingers stroke chin downward twice",
            "'LESS': Flat hand moves downward toward table",
            "'EXTRA / MORE': Fingertips tap together"
          ],
          emoji: "🍬"
        },
        questions: [
          {
            id: "b4-sug-q1",
            question: "How is 'Sugar' or 'Sweet' signed in ASL?",
            options: [
              {
                id: "b4-sug-q1-1",
                text: "Stroke index and middle fingers downward on chin twice",
                isCorrect: true,
                feedback: "Correct! The two fingers stroking the chin denotes 'SUGAR' or 'SWEET'."
              },
              {
                id: "b4-sug-q1-2",
                text: "Lick the palm of your hand",
                isCorrect: false,
                feedback: "Licking the palm is unhygienic and incorrect."
              }
            ],
            explanation: "'SUGAR' strokes two fingers downward across the chin."
          }
        ]
      },
      {
        id: "b4-decaf-extra-shot",
        topicId: "customising-a-drink",
        order: 4,
        title: "Decaf & Extra Shot",
        subtitle: "Espresso Doses",
        xp: 20,
        sign: {
          id: "decaf_extra_shot",
          name: "Decaf & Extra Shot",
          meaning: "Caffeine adjustment",
          description:
            "'DECAF': fingerspell D-E-C-A-F or sign 'COFFEE' + 'NO CAFFEINE'. 'EXTRA SHOT': sign 'ADD' + 1 or 2 fingers, or miming pulling a portafilter handle.",
          motionTip: "Fingerspell 'D-E-C-A-F' or sign 'ADD + 1 SHOT'.",
          customerContext: "Customer wanting decaffeinated beans or a double espresso shot.",
          etiquetteTip: "Critical for customers with caffeine sensitivities.",
          facialExpressionTip: "Clear confirmation nod.",
          handShapeTips: [
            "Fingerspell 'D-E-C-A-F'",
            "'EXTRA SHOT': One hand adds on top of fist ('ADD') + 1 finger"
          ],
          emoji: "⚡"
        },
        questions: [
          {
            id: "b4-des-q1",
            question: "How do you confirm an 'Extra shot' of espresso?",
            options: [
              {
                id: "b4-des-q1-1",
                text: "Sign 'ADD' + hold up '1' finger, or fingerspell 'SHOT'",
                isCorrect: true,
                feedback: "Yes! 'ADD + 1' or 'EXTRA + 1' clearly communicates an additional espresso shot."
              },
              {
                id: "b4-des-q1-2",
                text: "Pretend to fire a cannon",
                isCorrect: false,
                feedback: "Firing a cannon is not appropriate for counter espresso."
              }
            ],
            explanation: "'ADD' plus a numerical finger count denotes extra espresso shots."
          }
        ]
      }
    ]
  },

  // ==========================================
  // TOPIC 5: Food & Pastries
  // ==========================================
  {
    id: "food-and-pastries",
    number: 5,
    title: "Food & Pastries",
    subtitle: "Bakery, Dietary Needs & Meals",
    badge: "🥐",
    accentColor: "#EA580C",
    description:
      "Sandwich, pastry, cookie, croissant, muffin, dietary options (Vegetarian, Vegan, Gluten-free).",
    phrases: [
      "Sandwich",
      "Cake",
      "Cookie",
      "Croissant",
      "Muffin",
      "Breakfast",
      "Lunch",
      "Vegetarian",
      "Vegan",
      "Gluten-free"
    ],
    lessons: [
      {
        id: "b5-pastries",
        topicId: "food-and-pastries",
        order: 1,
        title: "Bakery: Cookie, Cake & Croissant",
        subtitle: "Sweet Display Case Items",
        xp: 20,
        sign: {
          id: "cookie_cake",
          name: "Cookie, Cake & Croissant",
          meaning: "Ordering pastry case treats",
          description:
            "'COOKIE': 'C' hand twists on flat open palm like cutting out cookie dough. 'CAKE': 'C' hand traces layers on flat palm or across chin.",
          motionTip: "Twisting 'C' hand on open palm for cookie; tracing layers for cake.",
          customerContext: "Pointing into the glass pastry display.",
          etiquetteTip: "Point directly into the case to confirm which exact treat they want.",
          facialExpressionTip: "Delighted, appetizing expression.",
          handShapeTips: [
            "Non-dominant palm flat like rolling dough",
            "Dominant 'C' hand twists clockwise and counterclockwise",
            "Fingerspell 'C-R-O-I-S-S-A-N-T' or shape crescent horns"
          ],
          emoji: "🍪"
        },
        questions: [
          {
            id: "b5-p-q1",
            question: "How do you sign 'Cookie' in ASL?",
            options: [
              {
                id: "b5-p-q1-1",
                text: "Twist a 'C' hand on a flat non-dominant palm like a cookie cutter",
                isCorrect: true,
                feedback: "Spot on! It literally mimics a cookie cutter pressing dough."
              },
              {
                id: "b5-p-q1-2",
                text: "Scratch your ear twice",
                isCorrect: false,
                feedback: "Scratching ear has no food meaning."
              }
            ],
            explanation: "'COOKIE' uses a 'C' hand twisting on an open palm like a round cookie cutter."
          }
        ]
      },
      {
        id: "b5-sandwich-savory",
        topicId: "food-and-pastries",
        order: 2,
        title: "Sandwich & Lunch",
        subtitle: "Savory Food Items",
        xp: 20,
        sign: {
          id: "sandwich_lunch",
          name: "Sandwich & Lunch",
          meaning: "Toasted sandwiches and midday meals",
          description:
            "'SANDWICH': both hands flat, one on top of the other like two slices of bread, brought to mouth. 'LUNCH': 'EAT' + 'NOON'.",
          motionTip: "Two flat hands sandwiching filling brought toward mouth.",
          customerContext: "Offering to toast or heat up a panini or sandwich.",
          etiquetteTip: "Follow up by asking 'WARM / HEAT UP?' with open palm under hand.",
          facialExpressionTip: "Inquiring friendly gaze.",
          handShapeTips: [
            "Flat hands parallel with thumbs tucked",
            "Move toward mouth as if eating a sandwich"
          ],
          emoji: "🥪"
        },
        questions: [
          {
            id: "b5-sw-q1",
            question: "How do you sign 'Sandwich'?",
            options: [
              {
                id: "b5-sw-q1-1",
                text: "Place both flat hands together like bread slices and move toward your mouth",
                isCorrect: true,
                feedback: "Correct! The two hands represent bread slices brought to the mouth."
              },
              {
                id: "b5-sw-q1-2",
                text: "Pinch your nose with two fingers",
                isCorrect: false,
                feedback: "Pinching nose is not 'Sandwich'."
              }
            ],
            explanation: "'SANDWICH' mimics holding a sandwich with two hands and bringing it to the mouth."
          }
        ]
      },
      {
        id: "b5-dietary-gluten-free",
        topicId: "food-and-pastries",
        order: 3,
        title: "Vegetarian, Vegan & Gluten-free",
        subtitle: "Dietary Restrictions & Allergies",
        xp: 20,
        sign: {
          id: "dietary_needs",
          name: "Vegetarian, Vegan & Gluten-free",
          meaning: "Dietary preferences and allergen safety",
          description:
            "'VEGETARIAN': 'V' hand twisting on cheek ('VEGETABLE'). 'VEGAN': fingerspell V-E-G-A-N. 'GLUTEN-FREE': fingerspell G-F followed by 'FREE' (crossed 'F' fists opening outward).",
          motionTip: "'V' twist on cheek for vegetarian; G-F + 'FREE' (uncrossing hands).",
          customerContext: "Customer checking food labels in bakery case.",
          etiquetteTip: "Accuracy is paramount for allergen safety; confirm gluten-free labels.",
          facialExpressionTip: "Attentive, conscientious expression.",
          handShapeTips: [
            "'VEGETARIAN': 'V' hand index and middle finger twisting against cheek",
            "'FREE': Both 'F' hands cross chest and swing outward open"
          ],
          emoji: "🥗"
        },
        questions: [
          {
            id: "b5-gf-q1",
            question: "How is 'Vegetarian' signed in ASL?",
            options: [
              {
                id: "b5-gf-q1-1",
                text: "'V' hand shape twisting gently on the cheek",
                isCorrect: true,
                feedback: "Correct! 'V' on the cheek signifies vegetable/vegetarian."
              },
              {
                id: "b5-gf-q1-2",
                text: "Drawing a circle in the air",
                isCorrect: false,
                feedback: "Circling is not the sign for vegetarian."
              }
            ],
            explanation: "'VEGETABLE / VEGETARIAN' uses a 'V' hand twisting against the cheek."
          }
        ]
      }
    ]
  },

  // ==========================================
  // TOPIC 6: Payment
  // ==========================================
  {
    id: "payment",
    number: 6,
    title: "Payment",
    subtitle: "Cash, Card, Tap & Receipts",
    badge: "💳",
    accentColor: "#2563EB",
    description:
      "Register transactions: Card, Cash, Contactless tap, Receipt, Price, and Change.",
    phrases: [
      "Cash",
      "Card",
      "Contactless",
      "Pay",
      "Payment",
      "Receipt",
      "Price",
      "How much?",
      "Change"
    ],
    lessons: [
      {
        id: "b6-card-cash",
        topicId: "payment",
        order: 1,
        title: "Cash, Card & Contactless",
        subtitle: "Payment Methods",
        xp: 20,
        sign: {
          id: "card_cash_tap",
          name: "Cash, Card & Tap",
          meaning: "Selecting how to pay",
          description:
            "'CARD': dominant thumb and index miming swiping/inserting card, or miming tapping phone/card onto terminal. 'CASH': count paper bills between thumb and fingers.",
          motionTip: "'CARD' mimics tapping or inserting a card; 'CASH' slides paper bills.",
          customerContext: "Directing customer to payment terminal at register.",
          etiquetteTip: "Point toward card terminal screen with a welcoming open hand.",
          facialExpressionTip: "Clear, helpful smile.",
          handShapeTips: [
            "'CARD': Flat rectangular shape or tap gesture on terminal",
            "'CASH': Dominant thumb rubs across fingers as if counting dollar bills",
            "'TAP': Light tap of hand on top of flat surface"
          ],
          emoji: "💳"
        },
        questions: [
          {
            id: "b6-cc-q1",
            question: "How do you indicate contactless tap-to-pay to a customer?",
            options: [
              {
                id: "b6-cc-q1-1",
                text: "Hold flat hand mimicking a card and tap it gently over the card reader",
                isCorrect: true,
                feedback: "Spot on! The universal gesture mimics the tap-to-pay action."
              },
              {
                id: "b6-cc-q1-2",
                text: "Toss coins onto the counter",
                isCorrect: false,
                feedback: "Tossing coins is rude and not contactless."
              }
            ],
            explanation: "Miming the tap gesture directly over the POS terminal is universally understood."
          }
        ]
      },
      {
        id: "b6-how-much-price",
        topicId: "payment",
        order: 2,
        title: "Price & How much?",
        subtitle: "Totals & Cost",
        xp: 20,
        sign: {
          id: "how_much_price",
          name: "Price & How much?",
          meaning: "Stating or inquiring about total cost",
          description:
            "'HOW MUCH?': both hands open upward, wiggling fingers rising slightly with furrowed eyebrows. 'PRICE': dominant index finger bent ('X' hand) strokes non-dominant palm down.",
          motionTip: "Open hands flicking upward with furrowed eyebrows = 'HOW MUCH?'.",
          customerContext: "Showing total on POS screen or stating the price.",
          etiquetteTip: "Always show the total on the customer-facing display screen.",
          facialExpressionTip: "Furrowed eyebrows for cost question; neutral pleasant for stating price.",
          handShapeTips: [
            "'HOW MUCH': Palms up, fingers flicking upward together",
            "'PRICE': 'X' crooked index finger slides down opposite open palm"
          ],
          emoji: "💲"
        },
        questions: [
          {
            id: "b6-hp-q1",
            question: "How do you sign 'How much?' in ASL?",
            options: [
              {
                id: "b6-hp-q1-1",
                text: "Both hands held palms-up flicking fingers upward with furrowed eyebrows",
                isCorrect: true,
                feedback: "Correct! The upward flick with furrowed eyebrows asks 'How much does it cost?'."
              },
              {
                id: "b6-hp-q1-2",
                text: "Hold up an empty cup",
                isCorrect: false,
                feedback: "Holding an empty cup is not 'How much?'."
              }
            ],
            explanation: "'HOW MUCH' flicks both upward-facing hands with furrowed question eyebrows."
          }
        ]
      },
      {
        id: "b6-receipt",
        topicId: "payment",
        order: 3,
        title: "Receipt & Change",
        subtitle: "Completing the Transaction",
        xp: 20,
        sign: {
          id: "receipt_change",
          name: "Receipt & Change",
          meaning: "Asking if customer wants paper receipt or change",
          description:
            "'RECEIPT': sign 'PAPER' (heels of flat hands clap across each other twice) + miming tearing off slip. 'WANT RECEIPT?': raised eyebrows.",
          motionTip: "Hands brush together ('PAPER') then tear off slip ('RECEIPT').",
          customerContext: "After card payment approves.",
          etiquetteTip: "Raise eyebrows while offering receipt: 'RECEIPT WANT?'.",
          facialExpressionTip: "Questioning raised eyebrows.",
          handShapeTips: [
            "'PAPER': Flat palms brush horizontally against each other twice",
            "'TEAR': Pinch thumb and index pulling away like tearing register tape"
          ],
          emoji: "🧾"
        },
        questions: [
          {
            id: "b6-rc-q1",
            question: "How do you ask 'Do you want a receipt?'",
            options: [
              {
                id: "b6-rc-q1-1",
                text: "Sign 'PAPER / RECEIPT' and 'WANT?' with raised questioning eyebrows",
                isCorrect: true,
                feedback: "Yes! 'RECEIPT WANT?' with raised eyebrows is courteous and clear."
              },
              {
                id: "b6-rc-q1-2",
                text: "Crumple paper in a ball and toss it",
                isCorrect: false,
                feedback: "Crumpling paper is disrespectful."
              }
            ],
            explanation: "'PAPER/RECEIPT WANT?' with raised eyebrows asks if they'd like their receipt."
          }
        ]
      }
    ]
  },

  // ==========================================
  // TOPIC 7: Collecting an Order
  // ==========================================
  {
    id: "collecting-an-order",
    number: 7,
    title: "Collecting an Order",
    subtitle: "Pickup Counter, Names & Hand-off",
    badge: "🔔",
    accentColor: "#7C3AED",
    description:
      "Your order is ready, Please wait, Name, Number, Enjoy, and Careful it's hot.",
    phrases: [
      "Your order is ready",
      "Please wait",
      "Your coffee is ready",
      "Here is your order",
      "Number",
      "Name",
      "Enjoy",
      "Careful, it's hot"
    ],
    lessons: [
      {
        id: "b7-order-ready",
        topicId: "collecting-an-order",
        order: 1,
        title: "Your order is ready",
        subtitle: "Pickup Alert",
        xp: 20,
        sign: {
          id: "order_ready",
          name: "Your order is ready",
          meaning: "Alerting customer that beverage/food is finished",
          description:
            "Point toward customer ('YOUR') + 'COFFEE' or 'ORDER' + 'READY' ('R' hands shaking side to side outward).",
          motionTip: "'YOUR' (flat open hand toward customer) + 'READY' ('R' hands sweep).",
          customerContext: "Handing drink over at the pickup bar.",
          etiquetteTip: "Catch customer's eye with a gentle visual wave before signing 'READY'.",
          facialExpressionTip: "Enthusiastic, welcoming smile.",
          handShapeTips: [
            "'YOUR': Flat hand pushes toward customer",
            "'READY': Both 'R' hands shake outward from center to sides"
          ],
          emoji: "🛎️"
        },
        questions: [
          {
            id: "b7-or-q1",
            question: "How do you signal 'Your coffee is ready' at the pickup station?",
            options: [
              {
                id: "b7-or-q1-1",
                text: "Wave gently to get eye contact, sign 'YOUR COFFEE READY', and gesture to cup",
                isCorrect: true,
                feedback: "Outstanding! Getting eye contact first is golden Deaf etiquette."
              },
              {
                id: "b7-or-q1-2",
                text: "Shout their name loudly without looking",
                isCorrect: false,
                feedback: "Deaf customers cannot hear vocal shouts."
              }
            ],
            explanation: "Eye contact first, then sign 'YOUR COFFEE READY' pointing clearly to the tray."
          }
        ]
      },
      {
        id: "b7-careful-hot-enjoy",
        topicId: "collecting-an-order",
        order: 2,
        title: "Careful, it's hot & Enjoy!",
        subtitle: "Safety & Warm Closing",
        xp: 20,
        sign: {
          id: "careful_hot_enjoy",
          name: "Careful, it's hot & Enjoy!",
          meaning: "Safety warning and warm parting wish",
          description:
            "'CAREFUL': both 'K' hands tap one on top of the other twice. 'HOT': claw hand at mouth thrown forward. 'ENJOY': both flat hands rub chest and belly in circles.",
          motionTip: "'K' hands tap for 'CAREFUL'; flat hands circle for 'ENJOY'.",
          customerContext: "Handing over fresh boiling Americano or tea.",
          etiquetteTip: "A safety warning shows exceptional professional care.",
          facialExpressionTip: "Cautious warning expression for 'HOT', warm smile for 'ENJOY'.",
          handShapeTips: [
            "'CAREFUL': 'K' hand (peace sign with thumb between fingers) tapping together",
            "'ENJOY': One hand on chest, one on stomach, circling smoothly"
          ],
          emoji: "⚠️"
        },
        questions: [
          {
            id: "b7-che-q1",
            question: "How do you sign 'Enjoy' to a customer receiving their meal?",
            options: [
              {
                id: "b7-che-q1-1",
                text: "Rub one flat hand on chest and other on stomach in warm circular motions",
                isCorrect: true,
                feedback: "Spot on! 'ENJOY' is an expansive, happy two-handed chest/belly circle."
              },
              {
                id: "b7-che-q1-2",
                text: "Snap fingers three times",
                isCorrect: false,
                feedback: "Snapping fingers is not 'Enjoy'."
              }
            ],
            explanation: "'ENJOY' circles both hands on the chest and torso with a big smile."
          }
        ]
      }
    ]
  },

  // ==========================================
  // TOPIC 8: Problems & Clarification
  // ==========================================
  {
    id: "problems-and-clarification",
    number: 8,
    title: "Problems & Clarification",
    subtitle: "Resolving Mistakes & Out-of-Stock",
    badge: "🔄",
    accentColor: "#DC2626",
    description:
      "Sorry, One moment, Please repeat, I don't understand, Can you sign again?, and We are out of...",
    phrases: [
      "Sorry",
      "One moment",
      "Please repeat",
      "I don't understand",
      "Can you sign again?",
      "There is a problem",
      "We're out of...",
      "We don't have...",
      "Wrong order",
      "New order"
    ],
    lessons: [
      {
        id: "b8-sorry-one-moment",
        topicId: "problems-and-clarification",
        order: 1,
        title: "Sorry & One moment",
        subtitle: "Patience & Apologies",
        xp: 20,
        sign: {
          id: "sorry_one_moment",
          name: "Sorry & One moment",
          meaning: "Apologizing or asking customer to wait briefly",
          description:
            "'SORRY': rub 'A' fist in circle over heart with contrite expression. 'ONE MOMENT': hold up single index finger with calm nod.",
          motionTip: "Fist circling over heart = 'SORRY'; index finger up = 'WAIT A SEC'.",
          customerContext: "When espresso machine requires steam cleaning or restock.",
          etiquetteTip: "A quick, apologetic 'SORRY, ONE MOMENT' defuses frustration instantly.",
          facialExpressionTip: "Sincere, apologetic facial expression.",
          handShapeTips: [
            "'SORRY': 'A' fist rubs center of chest in circular motion",
            "'ONE MOMENT': Index finger held upright at eye level, gentle nod"
          ],
          emoji: "⏱️"
        },
        questions: [
          {
            id: "b8-som-q1",
            question: "How do you sign 'Sorry' in ASL?",
            options: [
              {
                id: "b8-som-q1-1",
                text: "Rub an 'A' fist in a circular motion over your chest with an apologetic expression",
                isCorrect: true,
                feedback: "Correct! 'SORRY' rubs the heart with a contrite facial expression."
              },
              {
                id: "b8-som-q1-2",
                text: "Pinch both cheeks",
                isCorrect: false,
                feedback: "Pinching cheeks is not 'Sorry'."
              }
            ],
            explanation: "'SORRY' rubs an 'A' fist over the chest with an apologetic face."
          }
        ]
      },
      {
        id: "b8-repeat-understand",
        topicId: "problems-and-clarification",
        order: 2,
        title: "Please repeat & I don't understand",
        subtitle: "Clarification & Asking to Resign",
        xp: 20,
        sign: {
          id: "repeat_understand",
          name: "Please repeat / I don't understand",
          meaning: "Asking customer to sign again slower",
          description:
            "'AGAIN': dominant curved hand jumps into flat non-dominant palm. 'NOT UNDERSTAND': flick index finger upward near temple + shake head.",
          motionTip: "'AGAIN' arcs into palm; 'NOT UNDERSTAND' flicks index near temple while shaking head.",
          customerContext: "When customer signs faster than your receptive vocabulary.",
          etiquetteTip: "Deaf patrons LOVE when hearing baristas ask them to sign again slower.",
          facialExpressionTip: "Puzzled, humble expression with head shake.",
          handShapeTips: [
            "'AGAIN': Curved 4-hand flips into open opposite palm",
            "'SLOW': Dominant hand slides slowly up back of non-dominant arm",
            "Pair with 'PLEASE'"
          ],
          emoji: "🔁"
        },
        questions: [
          {
            id: "b8-ru-q1",
            question: "What is the best reaction when a Deaf customer signs faster than you know?",
            options: [
              {
                id: "b8-ru-q1-1",
                text: "Politely sign 'PLEASE AGAIN SLOW' with an honest, receptive smile",
                isCorrect: true,
                feedback: "Perfect! Honesty and asking for 'AGAIN SLOW' is respected across the Deaf community."
              },
              {
                id: "b8-ru-q1-2",
                text: "Pretend you understood and make a random drink",
                isCorrect: false,
                feedback: "Faking comprehension leads to wrong drinks and broken trust."
              }
            ],
            explanation: "Signing 'PLEASE AGAIN SLOW' ensures accuracy and shows genuine effort to communicate."
          }
        ]
      },
      {
        id: "b8-out-of-stock",
        topicId: "problems-and-clarification",
        order: 3,
        title: "We're out of...",
        subtitle: "Inventory Depleted",
        xp: 20,
        sign: {
          id: "out_of_stock",
          name: "We're out of... / None left",
          meaning: "Informing patron an item is sold out",
          description:
            "Sign 'EMPTY / OUT OF': middle finger strokes back of open hand forward, or sign 'NONE' (two 'O' hands shake outward side-to-side with head shake).",
          motionTip: "'NONE' ('O' hands push outward) with apologetic head shake.",
          customerContext: "When oat milk, a pastry, or decaf beans are sold out.",
          etiquetteTip: "Immediately offer an alternative: 'NONE, BUT WE HAVE...' to be helpful.",
          facialExpressionTip: "Apologetic expression with slight shoulder shrug.",
          handShapeTips: [
            "Both hands in 'O' shape",
            "Push forward and separate horizontally",
            "Head shakes 'no' apologetically"
          ],
          emoji: "🚫"
        },
        questions: [
          {
            id: "b8-oos-q1",
            question: "How do you communicate that an item (like oat milk) is sold out?",
            options: [
              {
                id: "b8-oos-q1-1",
                text: "Sign 'O-A-T MILK' + 'NONE' (pushing 'O' hands outward with head shake) + 'SORRY'",
                isCorrect: true,
                feedback: "Spot on! Naming the item followed by 'NONE / FINISH' and 'SORRY' is crystal clear."
              },
              {
                id: "b8-oos-q1-2",
                text: "Turn off all lights in the store",
                isCorrect: false,
                feedback: "Turning off lights indicates emergency or closing."
              }
            ],
            explanation: "Sign the item name + 'NONE / ALL GONE' + 'SORRY' to explain sold-out stock."
          }
        ]
      }
    ]
  },

  // ==========================================
  // TOPIC 9: Café Equipment
  // ==========================================
  {
    id: "cafe-equipment",
    number: 9,
    title: "Café Equipment",
    subtitle: "Machines, Tools & Supplies",
    badge: "⚙️",
    accentColor: "#475569",
    description:
      "Coffee machine, cup, spoon, straw, napkin, counter, fridge, grinder, and blender.",
    phrases: [
      "Coffee machine",
      "Cup",
      "Spoon",
      "Straw",
      "Napkin",
      "Counter",
      "Fridge",
      "Grinder",
      "Blender"
    ],
    lessons: [
      {
        id: "b9-supplies",
        topicId: "cafe-equipment",
        order: 1,
        title: "Cup, Straw, Spoon & Napkin",
        subtitle: "Customer Condiments & Utensils",
        xp: 20,
        sign: {
          id: "cup_straw_napkin",
          name: "Cup, Straw & Napkin",
          meaning: "Giving customer utensils and paper goods",
          description:
            "'CUP': 'C' hand sits in flat palm. 'STRAW': miming drinking through narrow tube, or fingerspell S-T-R-A-W. 'NAPKIN': wipe fingers across lips/chin.",
          motionTip: "'C' hand on palm for cup; wiping mouth with flat hand for napkin.",
          customerContext: "When guest asks for an extra straw or napkins.",
          etiquetteTip: "Hand supplies over directly with an open posture.",
          facialExpressionTip: "Helpful, pleasant gaze.",
          handShapeTips: [
            "'CUP': Dominant 'C' hand rests in non-dominant flat palm",
            "'NAPKIN': Flat hand softly wipes chin/lips like wiping mouth",
            "'STRAW': Thumb and index held narrow like sipping through straw"
          ],
          emoji: "🥤"
        },
        questions: [
          {
            id: "b9-csn-q1",
            question: "How do you sign 'Napkin' in ASL?",
            options: [
              {
                id: "b9-csn-q1-1",
                text: "Wipe fingertips or flat hand softly across chin/mouth like dabbing with a napkin",
                isCorrect: true,
                feedback: "Correct! The natural gesture mimics dabbing one's mouth with a napkin."
              },
              {
                id: "b9-csn-q1-2",
                text: "Wave a hand above your head",
                isCorrect: false,
                feedback: "Waving above head is not 'Napkin'."
              }
            ],
            explanation: "'NAPKIN' mimics wiping or dabbing the mouth with a paper napkin."
          }
        ]
      },
      {
        id: "b9-machines",
        topicId: "cafe-equipment",
        order: 2,
        title: "Coffee Machine & Grinder",
        subtitle: "Barista Hardware",
        xp: 20,
        sign: {
          id: "coffee_machine",
          name: "Coffee Machine & Grinder",
          meaning: "Espresso machine and grinder stations",
          description:
            "'MACHINE': intertwined claw hands rotating like meshing gears. 'COFFEE MACHINE': sign 'COFFEE' + 'MACHINE'.",
          motionTip: "Intertwined curved fingers moving up and down like gears in a machine.",
          customerContext: "Explaining that the espresso machine is brewing or steaming.",
          etiquetteTip: "Visual signs for machinery help customers understand prep time.",
          facialExpressionTip: "Informative.",
          handShapeTips: [
            "Both hands curved claws with fingers bent",
            "Interlock fingertips like gears",
            "Move hands up and down rhythmically twice"
          ],
          emoji: "⚙️"
        },
        questions: [
          {
            id: "b9-cm-q1",
            question: "How is 'Machine' signed in ASL?",
            options: [
              {
                id: "b9-cm-q1-1",
                text: "Curved claw hands with fingertips interlocked moving up and down like meshing gears",
                isCorrect: true,
                feedback: "Yes! The meshing fingers represent gear teeth inside a working machine."
              },
              {
                id: "b9-cm-q1-2",
                text: "Snapping both thumbs",
                isCorrect: false,
                feedback: "Snapping thumbs does not represent machinery."
              }
            ],
            explanation: "'MACHINE' features interlocking fingers moving up and down like mechanical gears."
          }
        ]
      }
    ]
  },

  // ==========================================
  // TOPIC 10: Café Workplace
  // ==========================================
  {
    id: "cafe-workplace",
    number: 10,
    title: "Café Workplace",
    subtitle: "Roles, Atmosphere & Store Status",
    badge: "🏪",
    accentColor: "#0284C7",
    description:
      "Customer, Barista, Manager, Staff, Busy, Clean, Kitchen, Counter, Break, Open, and Closed.",
    phrases: [
      "Customer",
      "Barista",
      "Manager",
      "Staff",
      "Busy",
      "Clean",
      "Kitchen",
      "Counter",
      "Break",
      "Open",
      "Closed"
    ],
    lessons: [
      {
        id: "b10-roles",
        topicId: "cafe-workplace",
        order: 1,
        title: "Barista, Customer & Manager",
        subtitle: "Team & Patron Roles",
        xp: 20,
        sign: {
          id: "barista_manager",
          name: "Barista, Customer & Manager",
          meaning: "Roles on the café floor",
          description:
            "'BARISTA': sign 'COFFEE' + 'PERSON' marker (flat hands sliding down body sides). 'CUSTOMER': 'BUY' + 'PERSON'. 'MANAGER': 'CONTROL/LEAD' + 'PERSON'.",
          motionTip: "Action sign + two flat hands moving down sides ('PERSON' marker).",
          customerContext: "Introducing yourself or calling a shift supervisor.",
          etiquetteTip: "If a customer has a complex query, you can sign 'MANAGER, I CALL'.",
          facialExpressionTip: "Respectful and professional.",
          handShapeTips: [
            "Sign 'COFFEE' (two fists grinding)",
            "Follow immediately with 'PERSON' marker (flat hands moving down thighs/ribs)"
          ],
          emoji: "🧑‍🍳"
        },
        questions: [
          {
            id: "b10-bm-q1",
            question: "How is an occupation sign like 'Barista' constructed in ASL?",
            options: [
              {
                id: "b10-bm-q1-1",
                text: "The activity sign ('COFFEE') combined with the 'PERSON' marker (hands sliding down sides)",
                isCorrect: true,
                feedback: "Spot on! Most profession titles in ASL add the agent/person marker to the verb."
              },
              {
                id: "b10-bm-q1-2",
                text: "Spelling their full home address",
                isCorrect: false,
                feedback: "Address spelling is completely unrelated."
              }
            ],
            explanation: "In ASL, combining a verb with the PERSON marker creates the profession (e.g. COFFEE + PERSON = Barista)."
          }
        ]
      },
      {
        id: "b10-open-closed-busy",
        topicId: "cafe-workplace",
        order: 2,
        title: "Open, Closed & Busy",
        subtitle: "Café Hours & Store Pace",
        xp: 20,
        sign: {
          id: "open_closed_busy",
          name: "Open, Closed & Busy",
          meaning: "Store hours and floor status",
          description:
            "'OPEN': both flat hands starting together then swinging open like double doors. 'CLOSED': both flat hands swinging shut together. 'BUSY': dominant flat hand brushing back and forth over non-dominant wrist.",
          motionTip: "'OPEN' swings open like doors; 'CLOSED' claps together shut; 'BUSY' brushes wrist.",
          customerContext: "Informing patrons of store opening, closing time, or morning rush.",
          etiquetteTip: "Always sign 'OPEN' with a friendly welcoming face.",
          facialExpressionTip: "Bright for 'OPEN'; apologetic for 'CLOSED'.",
          handShapeTips: [
            "'OPEN': Both 'B' hands (flat palms) swing outward like saloon doors opening",
            "'CLOSED': Both flat hands swing together till index fingers meet firmly",
            "'BUSY': Dominant open hand rapidly rubs back of non-dominant wrist"
          ],
          emoji: "🚪"
        },
        questions: [
          {
            id: "b10-oc-q1",
            question: "How do you sign 'Open' for a store or counter?",
            options: [
              {
                id: "b10-oc-q1-1",
                text: "Both flat hands start together and swing apart outward like doors opening",
                isCorrect: true,
                feedback: "Correct! The visual mimics double doors swinging wide open."
              },
              {
                id: "b10-oc-q1-2",
                text: "Covering both eyes with your hands",
                isCorrect: false,
                feedback: "Covering eyes is not 'Open'."
              }
            ],
            explanation: "'OPEN' visualizes double doors swinging outward to welcome patrons."
          },
          {
            id: "b10-oc-q2",
            question: "How do you sign 'Closed'?",
            options: [
              {
                id: "b10-oc-q2-1",
                text: "Both flat hands start apart and swing together until their edges meet shut",
                isCorrect: true,
                feedback: "Yes! The two doors swinging shut signifies 'CLOSED'."
              },
              {
                id: "b10-oc-q2-2",
                text: "Waving one hand goodbye",
                isCorrect: false,
                feedback: "Waving goodbye is 'GOODBYE', not 'CLOSED'."
              }
            ],
            explanation: "'CLOSED' brings both flat palms together shutting the barrier."
          }
        ]
      }
    ]
  }
];
