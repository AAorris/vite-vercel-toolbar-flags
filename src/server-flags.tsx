import { FlagOverridesType, decrypt, safeJsonStringify } from "@vercel/flags";

// The server entry function
export async function getFlags(context: { cookie?: string }): Promise<string> {
  const cookieValue: string | undefined = context.cookie
    ? context.cookie
        .split(";")
        .find((cookie) => cookie.trim().startsWith("vercel-flag-overrides="))
        ?.split("=")[1] || ""
    : undefined;
  const flags = cookieValue
    ? ((await decrypt(cookieValue)) as FlagOverridesType)
    : undefined;
  return safeJsonStringify(flags ?? {});
}
