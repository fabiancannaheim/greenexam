import React from "react";

const Tests = ({ tests }) => {
  return (
    <div className="tests">
      <ul>
        {tests.map((test, index) => (
          <li key={index}>{test}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tests;
