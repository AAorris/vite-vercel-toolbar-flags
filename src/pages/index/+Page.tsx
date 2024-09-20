import { usePageContext } from "vike-react/usePageContext";
import { useMemo, useState, useEffect } from "react";

function useOverride<T>(key: string, defaultValue: T): T {
  const pageContext = usePageContext();
  return useMemo(
    () => pageContext.toolbarOverrides?.[key] ?? defaultValue,
    [pageContext.toolbarOverrides, key, defaultValue]
  ) as T;
}

export function Page() {
  const heroText = useOverride("changeHeroText", "Vike");
  useEffect(() => {
    const flagsElement = document.getElementById("flags");
    if (flagsElement) {
      flagsElement.remove();
    }
  }, []);
  return (
    <>
      <section className="hero">
        <h1>{heroText}</h1>
        <Counter />
      </section>
    </>
  );
}

function Counter() {
  const showCounter = useOverride("showCounter", false);
  const [count, setCount] = useState(0);
  if (!showCounter) return null;
  return (
    <button
      className="counter"
      onClick={() => {
        setCount((count) => count + 1);
      }}
    >
      Clicked {count} time(s)
    </button>
  );
}
