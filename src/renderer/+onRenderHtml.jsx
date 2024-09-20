// https://vike.dev/onRenderHtml
export { onRenderHtml };
import React from "react";
import { renderToString } from "react-dom/server";
import { escapeInject, dangerouslySkipEscape } from "vike/server";
import { PageLayout } from "./PageLayout";

async function onRenderHtml(pageContext) {
  const { Page } = pageContext;
  // console.log(pageContext);
  const pageHtml = dangerouslySkipEscape(
    renderToString(
      <PageLayout>
        <Page overrides={pageContext.toolbarOverrides} />
      </PageLayout>
    )
  );
  return escapeInject`
<!doctype html>
<html lang="en">
  <head>
  </head>
  <body>
    <!-- flag-overrides -->
    <!-- settings -->
    <div id="root">${pageHtml}</div>
  </body>
</html>
`;
}
