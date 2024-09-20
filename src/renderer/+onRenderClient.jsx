// https://vike.dev/onRenderClient
export { onRenderClient };
import React from "react";
import { hydrateRoot } from "react-dom/client";
import { PageLayout } from "./PageLayout";
import { mountVercelToolbar } from "@vercel/toolbar/vite";

async function onRenderClient(pageContext) {
  const { Page } = pageContext;
  hydrateRoot(
    document.getElementById("root"),
    <PageLayout>
      <Page overrides={pageContext.toolbarOverrides} />
    </PageLayout>
  );
  mountVercelToolbar({
    projectId: "prj_YlENLdYQVTbPYWkr9TzA2luStDLc",
    ownerId: "team_zgNTDqSLGxbdFxTkK28cPOPZ",
  });
}
