import { addCards } from "../features/cards/cardsSlice";
import { addQuiz } from "../features/quizzes/quizzesSlice";
import { addTopic, addQuizId } from "../features/topics/topicsSlice";
import { setupStore } from "./store";

describe("App state tests", () => {
  it("Initial state should be an empty object with three fields", () => {
    const store = setupStore();
    const state = store.getState();

    expect(state).toEqual({ cards: {}, quizzes: {}, topics: {} });
  });

  it("Should add new topic to state", () => {
    const store = setupStore();
    store.dispatch(
      addTopic({ id: "topic-0", name: "Topic 0", icon: "book", quizIds: [] })
    );

    let topics = store.getState().topics;
    expect(topics).toEqual({
      "topic-0": { id: "topic-0", name: "Topic 0", icon: "book", quizIds: [] }
    });
  });

  it("Should add new quiz", () => {
    const store = setupStore({
      cards: {},
      quizzes: {},
      topics: {
        "topic-0": { id: "topic-0", name: "Topic 0", icon: "book", quizIds: [] }
      }
    });

    store.dispatch(
      addQuiz({
        id: "quiz-0",
        topicId: "topic-0",
        name: "Quiz 0",
        cardIds: ["card-0"]
      })
    );
    store.dispatch(addQuizId({ topicId: "topic-0", quizId: "quiz-0" }));
    store.dispatch(
      addCards({
        "card-0": { id: "card-0", front: "Card 0 front", back: "Card 0 back" }
      })
    );

    const state = store.getState();
    expect(state).toMatchObject({
      topics: {
        "topic-0": {
          id: "topic-0",
          name: "Topic 0",
          icon: "book",
          quizIds: ["quiz-0"]
        }
      },
      quizzes: {
        "quiz-0": {
          id: "quiz-0",
          topicId: "topic-0",
          name: "Quiz 0",
          cardIds: ["card-0"]
        }
      },
      cards: {
        "card-0": { id: "card-0", front: "Card 0 front", back: "Card 0 back" }
      }
    });
  });

  it("Should add second quiz", () => {
    const store = setupStore({
      topics: {
        "topic-0": {
          id: "topic-0",
          name: "Topic 0",
          icon: "book",
          quizIds: ["quiz-0"]
        }
      },
      quizzes: {
        "quiz-0": {
          id: "quiz-0",
          topicId: "topic-0",
          name: "Quiz 0",
          cardIds: ["card-0"]
        }
      },
      cards: {
        "card-0": { id: "card-0", front: "Card 0 front", back: "Card 0 back" }
      }
    });

    store.dispatch(
      addQuiz({
        id: "quiz-1",
        topicId: "topic-0",
        name: "Quiz 1",
        cardIds: ["card-1", "card-2"]
      })
    );
    store.dispatch(addQuizId({ topicId: "topic-0", quizId: "quiz-1" }));
    store.dispatch(
      addCards({
        "card-1": { id: "card-1", front: "Card 1 front", back: "Card 1 back" },
        "card-2": { id: "card-2", front: "Card 2 front", back: "Card 2 back" }
      })
    );

    const state = store.getState();
    expect(state).toMatchObject({
      topics: {
        "topic-0": {
          id: "topic-0",
          name: "Topic 0",
          icon: "book",
          quizIds: ["quiz-0", "quiz-1"]
        }
      },
      quizzes: {
        "quiz-0": {
          id: "quiz-0",
          topicId: "topic-0",
          name: "Quiz 0",
          cardIds: ["card-0"]
        },
        "quiz-1": {
          id: "quiz-1",
          topicId: "topic-0",
          name: "Quiz 1",
          cardIds: ["card-1", "card-2"]
        }
      },
      cards: {
        "card-0": { id: "card-0", front: "Card 0 front", back: "Card 0 back" },
        "card-1": { id: "card-1", front: "Card 1 front", back: "Card 1 back" },
        "card-2": { id: "card-2", front: "Card 2 front", back: "Card 2 back" }
      }
    });
  });
});
