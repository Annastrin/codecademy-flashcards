import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTopics } from "./topicsSlice";
import { selectQuizzes } from "../quizzes/quizzesSlice";
import ROUTES from "../../app/routes";

export default function Topic() {
  const topics = useSelector(selectTopics);
  const quizzes = useSelector(selectQuizzes);
  let { topicId } = useParams();

  if (topicId === undefined) {
    throw new Error("topicId is undefined.");
  }

  const topic = topics[topicId];

  if (topic === undefined) {
    return (
      <section style={{ textAlign: "center" }}>
        <h1>Topic not found!</h1>
      </section>
    );
  }

  const quizzesForTopic = topic.quizIds.map((quizId) => quizzes[quizId]);

  return (
    <section>
      <img src={topic.icon} alt="" className="topic-icon" />
      <h1>Topic: {topic.name}</h1>
      <ul className="quizzes-list">
        {quizzesForTopic.map((quiz) => (
          <li className="quiz" key={quiz.id}>
            <Link to={ROUTES.quizRoute(quiz.id)}>{quiz.name}</Link>
          </li>
        ))}
      </ul>
      <Link to={`/quizzes/new/${topic.id}`} className="button center">
        Create a New Quiz
      </Link>
    </section>
  );
}
