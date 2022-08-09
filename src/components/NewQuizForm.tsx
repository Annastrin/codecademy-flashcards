import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import produce from "immer";
import { selectTopics } from "../features/topics/topicsSlice";
import ROUTES from "../app/routes";
import { addQuiz } from "../features/quizzes/quizzesSlice";
import { addQuizId } from "../features/topics/topicsSlice";
import { addCards } from "../features/cards/cardsSlice";

interface NewQuizFormProps {
  topicFromLink?: string | undefined;
}

export default function NewQuizForm({ topicFromLink }: NewQuizFormProps) {
  const [name, setName] = useState("");
  const [cards, setCards] = useState<Cards>({});
  const [topicId, setTopicId] = useState(topicFromLink || "");
  const topics = useSelector(selectTopics);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (name.length === 0 || topicId.length === 0) {
      return;
    }

    const quizId = uuidv4();

    const newQuiz = {
      id: quizId,
      topicId: topicId,
      name: name,
      cardIds: [...Object.keys(cards)]
    };

    dispatch(addQuiz(newQuiz));
    dispatch(addQuizId({ topicId: topicId, quizId: quizId }));
    dispatch(addCards(cards));

    navigate(ROUTES.quizzesRoute());
  };

  const addCardInputs = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newCardId = uuidv4();
    setCards(
      produce((draft) => {
        draft[newCardId] = {
          id: newCardId,
          front: "",
          back: ""
        };
      })
    );
  };

  const removeCard = (e: React.SyntheticEvent, index: string) => {
    e.preventDefault();
    setCards(
      produce((draft) => {
        delete draft[index];
      })
    );
  };

  const updateCardState = (
    index: string,
    side: "front" | "back",
    value: string
  ) => {
    setCards(
      produce((draft) => {
        draft[index][side] = value;
      })
    );
  };

  return (
    <section>
      <h1>Create a new quiz</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="quiz-name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Quiz Title"
        />
        <select
          id="quiz-topic"
          onChange={(e) => setTopicId(e.currentTarget.value)}
          defaultValue={topicFromLink || "default"}
          required
        >
          <optgroup label="Topic">
            <option value="default" disabled hidden>
              Topic
            </option>
            {Object.values(topics).map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.name}
              </option>
            ))}
          </optgroup>
        </select>
        {Object.keys(cards).map((index) => (
          <div key={index} className="card-front-back">
            <input
              id={`card-front-${index}`}
              value={cards[index].front}
              onChange={(e) =>
                updateCardState(index, "front", e.currentTarget.value)
              }
              placeholder="Front"
            />

            <input
              id={`card-back-${index}`}
              value={cards[index].back}
              onChange={(e) =>
                updateCardState(index, "back", e.currentTarget.value)
              }
              placeholder="Back"
            />

            <button
              onClick={(e) => removeCard(e, index)}
              className="remove-card-button"
            >
              Remove Card
            </button>
          </div>
        ))}
        <div className="actions-container">
          <button onClick={addCardInputs}>Add a Card</button>
          <button>Create Quiz</button>
        </div>
      </form>
    </section>
  );
}

export function NewQuizFormWithTopic() {
  const { topicIdFromLink } = useParams();
  return <NewQuizForm topicFromLink={topicIdFromLink} />;
}
