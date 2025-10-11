import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sprout, Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const links = [
    { path: "/", label: t('nav.home') },
    { path: "/marketplace", label: t('nav.marketplace') },
    { path: "/news", label: t('nav.news') },
    { path: "/msp", label: t('nav.msp') },
    { path: "/crop-suggestion", label: t('nav.cropSuggestion') },
    { path: "/login", label: t('nav.login') },
  ];

  const NavLinks = () => (
    <>
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          onClick={() => setIsOpen(false)}
          className={`text-sm font-medium transition-colors hover:text-primary ${
            location.pathname === link.path
              ? "text-primary"
              : "text-foreground/70"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <Sprout className="h-6 w-6 text-primary" />
          <span>Krishi Mitra</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavLinks />
          <LanguageSelector />
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-6 mt-6">
              <NavLinks />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navigation;
