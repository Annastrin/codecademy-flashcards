import { Link, useParams } from "react-router-dom";
import Card from "../cards/Card";
import ROUTES from "../../app/routes";

export default function Quiz() {
  const quizzes: Quizzes = {}; // replace this with a call to your selector to get all the quizzes in state
  let { quizId } = useParams();

  if (quizId === undefined) {
    throw new Error("Impossible situation."); // TODO check it
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
