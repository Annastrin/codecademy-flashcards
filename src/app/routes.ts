const ROUTES = {
  newQuizRoute: () => "/quizzes/new",
  quizRoute: (id: string) => `/quizzes/${id}`,
  quizzesRoute: () => "/quizzes",
  newTopicRoute: () => "/topics/new",
  topicRoute: (id: string) => `/topics/${id}`,
  topicsRoute: () => "/topics",
};

export default ROUTES;
