import { Link, useParams } from "react-router-dom";
import ROUTES from "../../app/routes";

export default function Topic() {
  const topics: Topics = {}; // replace this with a call to your selector to select all the topics in state
  const quizzes: Quizzes = {}; // replace this with a call to your selector to select all the quizzes in state
  let { topicId } = useParams();

  if (topicId === undefined) {
    throw new Error("Impossible situation.");
  }

  const topic: Topic = topics[topicId];

  if (!topic) {
    // TODO
  }

  const quizzesForTopic = topic.quizIds.map((quizId) => quizzes[quizId]);

  return (
    <section>
      <img src={topic?.icon} alt="" className="topic-icon" />
      <h1>Topic: {topic?.name}</h1>
      <ul className="quizzes-list">
        {quizzesForTopic.map((quiz) => (
          <li className="quiz" key={quiz.id}>
            <Link to={ROUTES.quizRoute(quiz.id)}>{quiz.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/quizzes/new" className="button center">
        Create a New Quiz
      </Link>
    </section>
  );
}
