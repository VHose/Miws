export const roadmaps = [
  {
    name: 'Daily English Mastery',
    description: 'Build confident everyday English for casual conversations, social settings, and real-life interactions.',
    goal: 'DAILY',
    order: 1,
    nodes: [
      { topicSlug: 'family-relationships', order: 1 },
      { topicSlug: 'hobbies-free-time', order: 2 },
      { topicSlug: 'traveling-holidays', order: 3 },
    ],
  },
  {
    name: 'Tech English Fluency',
    description: 'Master the vocabulary and speaking skills needed to discuss technology professionally and confidently.',
    goal: 'TECH',
    order: 2,
    nodes: [
      { topicSlug: 'web-development', order: 1 },
      { topicSlug: 'artificial-intelligence', order: 2 },
      { topicSlug: 'cybersecurity', order: 3 },
    ],
  },
  {
    name: 'Business English Pro',
    description: 'Develop professional English for meetings, presentations, negotiations, and leadership roles.',
    goal: 'BUSINESS',
    order: 3,
    nodes: [
      { topicSlug: 'startup-culture', order: 1 },
      { topicSlug: 'leadership-management', order: 2 },
    ],
  },
  {
    name: 'Interview Preparation',
    description: 'Prepare for job interviews with focused vocabulary, structured responses, and confident delivery.',
    goal: 'INTERVIEW',
    order: 4,
    nodes: [
      { topicSlug: 'leadership-management', order: 1 },
      { topicSlug: 'startup-culture', order: 2 },
      { topicSlug: 'future-of-education', order: 3, isOptional: true },
    ],
  },
  {
    name: 'IELTS Speaking Preparation',
    description: 'Systematic preparation for IELTS Speaking test with topics spanning all band levels from B1 to C1.',
    goal: 'IELTS',
    order: 5,
    nodes: [
      { topicSlug: 'hobbies-free-time', order: 1 },
      { topicSlug: 'traveling-holidays', order: 2 },
      { topicSlug: 'mental-health-awareness', order: 3 },
      { topicSlug: 'nutrition-healthy-eating', order: 4 },
      { topicSlug: 'future-of-education', order: 5 },
      { topicSlug: 'climate-change-global-warming', order: 6 },
      { topicSlug: 'artificial-intelligence', order: 7 },
      { topicSlug: 'confirmation-bias', order: 8, isOptional: true },
      { topicSlug: 'compromise-effect', order: 9, isOptional: true },
    ],
  },
]
