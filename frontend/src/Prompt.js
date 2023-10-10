import React from "react";

const Prompt = ({ promptText }) => {
  return (
    <div className="prompt">
      <h2>Prompt/Question</h2>
      <p>{promptText}</p>
    </div>
  );
};

export default Prompt;
