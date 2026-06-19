"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

type SplashState = "loading" | "splash" | "closing" | "site";

interface SplashContextValue {
  state: SplashState;
  dismiss: () => void;
}

const SplashCtx = createContext<SplashContextValue>({
  state: "loading",
  dismiss: () => {},
});

export function useSplash() {
  return useContext(SplashCtx);
}

const SESSION_KEY = "colegoodwin_splash_shown";

export default function SplashProvider({ children }: { children: ReactNode }) {
  // Splash disabled for now — skip straight to site
  const [state, setState] = useState<SplashState>("site");

  // Scroll lock while not "site"
  useEffect(() => {
    if (state === "site") {
      document.documentElement.removeAttribute("data-show-splash");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    } else {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = "0";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [state]);

  const dismiss = useCallback(() => {
    if (state !== "splash") return;
    sessionStorage.setItem(SESSION_KEY, "true");
    setState("closing");

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    setTimeout(
      () => {
        setState("site");
        window.dispatchEvent(new CustomEvent("splash-dismissed"));
      },
      reduced ? 0 : 500
    );
  }, [state]);

  return (
    <SplashCtx.Provider value={{ state, dismiss }}>
      {children}
    </SplashCtx.Provider>
  );
}
