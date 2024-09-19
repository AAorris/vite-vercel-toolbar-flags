import { mountVercelToolbar } from "@vercel/toolbar";
import { hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./App.css";

const domNode = document.getElementById("root");
const flagsNode = document.getElementById("flags");
const settingsNode = document.getElementById("settings");
const reactNode = <App flags={JSON.parse(flagsNode?.textContent ?? "{}")} />;
const root = domNode ? hydrateRoot(domNode, reactNode) : null;
void root;

const settings = settingsNode
  ? JSON.parse(settingsNode.textContent ?? "{}")
  : {};

if (settings.projectId && settings.ownerId && settings.branch) {
  mountVercelToolbar({
    branch: "main",
    projectId: "prj_YlENLdYQVTbPYWkr9TzA2luStDLc",
    ownerId: "team_zgNTDqSLGxbdFxTkK28cPOPZ",
  });
}
