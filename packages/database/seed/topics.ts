type VocabItem = {
  word: string
  definition: string
  phonetic?: string
  synonyms: string[]
  examples: string[]
  difficulty: number
  importance: number
}

type TopicSeed = {
  categorySlug: string
  title: string
  slug: string
  explanation: string
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
  discussionQs: string[]
  vocabularyList: VocabItem[]
}

// We need to resolve categoryId at runtime
// The seed script will handle this
export const topicsRaw: (Omit<TopicSeed, 'categorySlug'> & { categorySlug: string })[] = [
  // ─── DAILY CONVERSATION ───────────────────────────────────────────────────
  {
    categorySlug: 'daily-conversation',
    title: 'Family Relationships',
    slug: 'family-relationships',
    explanation:
      'Family is the foundation of our social life. It includes parents, siblings, grandparents, and extended members. Understanding family dynamics helps us communicate better in daily conversations about personal life, responsibilities, and relationships.',
    level: 'A2',
    discussionQs: [
      'Can you describe your family?',
      'What do you usually do together as a family?',
      'How important is family in your culture?',
      'What values did your family teach you?',
    ],
    vocabularyList: [
      { word: 'Sibling', definition: 'A brother or sister', phonetic: '/ˈsɪblɪŋ/', synonyms: ['brother', 'sister'], examples: ['I have two siblings — an older brother and a younger sister.'], difficulty: 1, importance: 2 },
      { word: 'Relatives', definition: 'Members of your extended family', phonetic: '/ˈrɛlətɪvz/', synonyms: ['family members', 'kin', 'relations'], examples: ['We visit our relatives every Eid holiday.'], difficulty: 1, importance: 2 },
      { word: 'Household', definition: 'All people living together in one home', phonetic: '/ˈhaʊshəʊld/', synonyms: ['home', 'family unit', 'domestic unit'], examples: ['Our household has five members.'], difficulty: 2, importance: 3 },
      { word: 'Upbringing', definition: 'The way a child is raised and educated', phonetic: '/ˈʌpbrɪŋɪŋ/', synonyms: ['childhood', 'rearing', 'nurturing'], examples: ['Her strong upbringing made her very disciplined.'], difficulty: 3, importance: 2 },
      { word: 'Bond', definition: 'A close connection between people', phonetic: '/bɒnd/', synonyms: ['connection', 'tie', 'relationship'], examples: ['The bond between twins is often very strong.'], difficulty: 2, importance: 3 },
    ],
  },
  {
    categorySlug: 'daily-conversation',
    title: 'Hobbies and Free Time',
    slug: 'hobbies-free-time',
    explanation:
      'Hobbies are activities we enjoy during our free time. They help us relax, develop new skills, and connect with others who share similar interests. Talking about hobbies is a great way to start conversations and build friendships.',
    level: 'A2',
    discussionQs: [
      'What are your favorite hobbies?',
      'How did you develop your main hobby?',
      'Do you prefer indoor or outdoor hobbies? Why?',
      'Can a hobby become a career? Give an example.',
    ],
    vocabularyList: [
      { word: 'Pastime', definition: 'An activity done for enjoyment in free time', phonetic: '/ˈpɑːstaɪm/', synonyms: ['hobby', 'leisure activity', 'recreation'], examples: ['Reading is my favorite pastime on weekends.'], difficulty: 2, importance: 3 },
      { word: 'Leisure', definition: 'Free time when you can relax', phonetic: '/ˈleʒə/', synonyms: ['free time', 'downtime', 'relaxation'], examples: ['How do you spend your leisure time?'], difficulty: 2, importance: 2 },
      { word: 'Enthusiast', definition: 'A person who is very interested in something', phonetic: '/ɪnˈθjuːziæst/', synonyms: ['fan', 'devotee', 'aficionado'], examples: ['He is a fitness enthusiast who goes to the gym every day.'], difficulty: 3, importance: 2 },
      { word: 'Pursue', definition: 'To follow or work toward something', phonetic: '/pəˈsjuː/', synonyms: ['follow', 'chase', 'seek'], examples: ['She decided to pursue photography as a career.'], difficulty: 2, importance: 2 },
      { word: 'Dedication', definition: 'Strong commitment to something', phonetic: '/ˌdɛdɪˈkeɪʃən/', synonyms: ['commitment', 'devotion', 'passion'], examples: ['His dedication to painting is truly inspiring.'], difficulty: 3, importance: 2 },
    ],
  },
  {
    categorySlug: 'daily-conversation',
    title: 'Traveling and Holidays',
    slug: 'traveling-holidays',
    explanation:
      'Travel broadens our perspective and exposes us to new cultures, foods, and ways of living. Whether it is a short trip or a long journey abroad, travel creates unforgettable memories and helps us grow as individuals.',
    level: 'B1',
    discussionQs: [
      'What is the best place you have ever traveled to?',
      'Do you prefer solo travel or group travel? Why?',
      'What do you always pack when traveling?',
      'How has travel changed your perspective on life?',
    ],
    vocabularyList: [
      { word: 'Itinerary', definition: 'A detailed plan or schedule for a trip', phonetic: '/aɪˈtɪnərəri/', synonyms: ['schedule', 'travel plan', 'agenda'], examples: ['Our tour guide handed out a detailed itinerary for the five-day trip.'], difficulty: 3, importance: 3 },
      { word: 'Destination', definition: 'The place you are traveling to', phonetic: '/ˌdɛstɪˈneɪʃən/', synonyms: ['location', 'endpoint', 'place'], examples: ['Bali is a popular travel destination for tourists worldwide.'], difficulty: 2, importance: 3 },
      { word: 'Accommodation', definition: 'A place to stay when traveling', phonetic: '/əˌkɒməˈdeɪʃən/', synonyms: ['lodging', 'housing', 'shelter'], examples: ['We booked accommodation in a boutique hotel near the beach.'], difficulty: 3, importance: 2 },
      { word: 'Explore', definition: 'To travel through an unfamiliar area', phonetic: '/ɪkˈsplɔː/', synonyms: ['discover', 'venture', 'investigate'], examples: ['We spent the whole day exploring the local markets.'], difficulty: 1, importance: 2 },
      { word: 'Souvenir', definition: 'A small item bought as a memory of a place', phonetic: '/ˌsuːvəˈnɪə/', synonyms: ['memento', 'keepsake', 'reminder'], examples: ['I always buy souvenirs for my family when I travel.'], difficulty: 2, importance: 1 },
    ],
  },

  // ─── TECHNOLOGY ──────────────────────────────────────────────────────────
  {
    categorySlug: 'technology',
    title: 'Artificial Intelligence',
    slug: 'artificial-intelligence',
    explanation:
      'Artificial Intelligence (AI) refers to computer systems that can perform tasks that normally require human intelligence, such as recognizing speech, making decisions, and translating languages. AI is rapidly changing industries from healthcare to education and beyond.',
    level: 'B2',
    discussionQs: [
      'What is artificial intelligence in your own words?',
      'How is AI already being used in your daily life?',
      'What are the potential risks of AI?',
      'Do you think AI will replace human jobs? Why?',
    ],
    vocabularyList: [
      { word: 'Algorithm', definition: 'A set of rules for solving a problem or task', phonetic: '/ˈælɡərɪðəm/', synonyms: ['procedure', 'formula', 'method'], examples: ['The recommendation algorithm suggests videos based on your history.'], difficulty: 3, importance: 3 },
      { word: 'Machine Learning', definition: 'AI that learns from data without being programmed', phonetic: '', synonyms: ['ML', 'statistical learning'], examples: ['Netflix uses machine learning to recommend shows you might like.'], difficulty: 4, importance: 3 },
      { word: 'Neural Network', definition: 'An AI system modeled after the human brain', phonetic: '', synonyms: ['artificial neural network', 'deep network'], examples: ['The neural network was trained on millions of images.'], difficulty: 4, importance: 2 },
      { word: 'Automation', definition: 'Using machines or software to do tasks automatically', phonetic: '/ˌɔːtəˈmeɪʃən/', synonyms: ['mechanization', 'robotization', 'computerization'], examples: ['Automation is replacing repetitive jobs in manufacturing.'], difficulty: 3, importance: 3 },
      { word: 'Dataset', definition: 'A collection of data used to train AI', phonetic: '', synonyms: ['data collection', 'training data', 'corpus'], examples: ['The AI model was trained on a dataset of 1 million sentences.'], difficulty: 3, importance: 2 },
      { word: 'Inference', definition: 'The process of using a trained model to make predictions', phonetic: '/ˈɪnfərəns/', synonyms: ['prediction', 'deduction', 'reasoning'], examples: ['During inference, the model processes your input and generates a response.'], difficulty: 4, importance: 2 },
    ],
  },
  {
    categorySlug: 'technology',
    title: 'Cybersecurity',
    slug: 'cybersecurity',
    explanation:
      'Cybersecurity is the practice of protecting computers, servers, networks, and data from digital attacks. As more of our lives move online, understanding basic cybersecurity principles has become essential for everyone.',
    level: 'B2',
    discussionQs: [
      'Have you ever experienced a cybersecurity threat?',
      'What are the most common types of cyber attacks?',
      'How do you protect your personal data online?',
      'Why is cybersecurity increasingly important today?',
    ],
    vocabularyList: [
      { word: 'Encryption', definition: 'Converting data into a code to prevent unauthorized access', phonetic: '/ɪnˈkrɪpʃən/', synonyms: ['encoding', 'ciphering', 'scrambling'], examples: ['End-to-end encryption keeps your messages private.'], difficulty: 4, importance: 3 },
      { word: 'Phishing', definition: 'A fraudulent attempt to steal information via fake messages', phonetic: '/ˈfɪʃɪŋ/', synonyms: ['scam', 'fraud', 'deception'], examples: ['The phishing email pretended to be from my bank.'], difficulty: 3, importance: 3 },
      { word: 'Firewall', definition: 'A security system that monitors network traffic', phonetic: '/ˈfaɪəwɔːl/', synonyms: ['barrier', 'security filter', 'network barrier'], examples: ['The firewall blocked unauthorized access to the server.'], difficulty: 3, importance: 2 },
      { word: 'Vulnerability', definition: 'A weakness that can be exploited by attackers', phonetic: '/ˌvʌlnərəˈbɪlɪti/', synonyms: ['weakness', 'flaw', 'security gap'], examples: ['The security team found a critical vulnerability in the software.'], difficulty: 4, importance: 3 },
      { word: 'Authentication', definition: 'Verifying the identity of a user', phonetic: '/ɔːˌθɛntɪˈkeɪʃən/', synonyms: ['verification', 'validation', 'identity check'], examples: ['Two-factor authentication adds an extra layer of security.'], difficulty: 4, importance: 3 },
    ],
  },
  {
    categorySlug: 'technology',
    title: 'Web Development',
    slug: 'web-development',
    explanation:
      'Web development is the process of building and maintaining websites and web applications. It involves frontend development (what users see) and backend development (server logic and databases). It is one of the most in-demand tech skills today.',
    level: 'B1',
    discussionQs: [
      'What is the difference between frontend and backend development?',
      'Why do you think web development is important?',
      'What technologies would you use to build a website?',
      'How has web development changed in recent years?',
    ],
    vocabularyList: [
      { word: 'Framework', definition: 'A pre-built structure for developing software', phonetic: '/ˈfreɪmwɜːk/', synonyms: ['platform', 'structure', 'toolkit'], examples: ['React is a popular JavaScript framework for building UIs.'], difficulty: 3, importance: 3 },
      { word: 'API', definition: 'Interface that allows apps to communicate', phonetic: '', synonyms: ['interface', 'endpoint', 'service'], examples: ['The app uses an API to fetch weather data.'], difficulty: 3, importance: 3 },
      { word: 'Repository', definition: 'A storage location for code and files', phonetic: '/rɪˈpɒzɪtri/', synonyms: ['repo', 'codebase', 'storage'], examples: ['I pushed my code to the GitHub repository.'], difficulty: 3, importance: 2 },
      { word: 'Deployment', definition: 'Releasing software to a server for public use', phonetic: '/dɪˈplɔɪmənt/', synonyms: ['release', 'launch', 'publishing'], examples: ['After testing, we did a deployment to production.'], difficulty: 3, importance: 2 },
      { word: 'Responsive', definition: 'Design that works well on all screen sizes', phonetic: '/rɪˈspɒnsɪv/', synonyms: ['adaptive', 'flexible', 'mobile-friendly'], examples: ['A responsive website looks good on both mobile and desktop.'], difficulty: 2, importance: 2 },
    ],
  },

  // ─── BUSINESS ─────────────────────────────────────────────────────────────
  {
    categorySlug: 'business',
    title: 'Startup Culture',
    slug: 'startup-culture',
    explanation:
      'A startup is a young company founded to develop a unique product or service. Startup culture is characterized by innovation, risk-taking, flat hierarchies, and rapid growth. Understanding startup culture is essential for entrepreneurs and modern professionals.',
    level: 'B2',
    discussionQs: [
      'What makes a startup different from a regular company?',
      'What qualities does a successful entrepreneur need?',
      'Would you ever start your own company? Why?',
      'What is the biggest challenge startups face?',
    ],
    vocabularyList: [
      { word: 'Entrepreneur', definition: 'A person who starts and runs a business', phonetic: '/ˌɒntrəprəˈnɜːr/', synonyms: ['founder', 'business owner', 'innovator'], examples: ['Elon Musk is one of the most recognized entrepreneurs in the world.'], difficulty: 4, importance: 3 },
      { word: 'Venture Capital', definition: 'Money invested in early-stage startups', phonetic: '', synonyms: ['VC funding', 'investment capital', 'risk capital'], examples: ['The startup raised $5 million in venture capital.'], difficulty: 4, importance: 2 },
      { word: 'Scalable', definition: 'Able to grow without increasing costs proportionally', phonetic: '/ˈskeɪləbl/', synonyms: ['expandable', 'growable', 'flexible'], examples: ['A software product is more scalable than a physical one.'], difficulty: 3, importance: 3 },
      { word: 'Pivot', definition: 'Changing business direction based on feedback', phonetic: '/ˈpɪvɪt/', synonyms: ['shift', 'change direction', 'redirect'], examples: ['The startup pivoted from B2C to B2B after early failures.'], difficulty: 3, importance: 2 },
      { word: 'Disruption', definition: 'Fundamentally changing an existing industry', phonetic: '/dɪsˈrʌpʃən/', synonyms: ['transformation', 'revolution', 'upheaval'], examples: ['Uber caused major disruption in the taxi industry.'], difficulty: 4, importance: 3 },
    ],
  },
  {
    categorySlug: 'business',
    title: 'Leadership and Management',
    slug: 'leadership-management',
    explanation:
      'Leadership is the ability to guide, inspire, and influence others toward achieving a shared goal. Good leadership involves emotional intelligence, clear communication, and the ability to make difficult decisions. It is a skill that can be learned and developed.',
    level: 'C1',
    discussionQs: [
      'What qualities make someone a great leader?',
      'Have you ever been in a leadership position? What did you learn?',
      'What is the difference between a leader and a manager?',
      'Can leadership be taught, or is it natural?',
    ],
    vocabularyList: [
      { word: 'Delegation', definition: 'Assigning tasks to team members', phonetic: '/ˌdɛlɪˈɡeɪʃən/', synonyms: ['assignment', 'distribution', 'entrusting'], examples: ['Effective delegation allows leaders to focus on strategy.'], difficulty: 3, importance: 3 },
      { word: 'Accountability', definition: 'Being responsible for one\'s actions and results', phonetic: '/əˌkaʊntəˈbɪlɪti/', synonyms: ['responsibility', 'answerability', 'ownership'], examples: ['Good leaders take accountability for their team\'s failures.'], difficulty: 4, importance: 3 },
      { word: 'Empathy', definition: 'Understanding and sharing others\' feelings', phonetic: '/ˈɛmpəθi/', synonyms: ['compassion', 'understanding', 'sensitivity'], examples: ['Empathy is one of the most important leadership qualities.'], difficulty: 3, importance: 3 },
      { word: 'Vision', definition: 'A long-term plan or goal for the future', phonetic: '/ˈvɪʒən/', synonyms: ['goal', 'direction', 'aspiration'], examples: ['The CEO shared her vision for the company over the next decade.'], difficulty: 2, importance: 2 },
      { word: 'Collaboration', definition: 'Working together to achieve a common goal', phonetic: '/kəˌlæbəˈreɪʃən/', synonyms: ['teamwork', 'cooperation', 'partnership'], examples: ['Collaboration between departments led to a successful product launch.'], difficulty: 3, importance: 3 },
    ],
  },

  // ─── PSYCHOLOGY ───────────────────────────────────────────────────────────
  {
    categorySlug: 'psychology',
    title: 'The Compromise Effect',
    slug: 'compromise-effect',
    explanation:
      'The Compromise Effect is a cognitive bias where people tend to choose the middle option when presented with choices of varying extremes. It occurs because the middle option feels safe and reasonable. This phenomenon is widely used in marketing and pricing strategies.',
    level: 'C1',
    discussionQs: [
      'What is the compromise effect in your own words?',
      'Have you ever chosen the middle option in a purchase? Why?',
      'Can you give a real-life example of the compromise effect?',
      'How do businesses use this effect to influence buyers?',
    ],
    vocabularyList: [
      { word: 'Consumer', definition: 'A person who buys goods or services', phonetic: '/kənˈsjuːmər/', synonyms: ['buyer', 'customer', 'purchaser'], examples: ['Consumers often choose the middle-priced product.'], difficulty: 2, importance: 3 },
      { word: 'Decision', definition: 'A choice made after considering options', phonetic: '/dɪˈsɪʒən/', synonyms: ['choice', 'resolution', 'conclusion'], examples: ['The decision to buy was influenced by the pricing strategy.'], difficulty: 1, importance: 2 },
      { word: 'Preference', definition: 'A greater liking for one thing over another', phonetic: '/ˈprɛfrəns/', synonyms: ['choice', 'inclination', 'liking'], examples: ['People\'s preferences shift when more options are added.'], difficulty: 3, importance: 3 },
      { word: 'Cognitive Bias', definition: 'A systematic error in thinking that affects decisions', phonetic: '', synonyms: ['mental bias', 'thinking error', 'heuristic'], examples: ['The compromise effect is a common cognitive bias in shopping.'], difficulty: 4, importance: 3 },
      { word: 'Alternative', definition: 'Another possible option or choice', phonetic: '/ɔːlˈtɜːnətɪv/', synonyms: ['option', 'choice', 'substitute'], examples: ['When given three alternatives, most people pick the middle one.'], difficulty: 2, importance: 2 },
    ],
  },
  {
    categorySlug: 'psychology',
    title: 'Confirmation Bias',
    slug: 'confirmation-bias',
    explanation:
      'Confirmation bias is the tendency to search for, interpret, and remember information in a way that confirms our existing beliefs. It is one of the most pervasive biases in human thinking and contributes to misinformation, polarization, and poor decision-making.',
    level: 'C1',
    discussionQs: [
      'What is confirmation bias and how does it work?',
      'Have you ever caught yourself using confirmation bias?',
      'How does social media reinforce confirmation bias?',
      'What can we do to reduce confirmation bias in our thinking?',
    ],
    vocabularyList: [
      { word: 'Bias', definition: 'Unfair preference for one thing over another', phonetic: '/ˈbaɪəs/', synonyms: ['prejudice', 'tendency', 'partiality'], examples: ['Confirmation bias affects how we interpret news.'], difficulty: 3, importance: 3 },
      { word: 'Echo Chamber', definition: 'An environment where beliefs are amplified and reinforced', phonetic: '', synonyms: ['bubble', 'closed loop', 'filter bubble'], examples: ['Social media algorithms create echo chambers.'], difficulty: 4, importance: 3 },
      { word: 'Perception', definition: 'The way we understand or interpret something', phonetic: '/pəˈsɛpʃən/', synonyms: ['interpretation', 'view', 'understanding'], examples: ['Our perception of events is shaped by our beliefs.'], difficulty: 3, importance: 2 },
      { word: 'Objective', definition: 'Not influenced by personal feelings or opinions', phonetic: '/əbˈdʒɛktɪv/', synonyms: ['unbiased', 'neutral', 'impartial'], examples: ['It is hard to be objective when you have strong opinions.'], difficulty: 3, importance: 2 },
      { word: 'Misinformation', definition: 'False information spread unintentionally', phonetic: '/ˌmɪsɪnfəˈmeɪʃən/', synonyms: ['false information', 'inaccuracy', 'falsehood'], examples: ['Confirmation bias makes people more likely to share misinformation.'], difficulty: 4, importance: 3 },
    ],
  },
  {
    categorySlug: 'psychology',
    title: 'Motivation and Habit Formation',
    slug: 'motivation-habit-formation',
    explanation:
      'Motivation is the internal drive that pushes us to act. Habits are automatic behaviors formed through repetition. Understanding the psychology of motivation and habits can help us build positive routines, break bad patterns, and achieve long-term goals.',
    level: 'B2',
    discussionQs: [
      'What motivates you most in your daily life?',
      'How do you build a new habit and stick to it?',
      'What is the difference between intrinsic and extrinsic motivation?',
      'Can you describe a habit you successfully built or broke?',
    ],
    vocabularyList: [
      { word: 'Intrinsic Motivation', definition: 'Drive that comes from within, not external rewards', phonetic: '', synonyms: ['internal drive', 'self-motivation'], examples: ['She studies English out of intrinsic motivation — she genuinely loves the language.'], difficulty: 4, importance: 3 },
      { word: 'Habit Loop', definition: 'Cue → Routine → Reward cycle of habit formation', phonetic: '', synonyms: ['behavioral cycle', 'habit cycle'], examples: ['Understanding the habit loop helps you modify behavior.'], difficulty: 4, importance: 3 },
      { word: 'Discipline', definition: 'Self-control and consistent effort', phonetic: '/ˈdɪsɪplɪn/', synonyms: ['self-control', 'willpower', 'consistency'], examples: ['Success in language learning requires daily discipline.'], difficulty: 2, importance: 3 },
      { word: 'Consistency', definition: 'Doing something regularly without stopping', phonetic: '/kənˈsɪstənsi/', synonyms: ['regularity', 'persistence', 'steadiness'], examples: ['Consistency is more important than intensity when building habits.'], difficulty: 3, importance: 3 },
      { word: 'Trigger', definition: 'A cue that starts a behavior or reaction', phonetic: '/ˈtrɪɡər/', synonyms: ['cue', 'stimulus', 'prompt'], examples: ['Seeing my running shoes is a trigger that makes me want to exercise.'], difficulty: 2, importance: 2 },
    ],
  },

  // ─── HEALTH ───────────────────────────────────────────────────────────────
  {
    categorySlug: 'health',
    title: 'Mental Health Awareness',
    slug: 'mental-health-awareness',
    explanation:
      'Mental health refers to our emotional, psychological, and social well-being. It affects how we think, feel, and act. Mental health is just as important as physical health, yet it is often overlooked. Increasing awareness helps reduce stigma and encourages people to seek help.',
    level: 'B2',
    discussionQs: [
      'How would you define mental health?',
      'What are the signs that someone may be struggling mentally?',
      'How can we support a friend going through a difficult time?',
      'Why is mental health often stigmatized in society?',
    ],
    vocabularyList: [
      { word: 'Anxiety', definition: 'A feeling of worry, nervousness, or unease', phonetic: '/æŋˈzaɪəti/', synonyms: ['worry', 'stress', 'nervousness'], examples: ['Many students experience anxiety before exams.'], difficulty: 2, importance: 3 },
      { word: 'Stigma', definition: 'Negative attitudes or discrimination toward a group', phonetic: '/ˈstɪɡmə/', synonyms: ['prejudice', 'shame', 'discrimination'], examples: ['Mental health stigma prevents many from seeking help.'], difficulty: 4, importance: 3 },
      { word: 'Resilience', definition: 'The ability to recover from difficulties', phonetic: '/rɪˈzɪliəns/', synonyms: ['toughness', 'recovery', 'adaptability'], examples: ['Building resilience helps us cope with life\'s challenges.'], difficulty: 4, importance: 3 },
      { word: 'Mindfulness', definition: 'Being fully present and aware in the current moment', phonetic: '/ˈmaɪndfʊlnəs/', synonyms: ['awareness', 'presence', 'meditation'], examples: ['Mindfulness practice can reduce stress significantly.'], difficulty: 3, importance: 2 },
      { word: 'Coping Mechanism', definition: 'A strategy used to deal with stress or difficulty', phonetic: '', synonyms: ['coping strategy', 'stress management', 'defense mechanism'], examples: ['Exercise is a healthy coping mechanism for anxiety.'], difficulty: 4, importance: 3 },
    ],
  },
  {
    categorySlug: 'health',
    title: 'Nutrition and Healthy Eating',
    slug: 'nutrition-healthy-eating',
    explanation:
      'Nutrition is the study of how food affects the body. Eating a balanced diet provides essential nutrients including proteins, carbohydrates, fats, vitamins, and minerals. Good nutrition is the foundation of physical health, energy, and disease prevention.',
    level: 'B1',
    discussionQs: [
      'What does a balanced diet look like to you?',
      'How do eating habits affect overall health?',
      'What is the biggest nutrition challenge people face today?',
      'Do you think fast food should be restricted? Why?',
    ],
    vocabularyList: [
      { word: 'Nutrient', definition: 'A substance that provides nourishment essential for growth', phonetic: '/ˈnjuːtriənt/', synonyms: ['nourishment', 'vitamin', 'mineral'], examples: ['Fruits and vegetables are rich in essential nutrients.'], difficulty: 2, importance: 3 },
      { word: 'Metabolism', definition: 'The process by which the body converts food into energy', phonetic: '/məˈtæbəlɪzəm/', synonyms: ['energy conversion', 'body chemistry'], examples: ['A fast metabolism helps burn calories more efficiently.'], difficulty: 4, importance: 2 },
      { word: 'Calorie', definition: 'A unit measuring energy in food', phonetic: '/ˈkæləri/', synonyms: ['energy unit', 'kcal'], examples: ['An average adult needs about 2000 calories per day.'], difficulty: 2, importance: 3 },
      { word: 'Protein', definition: 'A nutrient essential for building and repairing tissues', phonetic: '/ˈprəʊtiːn/', synonyms: ['amino acids', 'macronutrient'], examples: ['Eggs and chicken are excellent sources of protein.'], difficulty: 1, importance: 3 },
      { word: 'Deficiency', definition: 'A lack of essential nutrients in the body', phonetic: '/dɪˈfɪʃənsi/', synonyms: ['shortage', 'insufficiency', 'lack'], examples: ['Vitamin D deficiency is common in countries with little sunlight.'], difficulty: 3, importance: 2 },
    ],
  },

  // ─── SCIENCE ──────────────────────────────────────────────────────────────
  {
    categorySlug: 'science',
    title: 'Climate Science',
    slug: 'climate-science',
    explanation:
      'Climate science studies long-term weather patterns and changes in Earth\'s atmosphere. Scientists have found strong evidence that human activities — mainly burning fossil fuels — are causing global warming, which leads to rising sea levels, extreme weather, and ecosystem disruption.',
    level: 'C1',
    discussionQs: [
      'What do you understand about climate change?',
      'What is the most serious consequence of climate change?',
      'What can individuals do to reduce their carbon footprint?',
      'Do you think governments are doing enough to address climate change?',
    ],
    vocabularyList: [
      { word: 'Greenhouse Gas', definition: 'A gas that traps heat in Earth\'s atmosphere', phonetic: '', synonyms: ['carbon emission', 'GHG'], examples: ['CO2 is the most significant greenhouse gas from human activity.'], difficulty: 3, importance: 3 },
      { word: 'Carbon Footprint', definition: 'Total amount of carbon emissions one causes', phonetic: '', synonyms: ['emissions', 'carbon impact', 'environmental impact'], examples: ['Flying has a high carbon footprint compared to taking the train.'], difficulty: 3, importance: 3 },
      { word: 'Sustainable', definition: 'Able to be maintained without harming the environment', phonetic: '/səˈsteɪnəbl/', synonyms: ['eco-friendly', 'green', 'renewable'], examples: ['We need to shift to sustainable energy sources.'], difficulty: 3, importance: 3 },
      { word: 'Biodiversity', definition: 'The variety of life in a habitat or ecosystem', phonetic: '/ˌbaɪəʊdaɪˈvɜːsɪti/', synonyms: ['ecological variety', 'species richness'], examples: ['Deforestation threatens biodiversity in rainforests.'], difficulty: 4, importance: 2 },
      { word: 'Renewable Energy', definition: 'Energy from sources that naturally replenish', phonetic: '', synonyms: ['clean energy', 'green energy', 'sustainable energy'], examples: ['Solar and wind power are the fastest growing renewable energy sources.'], difficulty: 3, importance: 3 },
    ],
  },

  // ─── ENVIRONMENT ──────────────────────────────────────────────────────────
  {
    categorySlug: 'environment',
    title: 'Climate Change and Global Warming',
    slug: 'climate-change-global-warming',
    explanation:
      'Climate change refers to long-term shifts in global temperatures and weather patterns. While natural factors play a role, scientific consensus shows that human activities — particularly burning fossil fuels — are the primary driver. The consequences include rising sea levels, extreme weather events, and threats to ecosystems.',
    level: 'B2',
    discussionQs: [
      'What causes climate change?',
      'How is climate change already affecting the world?',
      'What can be done to slow global warming?',
      'Is it too late to prevent the worst effects of climate change?',
    ],
    vocabularyList: [
      { word: 'Emissions', definition: 'Substances released into the air, especially pollutants', phonetic: '/ɪˈmɪʃənz/', synonyms: ['discharge', 'pollutants', 'release'], examples: ['The government set targets to reduce carbon emissions by 50%.'], difficulty: 3, importance: 3 },
      { word: 'Fossil Fuels', definition: 'Non-renewable fuels formed from organic remains', phonetic: '', synonyms: ['coal', 'oil', 'natural gas'], examples: ['Burning fossil fuels releases CO2 into the atmosphere.'], difficulty: 2, importance: 3 },
      { word: 'Deforestation', definition: 'The large-scale removal of forests', phonetic: '/diːˌfɒrɪˈsteɪʃən/', synonyms: ['logging', 'land clearing', 'tree cutting'], examples: ['Deforestation in the Amazon has accelerated in recent years.'], difficulty: 4, importance: 3 },
      { word: 'Net Zero', definition: 'Balancing carbon emissions with carbon removal', phonetic: '', synonyms: ['carbon neutral', 'zero emissions'], examples: ['Many countries have pledged to reach net zero by 2050.'], difficulty: 3, importance: 2 },
      { word: 'Adaptation', definition: 'Adjusting to new conditions or changes', phonetic: '/ˌædæpˈteɪʃən/', synonyms: ['adjustment', 'modification', 'acclimatization'], examples: ['Coastal cities are building sea walls as climate adaptation measures.'], difficulty: 3, importance: 2 },
    ],
  },

  // ─── EDUCATION ────────────────────────────────────────────────────────────
  {
    categorySlug: 'education',
    title: 'The Future of Education',
    slug: 'future-of-education',
    explanation:
      'Education is rapidly changing due to technology, remote learning, and new pedagogical approaches. The COVID-19 pandemic accelerated the adoption of online learning, while AI tools are beginning to personalize education. The future of education will likely blend traditional and digital methods.',
    level: 'B2',
    discussionQs: [
      'How has education changed in recent years?',
      'What are the advantages and disadvantages of online learning?',
      'Will AI replace teachers in the future?',
      'What skills should education focus on in the 21st century?',
    ],
    vocabularyList: [
      { word: 'Pedagogy', definition: 'The method and practice of teaching', phonetic: '/ˈpɛdəɡɒdʒi/', synonyms: ['teaching method', 'instruction', 'curriculum'], examples: ['Modern pedagogy emphasizes critical thinking over memorization.'], difficulty: 5, importance: 2 },
      { word: 'Curriculum', definition: 'The subjects and content taught in a course', phonetic: '/kəˈrɪkjʊləm/', synonyms: ['syllabus', 'course content', 'program'], examples: ['The school updated its curriculum to include coding.'], difficulty: 4, importance: 3 },
      { word: 'Critical Thinking', definition: 'Analyzing facts carefully to reach a conclusion', phonetic: '', synonyms: ['analytical thinking', 'logical reasoning'], examples: ['Critical thinking is one of the most valuable 21st-century skills.'], difficulty: 3, importance: 3 },
      { word: 'Literacy', definition: 'Ability to read, write, or understand a topic', phonetic: '/ˈlɪtərəsi/', synonyms: ['proficiency', 'knowledge', 'competence'], examples: ['Digital literacy is now as important as reading and writing.'], difficulty: 3, importance: 3 },
      { word: 'Personalized Learning', definition: 'Education tailored to individual student needs', phonetic: '', synonyms: ['adaptive learning', 'individualized instruction'], examples: ['AI enables personalized learning at scale.'], difficulty: 4, importance: 2 },
    ],
  },

  // ─── SPORTS ───────────────────────────────────────────────────────────────
  {
    categorySlug: 'sports',
    title: 'Football and Teamwork',
    slug: 'football-teamwork',
    explanation:
      'Football (soccer) is the world\'s most popular sport. Beyond the game itself, football teaches valuable lessons about teamwork, strategy, communication, and perseverance. Top clubs are also global businesses worth billions of dollars.',
    level: 'B1',
    discussionQs: [
      'Why do you think football is so popular worldwide?',
      'What lessons can sports teach us about life?',
      'Who is your favorite football player and why?',
      'How important is teamwork in achieving goals?',
    ],
    vocabularyList: [
      { word: 'Strategy', definition: 'A plan to achieve a goal effectively', phonetic: '/ˈstrætɪdʒi/', synonyms: ['tactic', 'plan', 'approach'], examples: ['The coach changed the team\'s strategy at half-time.'], difficulty: 2, importance: 3 },
      { word: 'Perseverance', definition: 'Continuing to do something despite difficulty', phonetic: '/ˌpɜːsɪˈvɪərəns/', synonyms: ['determination', 'persistence', 'resilience'], examples: ['His perseverance helped him recover from the injury and return to play.'], difficulty: 4, importance: 3 },
      { word: 'Coordination', definition: 'Organizing elements to work together effectively', phonetic: '/kəʊˌɔːdɪˈneɪʃən/', synonyms: ['teamwork', 'synchronization', 'organization'], examples: ['Good coordination between players leads to better performance.'], difficulty: 3, importance: 2 },
      { word: 'Championship', definition: 'A competition to find the best player or team', phonetic: '/ˈtʃæmpiənʃɪp/', synonyms: ['tournament', 'title', 'league'], examples: ['They trained for months to win the national championship.'], difficulty: 2, importance: 2 },
      { word: 'Stamina', definition: 'The ability to sustain physical or mental effort', phonetic: '/ˈstæmɪnə/', synonyms: ['endurance', 'fitness', 'energy'], examples: ['Football players need exceptional stamina to play 90 minutes.'], difficulty: 3, importance: 2 },
    ],
  },

  // ─── ART ──────────────────────────────────────────────────────────────────
  {
    categorySlug: 'art',
    title: 'Music and Emotion',
    slug: 'music-emotion',
    explanation:
      'Music is a universal language that connects people across cultures. Research shows that music directly affects our emotions, memory, and even physical health. From classical orchestras to modern pop, every genre expresses something unique about the human experience.',
    level: 'B1',
    discussionQs: [
      'How does music affect your mood?',
      'What genre of music do you prefer and why?',
      'Can you describe a song that is meaningful to you?',
      'How has music evolved in the digital age?',
    ],
    vocabularyList: [
      { word: 'Genre', definition: 'A category of artistic style', phonetic: '/ˈʒɒnrə/', synonyms: ['style', 'category', 'type'], examples: ['Jazz is a genre known for improvisation and rhythm.'], difficulty: 2, importance: 3 },
      { word: 'Tempo', definition: 'The speed or pace of a piece of music', phonetic: '/ˈtɛmpəʊ/', synonyms: ['pace', 'rhythm', 'beat'], examples: ['The tempo of the song gradually increased, building excitement.'], difficulty: 3, importance: 2 },
      { word: 'Composition', definition: 'A piece of music or the act of creating it', phonetic: '/ˌkɒmpəˈzɪʃən/', synonyms: ['piece', 'work', 'creation'], examples: ['Beethoven\'s compositions are still performed worldwide.'], difficulty: 3, importance: 2 },
      { word: 'Melody', definition: 'A sequence of musical notes that forms a tune', phonetic: '/ˈmɛlədi/', synonyms: ['tune', 'theme', 'air'], examples: ['The melody of that song stayed in my head all day.'], difficulty: 2, importance: 3 },
      { word: 'Harmony', definition: 'Combination of different musical notes played together', phonetic: '/ˈhɑːməni/', synonyms: ['chord', 'consonance', 'accord'], examples: ['The choir sang in perfect harmony.'], difficulty: 3, importance: 2 },
    ],
  },
]
