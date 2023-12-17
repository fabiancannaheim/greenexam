import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../App";

const Prompt = () => {
  const [questions, setQuestions] = useState("");

  const getQuestions = () => {
    axios
      .get(`${API_URL}/questions`)
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.log(error.message);
        }
      });

    // axios
    //   .get(`${API_URL}/questions/1`)
    //   .then((res) => {
    //     setQuestions((prev) => prev + " --- " + JSON.stringify(res.data));
    //   })
    //   .catch((error) => {
    //     if (axios.isAxiosError(error)) {
    //       console.log(error.message);
    //     }
    //   });
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const formatExercise = (exercise) => {
    return (
      <div key={exercise.id}>
        <h3>{exercise.title}</h3>
        <p>
          <strong>Description:</strong> {exercise.description}
        </p>
        <p>
          <strong>Solution Skeleton:</strong> {exercise.skeleton || "N/A"}
        </p>
        <p>
          <strong>Sample Solution:</strong> {exercise.solution}
        </p>
        <p>
          <strong>Points:</strong> {exercise.points}
        </p>
      </div>
    );
  };

  return (
    <div className="prompt">
      {questions !== "" ? (
        <div>{questions.map((exercise) => formatExercise(exercise))}</div>
      ) : null}
    </div>
  );
};

export default Prompt;
