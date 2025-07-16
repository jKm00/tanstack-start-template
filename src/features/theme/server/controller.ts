import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { Theme } from "../types";

const storageKey = "ui-theme";

const getThemeServerFn = createServerFn().handler(async () => {
  return (getCookie(storageKey) || "system") as Theme;
});

const setThemeServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    if (typeof data != "string" || (data != "dark" && data != "light")) {
      throw new Error("Invalid theme provided");
    }
    return data as Theme;
  })
  .handler(async ({ data }) => {
    setCookie(storageKey, data);
  });

export const themeController = {
  getTheme: getThemeServerFn,
  setTheme: setThemeServerFn,
};
