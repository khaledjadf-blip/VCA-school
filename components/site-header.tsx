"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { courses } from "@/lib/data";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/advies", label: "Keuzehulp" },
  { href: "/kennisbank", label: "Kennisbank" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/contact", label: "Inschrijven" }
];

const courseLinks = [
  { href: "/cursussen", label: "Alle cursussen" },
  ...courses.map((course) => ({ href: `/cursussen/${course.slug}`, label: course.title }))
];

export function SiteHeader() {
  const pathname = usePathname();
  const { language, toggleLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(pathname.startsWith("/cursussen"));

  const closeMenus = () => {
    setOpen(false);
    setCoursesOpen(false);
  };

  return (
    <header className="site-header sticky top-0 z-50 border-b border-primary bg-white">
      <div className="section-shell flex min-h-14 items-center justify-between gap-2 py-2 sm:min-h-16">
        <Link href="/" className="site-brand flex min-w-0 items-center gap-2 font-bold sm:gap-3" onClick={closeMenus}>
          <img
            src="/images/vca-logo.svg"
            alt="VCA Veilig & Vakkundig B.V."
            className="site-logo h-12 w-auto sm:h-[3.35rem]"
          />
        </Link>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Button
            data-testid="language-toggle-header"
            className="border-2 border-accent bg-accent/10 px-2 text-accent hover:bg-accent hover:text-white sm:px-3"
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            aria-label="Switch language"
          >
            <span className="hidden sm:inline">{language === "ar" ? "Nederlands" : "العربية"}</span>
            <span className="sm:hidden">{language === "ar" ? "NL" : "AR"}</span>
          </Button>
          <Button className="lg:hidden px-2 sm:px-3" variant="outline" size="sm" onClick={() => setOpen(!open)} aria-label="Open menu">
            {open ? "Sluiten" : "Menu"}
          </Button>
        </div>
      </div>

      <div className="bg-[#154273] text-white">
        <div className="section-shell hidden h-12 items-center justify-between lg:flex">
          <nav className="flex items-center" aria-label="Hoofdnavigatie">
            <Link
              href="/"
              className={cn(
                "px-4 py-3 text-sm font-semibold text-primary-foreground underline-offset-4 hover:bg-white/12 hover:underline",
                pathname === "/" && "bg-accent underline"
              )}
            >
              Home
            </Link>
            <div className="relative" onMouseLeave={() => setCoursesOpen(false)}>
              <button
                type="button"
                onClick={() => setCoursesOpen((value) => !value)}
                onMouseEnter={() => setCoursesOpen(true)}
                className={cn(
                  "flex items-center gap-1 px-4 py-3 text-sm font-semibold text-primary-foreground underline-offset-4 hover:bg-white/12 hover:underline",
                  pathname.startsWith("/cursussen") && "bg-accent underline"
                )}
                aria-expanded={coursesOpen}
                aria-haspopup="menu"
              >
                Cursussen
                <span aria-hidden="true">{coursesOpen ? "−" : "+"}</span>
              </button>
              {coursesOpen && (
                <div className="absolute left-0 top-full z-50 w-72 border border-primary bg-white py-2 text-primary shadow-lg" role="menu">
                  {courseLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenus}
                      className={cn(
                        "block border-b border-border px-4 py-3 text-sm font-semibold last:border-b-0 hover:bg-secondary hover:underline",
                        pathname === item.href && "bg-accent/10 text-accent underline"
                      )}
                      role="menuitem"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {nav.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-3 text-sm font-semibold text-primary-foreground underline-offset-4 hover:bg-white/12 hover:underline",
                  pathname === item.href && "bg-accent underline"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a href="tel:+31616717342" className="ml-auto mr-3 text-sm font-bold underline-offset-4 hover:underline">
            <bdi dir="ltr">+31 6 16717342</bdi>
          </a>
          <Button asChild variant="accent" size="sm">
            <Link href="/contact">Direct inschrijven</Link>
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t bg-white lg:hidden">
          <nav className="section-shell grid gap-2 py-4" aria-label="Mobiele navigatie">
            <Link
              href="/"
              onClick={closeMenus}
              className="border-b border-border px-1 py-3 text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Home
            </Link>
            <div className="border-b border-border">
              <button
                type="button"
                onClick={() => setMobileCoursesOpen((value) => !value)}
                className="flex w-full items-center justify-between px-1 py-3 text-left text-sm font-semibold text-primary underline-offset-4 hover:underline"
                aria-expanded={mobileCoursesOpen}
              >
                Cursussen
                <span aria-hidden="true">{mobileCoursesOpen ? "−" : "+"}</span>
              </button>
              {mobileCoursesOpen && (
                <div className="grid border-t border-border bg-secondary/60 py-2">
                  {courseLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenus}
                      className={cn(
                        "px-4 py-2.5 text-sm font-semibold text-primary underline-offset-4 hover:underline",
                        pathname === item.href && "underline"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {nav.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenus}
                className="border-b border-border px-1 py-3 text-sm font-semibold text-primary underline-offset-4 hover:underline"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <Button data-testid="language-toggle" className="mb-3" variant="outline" onClick={toggleLanguage} aria-label="Switch language">
                {language === "ar" ? "Nederlands" : "العربية"}
              </Button>
              <Button asChild variant="accent">
                <Link href="/contact" onClick={() => setOpen(false)}>
                  Direct inschrijven
                </Link>
              </Button>
              <a href="tel:+31616717342" className="mt-3 flex text-sm font-bold text-primary">
                <bdi dir="ltr">+31 6 16717342</bdi>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
