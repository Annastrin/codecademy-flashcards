import React from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { selectTopics } from "../features/topics/topicsSlice";
import ROUTES from "../app/routes";
import { addQuiz } from "../features/quizzes/quizzesSlice";
import { addQuizId } from "../features/topics/topicsSlice";
import { addCards } from "../features/cards/cardsSlice";

interface NewQuizFormProps {
  topicFromLink?: string | undefined;
}

interface FormValues {
  quizName: string;
  topicId: string;
  cards: Card[];
}

export default function NewQuizForm({ topicFromLink }: NewQuizFormProps) {
  const topics = useSelector(selectTopics);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      quizName: "",
      topicId: topicFromLink || "default",
      cards: [{ id: uuidv4(), front: "", back: "" }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    name: "cards",
    rules: {
      required: "Add at least one card",
      minLength: { value: 1, message: "Add at least one card" }
    },
    control
  });

  const onSubmit: SubmitHandler<FormValues> = (data, e) => {
    e?.preventDefault();

    const quizId = uuidv4();

    const quizCards = cardsArrayToObject(data.cards);

    const newQuiz = {
      id: quizId,
      topicId: data.topicId,
      name: data.quizName,
      cardIds: data.cards.map((card) => card.id)
    };

    dispatch(addQuiz(newQuiz));
    dispatch(addQuizId({ topicId: data.topicId, quizId: quizId }));
    dispatch(addCards(quizCards));

    navigate(ROUTES.quizzesRoute());
  };

  const addCardInputs = (e: React.SyntheticEvent) => {
    e.preventDefault();
    append({ id: uuidv4(), front: "", back: "" });
  };

  const removeCard = (e: React.SyntheticEvent, index: number) => {
    e.preventDefault();
    remove(index);
  };

  return (
    <section>
      <h1>Create a new quiz</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-field">
          <input
            {...register("quizName", {
              required: true
            })}
            placeholder="Quiz Title"
            className={errors.quizName?.type === "required" ? "invalid" : ""}
          />
          {errors.quizName?.type === "required" && (
            <p className="error-message">Quiz Name is required</p>
          )}
        </div>
        <div className="form-field">
          <select
            {...register("topicId", {
              required: true,
              validate: (value) => value !== "default" || "Topic is required"
            })}
            className={errors.topicId?.type === "validate" ? "invalid" : ""}
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
          {errors.topicId?.type === "validate" && (
            <p className="error-message">{errors.topicId.message}</p>
          )}
        </div>
        {fields.map((item, index) => (
          <div className="card-front-back" key={item.id}>
            <div className="form-field">
              <input
                {...register(`cards.${index}.front`, {
                  validate: (val) => val.length > 0 || "Fill Front"
                })}
                placeholder="Front"
                className={
                  errors.cards?.[index]?.front?.type === "validate"
                    ? "invalid"
                    : ""
                }
              />
              {errors.cards?.[index]?.front?.type === "validate" && (
                <p className="error-message">
                  {errors.cards?.[index]?.front?.message}
                </p>
              )}
            </div>
            <div className="form-field">
              <input
                {...register(`cards.${index}.back`, {
                  validate: (val) => val.length > 0 || "Fill Back"
                })}
                placeholder="Back"
                className={
                  errors.cards?.[index]?.back?.type === "validate"
                    ? "invalid"
                    : ""
                }
              />
              {errors.cards?.[index]?.back?.type === "validate" && (
                <p className="error-message">
                  {errors.cards?.[index]?.back?.message}
                </p>
              )}
            </div>
            <button
              onClick={(e) => removeCard(e, index)}
              className="remove-card-button"
            >
              Remove Card
            </button>
          </div>
        ))}
        {errors.cards?.root && (
          <p className="error-message">{errors.cards?.root.message}</p>
        )}
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

function cardsArrayToObject(cardsArr: Card[]): Cards {
  const cardsObj = {} as Cards;
  for (const card of cardsArr) {
    cardsObj[card.id] = card;
  }
  return cardsObj;
}
