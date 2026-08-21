(function () {
  "use strict";
  var LearnAI = window.LearnAI;

  var LESSONS = [
    {
      id: "what-is-ai",
      title: "What is Artificial Intelligence?",
      emoji: "🤖",
      color: "#4f8cff",
      tagline: "Meet computers that can think and learn!",
      minutes: 5,
      steps: [
        {
          type: "story",
          emoji: "👋",
          title: "Hi! I'm Sparky the AI robot!",
          text: "I'm a computer program that can learn things, answer questions, and even play games with you. People call me Artificial Intelligence - or AI for short. Want to find out how I work?"
        },
        {
          type: "concept",
          title: "AI means smart computer brains",
          text: "Normal computers only do exactly what they are told. AI computers can LEARN from examples, spot patterns, and make smart choices - a bit like you do!",
          bullets: [
            { ic: "👀", text: "AI can look at pictures and recognize what's in them" },
            { ic: "👂", text: "AI can listen to your voice and understand words" },
            { ic: "🎯", text: "AI learns from practice, just like riding a bike" }
          ],
          anim: "think"
        },
        {
          type: "examples",
          title: "You already use AI every day!",
          text: "Look around - AI is hiding in lots of places:",
          items: [
            { emoji: "🗣️", title: "Voice helpers", text: "Alexa and Siri answer when you talk" },
            { emoji: "📺", title: "Video apps", text: "They suggest shows you might love" },
            { emoji: "📸", title: "Face unlock", text: "Your tablet recognizes YOUR face" },
            { emoji: "🎮", title: "Video games", text: "Smart characters that chase or help you" }
          ]
        },
        {
          type: "try",
          question: {
            q: "Which one is an example of AI?",
            options: ["A wooden spoon", "A video app that learns what shows you like", "A calculator app that solves math step by step", "A pencil"],
            answer: 1,
            explain: "The video app learns from what you watch and makes smart suggestions - that's AI! A spoon, a pencil and a simple calculator don't learn anything."
          }
        },
        {
          type: "challenge",
          title: "Mini Challenge: AI Detective",
          text: "Walk around your home (or think hard!) and find ONE thing that uses AI to help people.",
          task: "Examples: a talking speaker, face unlock, a robot vacuum, a smart TV suggestion.",
          hint: "Ask yourself: does it LEARN or make SMART choices?"
        }
      ],
      quiz: [
        {
          q: "What does AI stand for?",
          options: ["Artificial Intelligence", "Amazing Ideas", "Apple Ice-cream", "Automatic Internet"],
          answer: 0,
          explain: "AI stands for Artificial Intelligence - smart computer programs that can learn!"
        },
        {
          q: "What makes AI different from a normal computer program?",
          options: ["It has a screen", "It can learn from examples and spot patterns", "It is bigger", "It uses more electricity"],
          answer: 1,
          explain: "AI learns from examples and patterns, instead of only following fixed instructions."
        },
        {
          q: "Which of these uses AI to recognize you?",
          options: ["A light switch", "A book", "Face unlock on a tablet", "A shoe"],
          answer: 2,
          explain: "Face unlock uses AI to look at your face and know it's really you!"
        }
      ]
    },
    {
      id: "how-computers-learn",
      title: "How Do Computers Learn?",
      emoji: "📚",
      color: "#8b5cf6",
      tagline: "Practice makes perfect - for robots too!",
      minutes: 5,
      steps: [
        {
          type: "story",
          emoji: "🚲",
          title: "How did YOU learn to ride a bike?",
          text: "You tried, wobbled, fell down, tried again... and got better each time! Computers learn in a similar way - by practicing over and over."
        },
        {
          type: "concept",
          title: "Learning = trying, checking, improving",
          text: "When a computer practices, it checks if it got the right answer. If not, it adjusts itself a tiny bit and tries again. Millions of times!",
          bullets: [
            { ic: "1️⃣", text: "Try: the computer makes a guess" },
            { ic: "2️⃣", text: "Check: was the guess right or wrong?" },
            { ic: "3️⃣", text: "Improve: adjust and try again!" }
          ],
          anim: "pattern"
        },
        {
          type: "examples",
          title: "Practice makes perfect!",
          text: "To learn what a cat looks like, a computer might look at MILLIONS of cat photos.",
          items: [
            { emoji: "🐱", title: "Photo 1", text: "'Hmm, pointy ears, whiskers...'" },
            { emoji: "🐈", title: "Photo 100000", text: "'Getting better at this!'" },
            { emoji: "😺", title: "Photo 5000000", text: "'That's definitely a cat!'" },
            { emoji: "🐶", title: "Careful!", text: "'Wait, this fluffy one is a dog!'" }
          ]
        },
        {
          type: "try",
          question: {
            q: "What happens when a computer guesses wrong during learning?",
            options: ["It adjusts itself slightly and tries again", "It explodes 💥", "It deletes all pictures", "It stops forever"],
            answer: 0,
            explain: "Wrong guesses are how computers learn! Each mistake helps it improve a little bit, just like you falling off a bike helped you balance better."
          }
        },
        {
          type: "challenge",
          title: "Mini Challenge: Be the Teacher",
          text: "Teach a family member to draw a smiley face using ONLY words - no showing!",
          task: "Notice how tricky instructions are? Computers need super clear examples too!",
          hint: "Say things like 'draw a big circle, then two small circles inside...'"
        }
      ],
      quiz: [
        {
          q: "Computers mostly learn by...",
          options: ["Practicing with many examples", "Magic spells", "Sleeping", "Watching TV"],
          answer: 0,
          explain: "Lots and lots of practice with examples - that's the secret!"
        },
        {
          q: "To learn what dogs look like, a computer needs...",
          options: ["A dog toy", "Many dog photos (and some not-dogs!)", "One photo of a dog", "A bone"],
          answer: 1,
          explain: "Many examples - including ones that are NOT dogs - teach it the difference!"
        },
        {
          q: "Put learning in order: Try → ? → Improve",
          options: ["Sleep", "Eat snacks", "Check if the guess was right", "Dance"],
          answer: 2,
          explain: "Try, check the result, then improve. Repeat millions of times!"
        }
      ]
    },
    {
      id: "machine-learning",
      title: "What Is Machine Learning?",
      emoji: "🧠",
      color: "#34c77b",
      tagline: "Teaching machines with examples instead of rules",
      minutes: 6,
      steps: [
        {
          type: "story",
          emoji: "🎓",
          title: "Machine Learning is teaching without exact rules",
          text: "Imagine describing EVERY possible cat to someone who has never seen one. Impossible! Instead, you'd show them lots of cats and say 'these are cats'. That's Machine Learning!"
        },
        {
          type: "concept",
          title: "Rules vs Examples",
          text: "Old-style programming: humans write every rule. Machine Learning: the computer finds the rules by itself, from examples!",
          bullets: [
            { ic: "📜", text: "Rules way: 'If it has whiskers AND pointy ears AND fur, it's a cat'" },
            { ic: "🌈", text: "ML way: show thousands of photos labeled 'cat' or 'not cat'" },
            { ic: "💡", text: "The computer discovers patterns YOU never noticed!" }
          ],
          anim: "think"
        },
        {
          type: "examples",
          title: "Machine Learning is everywhere",
          text: "Whenever software gets BETTER the more you use it, that's machine learning!",
          items: [
            { emoji: "📧", title: "Email filters", text: "Learn to spot junk mail" },
            { emoji: "🎬", title: "Movie apps", text: "Learn your favorite kinds of films" },
            { emoji: "🗺️", title: "Map apps", text: "Learn traffic patterns" },
            { emoji: "🎤", title: "Speech recognition", text: "Learn how words sound" }
          ]
        },
        {
          type: "try",
          question: {
            q: "In machine learning, who finds the patterns?",
            options: ["The computer finds them from examples", "A wizard 🧙", "Nobody", "Only teachers"],
            answer: 0,
            explain: "The computer studies labeled examples and discovers the patterns by itself. Pretty clever, right?"
          }
        },
        {
          type: "challenge",
          title: "Mini Challenge: Fruit Sorter",
          text: "Sort your toys or fruit into two groups WITHOUT saying the group names out loud first.",
          task: "Then ask a grown-up to guess your sorting rule. They're doing machine learning - finding your pattern from examples!",
          hint: "Groups could be: colors, sizes, shapes, soft vs hard..."
        }
      ],
      quiz: [
        {
          q: "Machine Learning means...",
          options: ["Computers learning patterns from examples", "Robots lifting weights 🏋️", "Fixing computers", "Machines reading books"],
          answer: 0,
          explain: "Machine Learning = computers finding patterns in lots of examples."
        },
        {
          q: "Why show a learning computer LOTS of examples?",
          options: ["To bore it", "Because photos are pretty", "So it can spot what all cats have in common", "To fill up the screen"],
          answer: 2,
          explain: "More examples = easier to find what makes a cat a CAT!"
        },
        {
          q: "Which needs Machine Learning instead of simple rules?",
          options: ["Adding 2+2", "Counting to ten", "Recognizing ANY cat photo", "Turning on a lamp"],
          answer: 2,
          explain: "Cats come in too many shapes to write rules for! Learning from examples works much better."
        }
      ]
    },
    {
      id: "ai-images",
      title: "How Do AI Images Work?",
      emoji: "🎨",
      color: "#ff6b9d",
      tagline: "Type words, watch AI paint a picture!",
      minutes: 5,
      steps: [
        {
          type: "story",
          emoji: "🖼️",
          title: "Painting with words!",
          text: "Some AI can create brand-new pictures from just a description - like 'a purple dragon eating ice cream on the moon'. But HOW?"
        },
        {
          type: "concept",
          title: "AI studied millions of images",
          text: "Image AI looked at millions of pictures WITH their descriptions. It learned what things look like and how words connect to shapes and colors.",
          bullets: [
            { ic: "📖", text: "Step 1: Study millions of image + description pairs" },
            { ic: "🌫️", text: "Step 2: Start with random fuzzy noise" },
            { ic: "🖌️", text: "Step 3: Shape the noise into something matching your words!" }
          ],
          anim: "pixels"
        },
        {
          type: "examples",
          title: "From noise to masterpiece",
          text: "Think of it like a cloud-watching game - but in reverse. The AI turns fuzz into pictures bit by bit.",
          items: [
            { emoji: "🌫️", title: "Start", text: "Just fuzzy static noise" },
            { emoji: "🐉", title: "Words matter", text: "'dragon' gives scales and wings" },
            { emoji: "💜", title: "Colors count", text: "'purple' tints everything purple" },
            { emoji: "🌙", title: "Places too!", text: "'on the moon' adds craters and stars" }
          ]
        },
        {
          type: "try",
          question: {
            q: "Where does AI image-making START?",
            options: ["With random noise that gets shaped into a picture", "With paper", "With crayons", "With a camera taking photos"],
            answer: 0,
            explain: "The AI starts from pure fuzz and reshapes it step by step until it matches your description!"
          }
        },
        {
          type: "challenge",
          title: "Mini Challenge: Prompt Artist",
          text: "Write a funny description for an AI artist: pick a WHO, a WHAT and a WHERE.",
          task: "Example: 'a happy octopus baking cookies under the sea'. Say it out loud and imagine the picture!",
          hint: "The clearer your words, the better the imagined picture!"
        }
      ],
      quiz: [
        {
          q: "What do you give an AI image maker so it can create?",
          options: ["A description in words", "Money", "A hug", "A real photo of everything"],
          answer: 0,
          explain: "You describe what you want - like 'cat astronaut' - and the AI paints it!"
        },
        {
          q: "How did the AI learn what dragons look like?",
          options: ["It met a real dragon", "It guessed randomly", "It studied millions of pictures with descriptions", "Someone drew it once"],
          answer: 2,
          explain: "Millions of labeled examples taught it what different things look like."
        },
        {
          q: "Are AI-made pictures copied from one single photo?",
          options: ["Yes, always", "Yes, from your selfie", "No - the AI creates something new from learned patterns", "They come from a printer"],
          answer: 2,
          explain: "The AI mixes everything it learned to create a NEW picture that never existed before!"
        }
      ]
    },
    {
      id: "voice-assistants",
      title: "How Do Voice Assistants Work?",
      emoji: "🎙️",
      color: "#ffc53d",
      tagline: "Talking machines that listen and understand",
      minutes: 5,
      steps: [
        {
          type: "story",
          emoji: "💬",
          title: '"Hey assistant, what\'s the weather?"',
          text: "You talk, and it talks back! Voice assistants like Alexa, Siri and Google Assistant feel like magic - but it's actually three clever steps happening super fast."
        },
        {
          type: "concept",
          title: "Listen → Understand → Answer",
          text: "Every time you speak, three AI jobs happen in less than a second!",
          bullets: [
            { ic: "👂", text: "LISTEN: turn your voice sounds into written words" },
            { ic: "🧠", text: "UNDERSTAND: figure out what you mean" },
            { ic: "🗣️", text: "ANSWER: say or show the response" }
          ],
          anim: "voice"
        },
        {
          type: "examples",
          title: "Try talking to one!",
          text: "With a grown-up's permission, try these:",
          items: [
            { emoji: "🎵", title: "\"Play dinosaur songs\"", text: "It understands MUSIC + DINOSAURS" },
            { emoji: "⏰", title: "\"Set a timer for 10 minutes\"", text: "Great for baking cookies!" },
            { emoji: "😂", title: "\"Tell me a joke\"", text: "Assistants know LOTS of jokes" },
            { emoji: "🌦️", title: "\"Will it rain today?\"", text: "It checks weather info for you" }
          ]
        },
        {
          type: "try",
          question: {
            q: "What is the FIRST thing a voice assistant does with your words?",
            options: ["Tells a joke", "Turns sound waves into written words", "Orders pizza", "Goes to sleep"],
            answer: 1,
            explain: "First it converts the SOUNDS of your voice into TEXT, then it figures out what you mean."
          }
        },
        {
          type: "challenge",
          title: "Mini Challenge: Assistant Designer",
          text: "Design your own voice assistant! What would yours do?",
          task: "Give it a name, a catchphrase, and 3 commands it should understand.",
          hint: "Maybe 'Snack Bot' answers 'what's for dinner?'"
        }
      ],
      quiz: [
        {
          q: "Put a voice assistant's steps in order:",
          options: ["Listen → Understand → Answer", "Understand → Listen → Answer", "Sing → Dance → Listen", "Answer → Listen → Understand"],
          answer: 0,
          explain: "Listen to the sounds, understand the meaning, then answer!"
        },
        {
          q: "How fast does this usually happen?",
          options: ["Ten minutes", "About one second", "One year", "One whole day"],
          answer: 1,
          explain: "All three steps happen in about a second - faster than a blink!"
        },
        {
          q: "Which helps a voice assistant understand you BEST?",
          options: ["Whispering to a wall", "Shouting from another country", "Speaking clearly close to the device", "Being silent"],
          answer: 2,
          explain: "Clear speech near the microphone helps the AI hear every word correctly."
        }
      ]
    },
    {
      id: "robots-ai",
      title: "How Do Robots Use AI?",
      emoji: "🦾",
      color: "#63d3ff",
      tagline: "Robots with sensors, smarts and skills",
      minutes: 5,
      steps: [
        {
          type: "story",
          emoji: "🤖",
          title: "A robot body + an AI brain!",
          text: "A robot is a machine that can MOVE and DO things in the world. Add AI, and it can also sense, decide and learn. Body + Brain = amazing robots!"
        },
        {
          type: "concept",
          title: "Sensors are robot senses",
          text: "Robots use sensors like you use your eyes and ears - they gather information about the world.",
          bullets: [
            { ic: "📷", text: "Cameras = robot eyes" },
            { ic: "🔊", text: "Microphones = robot ears" },
            { ic: "📏", text: "Distance sensors = feeling how far away things are" },
            { ic: "🛞", text: "Motors = robot muscles for moving" }
          ],
          anim: "robot"
        },
        {
          type: "examples",
          title: "Real robots helping right now",
          text: "Robots with AI do helpful and even brave jobs:",
          items: [
            { emoji: "🧹", title: "Vacuum bots", text: "Learn your rooms' layout and clean them" },
            { emoji: "📦", title: "Warehouse bots", text: "Carry heavy boxes all day" },
            { emoji: "🚁", title: "Delivery drones", text: "Fly medicine to faraway places" },
            { emoji: "🌊", title: "Deep-sea bots", text: "Explore where humans can't go!" }
          ]
        },
        {
          type: "try",
          question: {
            q: "A vacuum robot bumps into a chair, backs up, and takes a new path. What did it use?",
            options: ["Its sensors + AI decision making", "Magic", "WiFi only", "Its feelings"],
            answer: 0,
            explain: "Sensors felt the obstacle, and its AI chose a smarter path. Sense → decide → act!"
          }
        },
        {
          type: "challenge",
          title: "Mini Challenge: Be the Robot",
          text: "Blindfold game (with a grown-up watching!): let a family member guide you with ONLY words like 'forward', 'stop', 'turn left'.",
          task: "You're the robot body - they're your AI brain. Swap roles and try guiding them!",
          hint: "Clear commands make good robots AND good programmers!"
        }
      ],
      quiz: [
        {
          q: "What do sensors do for a robot?",
          options: ["Help it sense the world, like eyes and ears", "Make it tasty", "Play music", "Make it heavier"],
          answer: 0,
          explain: "Sensors collect information - cameras see, microphones hear, distance sensors feel objects nearby."
        },
        {
          q: "Body + Brain for a robot means:",
          options: ["Head + hat", "Arms + legs", "Motors & sensors + AI decision making", "Box + lid"],
          answer: 2,
          explain: "Hardware moves and senses, AI decides what to do next!"
        },
        {
          q: "Which robot job is DANGEROUS for humans but great for robots?",
          options: ["Reading bedtime stories", "Petting a puppy", "Exploring deep ocean shipwrecks", "Eating ice cream"],
          answer: 2,
          explain: "Robots explore dangerous places - deep sea, volcanoes, even Mars!"
        }
      ]
    },
    {
      id: "ai-everyday",
      title: "AI in Everyday Life",
      emoji: "🔍",
      color: "#ff9f43",
      tagline: "Spotting the AI hiding in plain sight",
      minutes: 5,
      steps: [
        {
          type: "story",
          emoji: "🕵️",
          title: "AI is everywhere... shhh!",
          text: "AI isn't only robots. It hides inside ordinary things - quietly making them smarter. Once you learn to spot it, you'll see it EVERYWHERE!"
        },
        {
          type: "concept",
          title: "The secret sign of AI",
          text: "Ask yourself: 'Does it learn, predict, recognize, or recommend?' If yes - there's probably AI inside!",
          bullets: [
            { ic: "🗺️", text: "Maps PREDICT the fastest route using learned traffic patterns" },
            { ic: "📱", text: "Keyboards PREDICT your next word" },
            { ic: "🎬", text: "Streaming apps RECOMMEND shows based on what you watched" },
            { ic: "🌐", text: "Translation RECOGNIZES languages and converts them" }
          ],
          anim: "pattern"
        },
        {
          type: "examples",
          title: "Your day with AI",
          text: "Follow Leo through a normal day:",
          items: [
            { emoji: "⏰", title: "Morning", text: "Smart alarm picks the lightest sleep moment" },
            { emoji: "🏫", title: "School", text: "Learning app adapts questions to his level" },
            { emoji: "🍕", title: "Dinner", text: "Oven app suggests cooking time" },
            { emoji: "🎮", title: "Play", text: "Game enemies learn Leo's favorite moves!" }
          ]
        },
        {
          type: "try",
          question: {
            q: "Your keyboard suggests the next word while typing. Is that AI?",
            options: ["Yes! It predicts from millions of sentences it learned from", "No, it's a fairy 🧚", "Only on Tuesdays", "No, it's random"],
            answer: 0,
            explain: "Word prediction is trained on tons of text, so it guesses likely next words - classic AI!"
          }
        },
        {
          type: "challenge",
          title: "Mini Challenge: AI Scavenger Hunt",
          text: "Find FIVE things in your home that use AI. Count them and tell someone WHY each one is smart.",
          task: "Ideas: TV recommendations, voice assistant, face unlock, smartwatch, robot vacuum.",
          hint: "Remember the secret sign: learn, predict, recognize, recommend!"
        }
      ],
      quiz: [
        {
          q: "Which everyday app uses AI to find the fastest way home?",
          options: ["Maps app", "Camera roll", "Calculator", "Flashlight"],
          answer: 0,
          explain: "Maps AI learns traffic patterns to predict the quickest route!"
        },
        {
          q: "What's a quick clue that AI is inside something?",
          options: ["It's blue", "It has buttons", "It learns, predicts, recognizes or recommends", "It's round"],
          answer: 2,
          explain: "Learning, predicting, recognizing and recommending are AI superpowers!"
        },
        {
          q: "Video apps suggest shows you like because...",
          options: ["They read your diary", "They guess randomly", "AI learns from what you watched before", "Your mom tells them"],
          answer: 2,
          explain: "Recommendation AI studies your watching history to suggest new favorites."
        }
      ]
    },
    {
      id: "ai-safety",
      title: "How to Use AI Safely",
      emoji: "🛡️",
      color: "#34c77b",
      tagline: "Be smart, be kind, be safe",
      minutes: 6,
      steps: [
        {
          type: "story",
          emoji: "🦸",
          title: "Superheroes follow safety rules!",
          text: "AI tools are powerful - and superheroes always use powers responsibly. Here's how to be an AI superhero!"
        },
        {
          type: "concept",
          title: "Golden safety rules",
          text: "Keep these rules in your utility belt whenever you use AI:",
          bullets: [
            { ic: "👨‍👩‍👧", text: "Use AI with a grown-up, especially new tools" },
            { ic: "🤫", text: "Never share private info: full name, address, school, passwords" },
            { ic: "🧐", text: "AI can make mistakes - double-check important facts" },
            { ic: "💛", text: "Be kind. Don't use AI to trick, scare or tease anyone" },
            { ic: "🎨", text: "Remember: real people made the art, music and writing AI learned from" }
          ],
          anim: null
        },
        {
          type: "examples",
          title: "Spot the difference!",
          text: "Which info is OK to share with an AI chatbot, and which stays private?",
          items: [
            { emoji: "✅", title: "OK to share", text: "'Tell me a joke about dinosaurs!'" },
            { emoji: "✅", title: "OK to share", text: "'Help me write a poem about space.'" },
            { emoji: "❌", title: "Keep private!", text: "'My name is... I live at...'" },
            { emoji: "❌", title: "Keep private!", text: "'My password is...'" }
          ]
        },
        {
          type: "try",
          question: {
            q: "An AI chatbot asks: 'What's your home address?' What do you do?",
            options: ["Don't share it - tell a grown-up", "Type it right away", "Draw a map", "Share your friend's address instead"],
            answer: 0,
            explain: "Home address is PRIVATE. Never share it online with anyone, and always tell a trusted adult if a website asks."
          }
        },
        {
          type: "challenge",
          title: "Mini Challenge: Safety Poster",
          text: "Draw a safety poster with your top 3 AI rules.",
          task: "Hang it near the computer so the whole family remembers!",
          hint: "Big letters and bright colors make rules easy to remember!"
        }
      ],
      quiz: [
        {
          q: "Which of these should you NEVER share with an AI app?",
          options: ["Your passwords or home address", "Your favorite animal", "A riddle", "A drawing request"],
          answer: 0,
          explain: "Passwords, addresses and other private info stay private. Always!"
        },
        {
          q: "AI gave you a fact for homework. You should...",
          options: ["Trust it blindly", "Never do homework again", "Double-check with another source or a grown-up", "Print it immediately"],
          answer: 2,
          explain: "AI sometimes makes mistakes (that's called 'hallucinating') - smart explorers verify facts!"
        },
        {
          q: "Is it fair to use AI-generated art in a contest for KIDS' drawings?",
          options: ["Yes, always", "Only on weekends", "No - contests are for your own artwork", "Yes, if you add sparkles"],
          answer: 2,
          explain: "Being honest matters. Use AI as a helper and inspiration, but enter YOUR OWN creations!"
        }
      ]
    },
    {
      id: "ai-creativity",
      title: "AI and Creativity",
      emoji: "🎭",
      color: "#ff6b9d",
      tagline: "Your imagination + AI ideas = magic",
      minutes: 5,
      steps: [
        {
          type: "story",
          emoji: "✨",
          title: "Can machines be creative?",
          text: "AI can now compose music, paint pictures, write stories and invent game levels! But here's the secret: AI is like a magical paintbrush - YOU are still the artist."
        },
        {
          type: "concept",
          title: "AI as a creative sidekick",
          text: "AI doesn't have ideas of its own. It mixes patterns it learned. The IDEA comes from you!",
          bullets: [
            { ic: "🎼", text: "Music AI can suggest tunes in any style you choose" },
            { ic: "📖", text: "Story AI can continue YOUR story with wild twists" },
            { ic: "🎨", text: "Art AI paints whatever you imagine and describe" },
            { ic: "🕹️", text: "Game AI can design never-ending new levels" }
          ],
          anim: "pixels"
        },
        {
          type: "examples",
          title: "You direct, AI assists",
          text: "Great creators stay in charge of their vision:",
          items: [
            { emoji: "👩‍🎨", title: "You decide", text: "WHAT to create - a dragon? a song?" },
            { emoji: "🎛️", title: "You guide", text: "HOW it should feel - silly? epic? cozy?" },
            { emoji: "🔁", title: "You refine", text: "'Make it fluffier! More colorful!'" },
            { emoji: "🏆", title: "You finish", text: "YOU choose the final version. It's your art!" }
          ]
        },
        {
          type: "try",
          question: {
            q: "Who is the ARTIST when you carefully direct an AI to make a painting?",
            options: ["YOU - the person with the imagination", "The computer", "Nobody", "The internet"],
            answer: 0,
            explain: "AI is the tool, like a brush. The creativity - the idea and choices - comes from YOU!"
          }
        },
        {
          type: "challenge",
          title: "Mini Challenge: Story Switch",
          text: "Write the first line of a silly story, then ask a family member to continue it. Take turns 3 times each!",
          task: "Congratulations - you just experienced human-AI style collaboration!",
          hint: "Start with: 'One morning, my toast started singing...'"
        }
      ],
      quiz: [
        {
          q: "AI creates music, art and stories by...",
          options: ["Mixing patterns from millions of examples it learned", "Feeling emotions like humans", "Random button mashing only", "Copying one song"],
          answer: 0,
          explain: "AI recombines learned patterns in new ways - no feelings required!"
        },
        {
          q: "What's the most important ingredient in AI-assisted art?",
          options: ["Expensive computer", "Rainbows", "YOUR idea and direction", "Long cables"],
          answer: 2,
          explain: "The imagination and choices come from the human artist - you!"
        },
        {
          q: "AI wrote a story ending you don't like. What do you do?",
          options: ["Give up forever", "Blame the toaster", "Guide it again: change your description and retry", "Delete all computers"],
          answer: 2,
          explain: "Creating is iterative - refine your prompts and try again. Real artists iterate too!"
        }
      ]
    },
    {
      id: "future-of-ai",
      title: "The Future of AI",
      emoji: "🚀",
      color: "#8b5cf6",
      tagline: "Dream big - the future needs YOU",
      minutes: 5,
      steps: [
        {
          type: "story",
          emoji: "🔮",
          title: "The future hasn't been invented yet!",
          text: "Here's an amazing secret: the AI of the future will be built by people who are kids RIGHT NOW. Maybe... by you?"
        },
        {
          type: "concept",
          title: "What might AI do tomorrow?",
          text: "Scientists, doctors and engineers are working on incredible things:",
          bullets: [
            { ic: "🩺", text: "AI helping doctors find sickness early and save lives" },
            { ic: "🌍", text: "Translating every language instantly, connecting the world" },
            { ic: "🌾", text: "Smart farms that grow food using less water" },
            { ic: "🪐", text: "Robot explorers discovering Mars and deep oceans" },
            { ic: "♻️", text: "Cleaning oceans and sorting recycling automatically" }
          ],
          anim: "robot"
        },
        {
          type: "examples",
          title: "Future jobs need future skills",
          text: "You're already building them:",
          items: [
            { emoji: "🧠", title: "Curiosity", text: "Asking 'how does that work?'" },
            { emoji: "🎨", title: "Creativity", text: "Imagining new solutions" },
            { emoji: "💛", title: "Kindness", text: "Using tech to HELP people" },
            { emoji: "🧩", title: "Problem solving", text: "Not giving up on puzzles" }
          ]
        },
        {
          type: "try",
          question: {
            q: "Who will build the amazing AI of the future?",
            options: ["People who are curious and keep learning - maybe YOU", "Only geniuses in white coats", "Aliens 👽", "Only adults over 50"],
            answer: 0,
            explain: "Today's kids become tomorrow's inventors. Every expert started exactly where you are now!"
          }
        },
        {
          type: "challenge",
          title: "Final Challenge: Future Inventor Promise",
          text: "Imagine ONE problem AI could solve when you grow up.",
          task: "Draw it, describe it to someone, and keep your invention safe - the world might need it someday!",
          hint: "Big problems welcome: pollution, loneliness, boring vegetables..."
        }
      ],
      quiz: [
        {
          q: "Which is a REAL way AI may help doctors in the future?",
          options: ["Replacing hugs", "Making medicine taste bad", "Spotting diseases early in scans", "Doing homework for doctors"],
          answer: 2,
          explain: "AI is great at spotting tiny patterns in X-rays and scans, catching sickness early!"
        },
        {
          q: "What skills prepare kids for an AI future?",
          options: ["Curiosity, creativity, kindness, problem solving", "Sleeping late", "Memorizing everything", "Avoiding technology"],
          answer: 0,
          explain: "These human skills + AI knowledge = a powerful future inventor!"
        },
        {
          q: "The best reason to learn about AI is...",
          options: ["Robots might take over otherwise 😱", "To impress your goldfish", "To understand and shape technology that helps everyone", "Because it's on a test"],
          answer: 2,
          explain: "Understanding AI lets you use it wisely, safely, and to make the world better!"
        }
      ]
    }
  ];

  var FUN_FACTS = [
    "🤖 The word 'robot' comes from 'robota', meaning 'work' in Czech!",
    "🧠 AI can learn to spot cats after seeing more photos than you could look at in 10 years!",
    "🎮 Some game characters use AI to learn YOUR playing style!",
    "🚀 AI helped scientists take the first picture of a black hole!",
    "🗣️ Voice assistants process your words in about one second!",
    "🎨 AI once painted a portrait that sold for $432,500!",
    "🐕 The FIRST computer 'learner' was trained in the 1950s to play checkers!",
    "🌍 AI helps translate over 100 languages instantly!"
  ];

  LearnAI.DATA = {
    LESSONS: LESSONS,
    getLesson: function (id) {
      for (var i = 0; i < LESSONS.length; i++) if (LESSONS[i].id === id) return LESSONS[i];
      return null;
    },
    FUN_FACTS: FUN_FACTS
  };
})();
