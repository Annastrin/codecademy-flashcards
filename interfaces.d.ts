interface Card {
  id: string;
  front: string;
  back: string;
}

interface Cards {
  [key: string]: Card;
}

interface Topic {
  id: string,
  name: string,
  icon: string,
  quizIds: string[]
}

interface Topics {
  [key: string]: Topic;
}

interface Quiz {
  id: string;
  topicId: string;
  name: string;
  cardIds: string[]
}

interface Quizzes {
  [key: string]: Quiz;
}