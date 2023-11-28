import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export const beforeGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  next();
};

export const afterGuard = (to: RouteLocationNormalized) => {
  const appTitle = import.meta.env.VITE_APP_TITLE;
  const metaTitle = to.meta.title || "";
  document.title = `${appTitle}${metaTitle ? ` - ${metaTitle}` : ""}`;
};
