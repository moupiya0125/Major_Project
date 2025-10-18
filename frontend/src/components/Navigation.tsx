import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sprout, Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import { useAuth } from "@/hooks/useAuth";

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  const links = [
    { path: "/", label: t('nav.home') },
    { path: "/marketplace", label: t('nav.marketplace') },
    { path: "/news", label: t('nav.news') },
    { path: "/msp", label: t('nav.msp') },
    { path: "/crop-suggestion", label: t('nav.cropSuggestion') },
  ];

  const NavLinks = ({ isMobile = false }) => (
    <>
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          onClick={() => setIsOpen(false)}
          className={`font-medium transition-colors hover:text-primary ${
            location.pathname === link.path ? "text-primary" : "text-foreground/70"
          } ${isMobile ? 'text-lg' : 'text-sm'}`}
        >
          {link.label}
        </Link>
      ))}
    </>
  );

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <Sprout className="h-6 w-6 text-primary" />
          <span>Krishi Mitra</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavLinks />
          <LanguageSelector />
          {user ? (
             <div className="flex items-center gap-4">
                <div className="text-sm text-right">
                    <div className="font-medium">{user.username}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                </div>
               <Button onClick={handleLogout} variant="outline" size="sm">{t('auth.logoutBtn')}</Button>
             </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">{t('nav.login')}</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/signup">{t('auth.signupLink')}</Link>
              </Button>
            </div>
          )}
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
              <NavLinks isMobile={true}/>
              <hr/>
              {user ? (
                <div className="flex flex-col gap-4">
                    <div className="text-center">
                        <div className="font-medium">{user.username}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  <Button onClick={handleLogout} variant="outline">{t('auth.logoutBtn')}</Button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <Button asChild variant="outline" onClick={() => setIsOpen(false)}>
                    <Link to="/login">{t('nav.login')}</Link>
                  </Button>
                  <Button asChild onClick={() => setIsOpen(false)}>
                    <Link to="/signup">{t('auth.signupLink')}</Link>
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navigation;