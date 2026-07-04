"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Globe2, Menu, Phone, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { courses } from "@/lib/data";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/advies", label: "Keuzehulp" },
  { href: "/kennisbank", label: "Kennisbank" },
  { href: "/klassen", label: "Live klassen" },
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
    <header className="sticky top-0 z-50 border-b border-primary bg-white">
      <div className="section-shell flex min-h-20 items-center justify-between gap-3 py-3">
        <Link href="/" className="flex min-w-0 items-center gap-3 font-bold sm:gap-4" onClick={closeMenus}>
          <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#154273] text-white">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="min-w-0 leading-tight text-[#154273]">
            <span className="block text-base sm:text-lg">VCA Veilig & Vakkundig B.V.</span>
            <span className="hidden text-sm font-semibold text-muted-foreground sm:block">Opleiding, examinering en certificering</span>
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-2">
          <Button
            data-testid="language-toggle-header"
            className="border-2 border-accent bg-accent/10 px-3 text-accent hover:bg-accent hover:text-white sm:px-4"
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            aria-label="Switch language"
          >
            <Globe2 className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">{language === "ar" ? "Nederlands" : "العربية"}</span>
            <span className="sm:hidden">{language === "ar" ? "NL" : "AR"}</span>
          </Button>
          <Button className="lg:hidden" variant="outline" size="sm" onClick={() => setOpen(!open)} aria-label="Open menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            Menu
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
                <ChevronDown className={cn("h-4 w-4 transition-transform", coursesOpen && "rotate-180")} aria-hidden="true" />
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
          <a href="tel:+31687258236" className="ml-auto mr-3 flex items-center gap-2 text-sm font-bold underline-offset-4 hover:underline">
            <Phone className="h-4 w-4" />
            <bdi dir="ltr">+31 6 87258236</bdi>
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
                <ChevronDown className={cn("h-4 w-4 transition-transform", mobileCoursesOpen && "rotate-180")} aria-hidden="true" />
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
              <a href="tel:+31687258236" className="mt-3 flex items-center gap-2 text-sm font-bold text-primary">
                <Phone className="h-4 w-4" />
                <bdi dir="ltr">+31 6 87258236</bdi>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
