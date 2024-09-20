export { PageLayout };
import React from "react";
import "./PageLayout.css";
function PageLayout({ children }) {
  return (
    <React.StrictMode>
      <Navigation>
        <a href="/">Home</a>
      </Navigation>
      <Content>{children}</Content>
    </React.StrictMode>
  );
}
function Navigation({ children }) {
  return <nav>{children}</nav>;
}
function Content({ children }) {
  return <main>{children}</main>;
}
