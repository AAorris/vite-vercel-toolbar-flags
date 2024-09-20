/// <reference types="vite/client" />
import { FlagOverridesType } from "@vercel/flags";

declare global {
  namespace Vike {
    interface PageContext {
      // Type of pageContext.user
      toolbarOverrides: FlagOverridesType | undefined;
      // Refine type of pageContext.Page (it's `unknown` by default)
      Page: () => JSX.Element;
    }
  }
}

// If you define Vike.PageContext in a .d.ts file then
// make sure there is at least one export/import statement.
// Tell TypeScript this file isn't an ambient module:
export {};
