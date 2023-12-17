import axios from "axios";
import React, { useState } from "react";

import { Responsive, WidthProvider } from "react-grid-layout";

import CodeEditor from "./components/CodeEditor";
import Header from "./components/Header";
import Output from "./components/Output";
import Prompt from "./components/Prompt";
import Tests from "./components/Tests";

export const API_URL = "http://pi.local:3000";
const ResponsiveGridLayout = WidthProvider(Responsive);

function App() {
  const layout = [
    { i: "1", x: 0, y: 0, w: 4, h: 4, minW: 2 },
    { i: "2", x: 4, y: 0, w: 8, h: 4, minW: 2 },
    { i: "3", x: 0, y: 6, w: 6, h: 2, minW: 2 },
    { i: "4", x: 6, y: 6, w: 6, h: 2, minW: 2 },
    { i: "5", x: 0, y: 6, w: 6, h: 2, minW: 2 },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [metrics, setMetrics] = useState("");
  const tests = [
    "Test 1: Check for syntax errors",
    "Test 2: Check for logic errors",
  ];

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const onCodeChange = React.useCallback((value, viewUpdate) => {
    setCode(value);
  }, []);

  const getMetrics = () => {
    axios
      .get(`${API_URL}/metrics`)
      .then((res) => {
        setMetrics(res.data);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.log(error.message);
        }
      });
  };

  const runCode = () => {
    axios
      .post(
        `${API_URL}/code/execute/${selectedLanguage}`,
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
        setOutput(res.data.result);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.data) setOutput(error.response.data.error);
        } else {
          if (axios.isAxiosError(error)) {
            setOutput(error.message);
          } else {
            setOutput("connection failed");
          }
        }
      });
  };

  return (
    <>
      <Header />
      <div className="app">
        <div className="langSelect">
          <h3>Select Language</h3>
          <select value={selectedLanguage} onChange={handleLanguageChange}>
            <option value="python">Python</option>
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
            <h2 className="centered-highlighted">Questions</h2>
            <Prompt />
            <span className="react-grid-dragHandle">[DRAG]</span>
          </div>
          <div key="2" className="resizable-tile">
            <CodeEditor
              code={""}
              onCodeChange={onCodeChange}
              runCode={runCode}
            />
            <span className="react-grid-dragHandle">[DRAG]</span>
          </div>
          <div key="3" className="resizable-tile">
            <h2 className="centered-highlighted">Tests</h2>
            <Tests tests={tests} />
            <span className="react-grid-dragHandle">[DRAG]</span>
          </div>
          <div key="4" className="resizable-tile">
            <h2 className="centered-highlighted">Console Output</h2>
            <Output output={output} />
            {/* <button onClick={runCode}>Submit Code</button> */}
            <span className="react-grid-dragHandle">[DRAG]</span>
          </div>
          {/* <div key="5" className="resizable-tile">
            <div>{metrics}</div>
            <button onClick={getMetrics} className="btn btn-primary">
              Get Metrics
            </button>
          </div> */}
        </ResponsiveGridLayout>
      </div>
    </>
  );
}
export default App;
