import { FlagOverridesType } from "@vercel/flags";
import { useMemo, useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App(props: { flags: FlagOverridesType | undefined }) {
  const [count, setCount] = useState(1);
  const flags = useMemo(() => props.flags, [props.flags]);
  const showCounter = useMemo(() => flags?.showCounter, [flags]);
  useEffect(() => {
    const flagsElement = document.getElementById("flags");
    if (flagsElement) {
      flagsElement.remove();
    }
  }, []);
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {showCounter ? (
          <button
            onClick={() => {
              console.log("click");
              setCount((count) => count + 1);
            }}
          >
            count is {count}
          </button>
        ) : null}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
