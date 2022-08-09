import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./app/App";
import Topics from "./features/topics/Topics";
import NewTopicForm from "./components/NewTopicForm";
import Topic from "./features/topics/Topic";
import Quizzes from "./features/quizzes/Quizzes";
import NewQuizForm from "./components/NewQuizForm";
import Quiz from "./features/quizzes/Quiz";
import store from "./app/store";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="topics" element={<Topics />} />
            <Route path="topics/new" element={<NewTopicForm />} />
            <Route path="topics/:topicId" element={<Topic />} />
            <Route path="quizzes" element={<Quizzes />} />
            <Route path="quizzes/new" element={<NewQuizForm />} />
            <Route path="quizzes/:quizId" element={<Quiz />} />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem", textAlign: "center" }}>
                  <h1>404</h1>
                  <p>Page not found!</p>
                </main>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
