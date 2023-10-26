import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import CodeMirror from "@uiw/react-codemirror";
import axios from "axios";
import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import Output from "./Output";
import Prompt from "./Prompt";
import Tests from "./Tests";

import "react-grid-layout/css/styles.css";
import "./App.css";

export const API_URL = "http://192.168.1.8:3000";
const ResponsiveGridLayout = WidthProvider(Responsive);

function App() {
  const layout = [
    { i: "1", x: 0, y: 0, w: 4, h: 4, minW: 2 },
    { i: "2", x: 6, y: 0, w: 8, h: 4, minW: 2 },
    { i: "3", x: 0, y: 6, w: 6, h: 2, minW: 2 },
    { i: "4", x: 6, y: 6, w: 6, h: 2, minW: 2 },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const tests = [
    "Test 1: Check for syntax errors",
    "Test 2: Check for logic errors",
  ];

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const onChange = React.useCallback((value, viewUpdate) => {
    // TODO: Track every change
    // console.log("value:", value);
    setCode(value);
  }, []);

  const runCode = () => {
    // You can implement code execution here and update the 'output' state.
    // For simplicity, let's assume it's just echoing the code.
    // setOutput(code);

    axios
      .post(
        `${API_URL}/execution/${selectedLanguage}`,
        {
          code: code,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data.result);
        setOutput(res.data.result);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setOutput(error.message);
        } else {
          setOutput("connection failed");
        }
      });
  };

  return (
    <div className="app">
      <div>
        <h1>Select Your Preferred Language</h1>
        <select value={selectedLanguage} onChange={handleLanguageChange}>
          <option value="python" select>
            Python
          </option>
          <option value="java">Java</option>
        </select>
      </div>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        // breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 12, sm: 6, xs: 2, xxs: 1 }}
        // rowHeight={100}
        // width={1200}
        draggableHandle=".react-grid-dragHandle"
      >
        <div key="1" className="resizable-tile">
          <Prompt promptText="Write a function that adds two numbers." />
          <span className="react-grid-dragHandle">[DRAG]</span>
        </div>
        <div key="2" className="resizable-tile">
          <CodeMirror
            value=""
            extensions={[python(), java()]}
            onChange={onChange}
            height="500px"
          />
          <button onClick={runCode}>Run Code</button>
          <span className="react-grid-dragHandle">[DRAG]</span>
        </div>
        <div key="3" className="resizable-tile">
          <Tests tests={tests} />
          <span className="react-grid-dragHandle">[DRAG]</span>
        </div>
        <div key="4" className="resizable-tile">
          <Output output={output} />
          <button onClick={runCode}>Submit Code</button>
          <span className="react-grid-dragHandle">[DRAG]</span>
        </div>
      </ResponsiveGridLayout>
    </div>
  );
}
export default App;
