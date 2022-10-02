import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectQuizzes } from "./quizzesSlice";
import Card from "../cards/Card";
import ROUTES from "../../app/routes";

export default function Quiz() {
  const quizzes = useSelector(selectQuizzes);
  let { quizId } = useParams();

  if (quizId === undefined) {
    throw new Error("quizId is undefined");
  }

  const quiz = quizzes[quizId];

  return (
    <section>
      <h1>{quiz.name}</h1>
      <ul className="cards-list">
        {quiz.cardIds.map((id) => (
          <Card key={id} id={id} />
        ))}
      </ul>
      <Link to={ROUTES.newQuizRoute()} className="button center">
        Create a New Quiz
      </Link>
    </section>
  );
}
