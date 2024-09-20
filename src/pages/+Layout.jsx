export { Layout };
import "./PageLayout.css";
import { mountVercelToolbar } from "@vercel/toolbar";
import { usePageContext } from "vike-react/usePageContext";
import { FlagValues } from "@vercel/flags/react";

// You should inject the toolbar conditionally
// to avoid showing it to all visitors
if (typeof window !== "undefined") {
  mountVercelToolbar({
    projectId: "prj_YlENLdYQVTbPYWkr9TzA2luStDLc",
    ownerId: "team_zgNTDqSLGxbdFxTkK28cPOPZ",
  });
}

function Layout({ children }) {
  const pageContext = usePageContext();
  const overrides = pageContext.toolbarOverrides;
  return (
    <div>
      <nav>
        <a href="/">Home</a>
      </nav>
      {children}
      {overrides ? <FlagValues values={overrides} /> : null}
    </div>
  );
}
