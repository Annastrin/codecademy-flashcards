import { NavLink } from "react-router-dom";
import ROUTES from "../app/routes";

export default function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to={ROUTES.topicsRoute()}
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Topics
          </NavLink>
        </li>
        <li>
          <NavLink
            to={ROUTES.quizzesRoute()}
            end
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Quizzes
          </NavLink>
        </li>
        <li>
          <NavLink
            to={ROUTES.newQuizRoute()}
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            New Quiz
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
