"use client";

import { useState, useEffect, useLayoutEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Music", href: "/music" },
  { label: "Tour", href: "/tour" },
  { label: "Videos", href: "/videos" },
  { label: "Follow Along", href: "/follow" },
];

const MOBILE_MENU_LINKS = [
  ...NAV_LINKS,
  { label: "Sign Up", href: "/sign-up" },
];

const NAV_LINKS_REVERSED = [...NAV_LINKS].reverse();

const PRESAVE_URL = "https://colegoodwin.ffm.to/howdyep.OPR";

const HAMBURGER_SHIFT = "-54px";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [pastHero, setPastHero] = useState(!isHome);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [forceTransparent, setForceTransparent] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  // Close menu on route change — fade out, then unmount
  useEffect(() => {
    if (menuOpen) {
      const fadeTimer = setTimeout(() => setMenuVisible(false), 100);
      const unmountTimer = setTimeout(() => setMenuOpen(false), 500);
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(unmountTimer);
      };
    }
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // Immediately hide logo on home before paint
  useLayoutEffect(() => {
    if (isHome) {
      setPastHero(false);
      setScrolled(false);
    }
  }, [isHome]);

  // Determine header state based on page type and scroll
  useEffect(() => {
    setScrolled(false);
    setForceTransparent(false);

    const main = document.querySelector("main");
    if (main?.dataset.headerStyle === "transparent") {
      setPastHero(true);
      setForceTransparent(true);
      return;
    }

    if (isHome) {
      setPastHero(false);

      const hero = document.querySelector("main > section:first-child");
      if (!hero) {
        setPastHero(true);
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          setPastHero(!entry.isIntersecting);
          setScrolled(!entry.isIntersecting);
        },
        { threshold: 0 }
      );

      observer.observe(hero);
      return () => observer.disconnect();
    } else {
      setPastHero(true);

      const onScroll = () => setScrolled(window.scrollY > 40);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [pathname, isHome]);

  // Escape key closes menu
  useEffect(() => {
    if (!menuOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuVisible(false);
        setTimeout(() => {
          setMenuOpen(false);
          menuToggleRef.current?.focus();
        }, 400);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  // Focus trap inside menu overlay
  useEffect(() => {
    if (!menuOpen || !menuVisible) return;
    const nav = menuRef.current;
    if (!nav) return;

    const focusable = nav.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first.focus();

    function trapFocus(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", trapFocus);
    return () => document.removeEventListener("keydown", trapFocus);
  }, [menuOpen, menuVisible]);

  // Animate menu open/close
  function toggleMenu() {
    if (menuOpen) {
      setMenuVisible(false);
      setTimeout(() => {
        setMenuOpen(false);
        menuToggleRef.current?.focus();
      }, 400);
    } else {
      setMenuOpen(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setMenuVisible(true));
      });
    }
  }

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dur = reducedMotion ? "duration-0" : "duration-[400ms]";
  const durFast = reducedMotion ? "duration-0" : "duration-200";

  const hamburgerHidden = pastHero;
  const showChrome = (scrolled || menuVisible) && !forceTransparent;

  const handleNavClick = useCallback(() => {
    // Don't close menu here — let the route change effect handle the fade-out
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,border-color] ${dur} ${
        showChrome
          ? "bg-brown shadow-[0_3px_8px_rgba(0,0,0,0.18)] border-b border-[rgba(249,240,227,0.15)]"
          : "bg-transparent shadow-none border-b border-transparent"
      }`}
    >
      <div className="relative flex items-center px-5 py-3 md:px-6 md:py-4 lg:px-8">
        {/* Left side — logo */}
        <Link
          href="/"
          aria-label="Cole Goodwin — home"
          onClick={handleNavClick}
          className={`will-change-[transform,opacity] ${
            pastHero
              ? "translate-x-0 opacity-100"
              : "-translate-x-12 opacity-0 pointer-events-none"
          }`}
          style={{
            transition: reducedMotion
              ? "none"
              : "transform 400ms cubic-bezier(0.22, 1, 0.36, 1), opacity 400ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <Image
            src="/branding/HowdyNameLogo_Flat.png"
            alt=""
            width={160}
            height={40}
            className="h-8 w-auto md:h-10"
            priority
          />
        </Link>

        {/* Desktop right-side elements */}
        <div className="hidden md:block">
          <div
            className="absolute top-0 bottom-0 right-6 z-20 flex items-center will-change-transform lg:right-8"
            style={{
              transform: `translateX(${pastHero ? "0px" : HAMBURGER_SHIFT})`,
              transition: reducedMotion
                ? "none"
                : "transform 400ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {/* Inline nav items */}
            <nav
              className="relative z-10 flex items-center"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((link) => {
                const reverseIdx = NAV_LINKS_REVERSED.findIndex(
                  (l) => l.href === link.href
                );
                const delay = pastHero
                  ? `${reverseIdx * 40}ms`
                  : `${(NAV_LINKS.length - 1 - reverseIdx) * 40}ms`;
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={handleNavClick}
                    aria-current={isActive ? "page" : undefined}
                    className={`mr-6 uppercase tracking-wider will-change-[transform,opacity] hover:text-rust ${
                      isActive ? "text-rust" : "text-cream"
                    } ${
                      pastHero
                        ? "translate-x-0 opacity-100"
                        : "translate-x-[120px] opacity-0 pointer-events-none"
                    }`}
                    style={{
                      fontFamily: "var(--font-headline)",
                      transitionDelay: delay,
                      transition: reducedMotion
                        ? "none"
                        : `transform 400ms cubic-bezier(0.22, 1, 0.36, 1), opacity 400ms cubic-bezier(0.22, 1, 0.36, 1)`,
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Pre-Save button */}
            <a
              href={PRESAVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pre-save Howdy EP — opens in a new tab"
              className="btn-presave relative z-20 shrink-0"
            >
              Pre-save
            </a>
          </div>

          {/* Desktop hamburger */}
          <button
            ref={menuToggleRef}
            type="button"
            className={`absolute top-0 bottom-0 right-6 my-auto flex h-10 w-10 items-center justify-center rounded-md !p-0 lg:right-8 ${
              menuOpen && menuVisible
                ? "z-50 bg-cream shadow-[3px_3px_0_#000]"
                : hamburgerHidden
                  ? "z-10 opacity-0 pointer-events-none"
                  : "z-10 bg-rust shadow-[3px_3px_0_#000]"
            }`}
            style={{
              transition: hamburgerHidden && !menuOpen
                ? reducedMotion
                  ? "none"
                  : "opacity 200ms ease 350ms, background-color 200ms ease, box-shadow 200ms ease"
                : reducedMotion
                  ? "none"
                  : "opacity 150ms ease, background-color 200ms ease, box-shadow 200ms ease",
            }}
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative flex w-5 flex-col items-center justify-center" style={{ height: "12px" }} aria-hidden="true">
              <span
                className={`absolute block h-[2px] w-full bg-cream transition-all ${durFast} ${
                  menuOpen ? "rotate-45 !bg-rust translate-y-0" : "translate-y-[-5px]"
                }`}
              />
              <span
                className={`absolute block h-[2px] w-full bg-cream transition-all ${durFast} ${
                  menuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                }`}
              />
              <span
                className={`absolute block h-[2px] w-full bg-cream transition-all ${durFast} ${
                  menuOpen ? "-rotate-45 !bg-rust translate-y-0" : "translate-y-[5px]"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          ref={menuToggleRef}
          type="button"
          className={`relative ml-auto flex h-10 w-10 items-center justify-center rounded-md md:hidden ${
            menuOpen
              ? "z-50 bg-cream shadow-[3px_3px_0_#000]"
              : "z-50 bg-rust shadow-[3px_3px_0_#000]"
          }`}
          style={{
            transition: reducedMotion
              ? "none"
              : "background-color 200ms ease, box-shadow 200ms ease",
          }}
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <div className="relative flex w-6 flex-col items-center justify-center" style={{ height: "14px" }} aria-hidden="true">
            <span
              className={`absolute block h-[2px] w-full transition-all ${durFast} ${
                menuOpen ? "rotate-45 bg-rust translate-y-0" : "translate-y-[-6px] bg-cream"
              }`}
            />
            <span
              className={`absolute block h-[2px] w-full transition-all ${durFast} ${
                menuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100 bg-cream"
              }`}
            />
            <span
              className={`absolute block h-[2px] w-full transition-all ${durFast} ${
                menuOpen ? "-rotate-45 bg-rust translate-y-0" : "translate-y-[6px] bg-cream"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Full-screen menu — animated overlay */}
      {menuOpen && (
        <nav
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-brown transition-opacity ${
            reducedMotion ? "duration-0" : "duration-[400ms]"
          } ease-out ${menuVisible ? "opacity-100" : "opacity-0"}`}
        >
          {MOBILE_MENU_LINKS.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                aria-current={isActive ? "page" : undefined}
                className={`block uppercase tracking-wider transition-all hover:text-rust ${isActive ? "text-rust" : "text-cream"}
                  text-4xl py-3
                  md:text-5xl md:py-4
                  lg:text-6xl lg:py-5
                  ${menuVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                style={{
                  fontFamily: "var(--font-headline)",
                  transitionDelay: menuVisible ? `${150 + i * 60}ms` : "0ms",
                  transitionDuration: reducedMotion ? "0ms" : "400ms",
                  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={PRESAVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pre-save Howdy EP — opens in a new tab"
            onClick={handleNavClick}
            className={`btn-presave mt-6 text-lg transition-all bg-rust text-cream md:text-xl
              ${menuVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            style={{
              transitionDelay: menuVisible ? `${150 + MOBILE_MENU_LINKS.length * 60}ms` : "0ms",
              transitionDuration: reducedMotion ? "0ms" : "400ms",
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            Pre-save
          </a>
        </nav>
      )}
    </header>
  );
}
