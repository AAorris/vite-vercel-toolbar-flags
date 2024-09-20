import { FlagOverridesType } from "@vercel/flags";
import { useMemo, useState, useEffect } from "react";

export function Page(props: { overrides: FlagOverridesType | undefined }) {
  const [count, setCount] = useState(1);
  const overrides = useMemo(() => props.overrides, [props.overrides]);
  const showCounter = useMemo(() => overrides?.showCounter, [overrides]);
  useEffect(() => {
    const flagsElement = document.getElementById("flags");
    if (flagsElement) {
      flagsElement.remove();
    }
  }, []);
  return (
    <>
      <section className="hero">
        <h1>Vike</h1>
        {showCounter ? (
          <section className="counter">
            <button
              onClick={() => {
                setCount((count) => count + 1);
              }}
            >
              count is {count}
            </button>
          </section>
        ) : null}
      </section>
    </>
  );
}
