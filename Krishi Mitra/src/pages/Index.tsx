import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ShoppingCart, Newspaper, TrendingUp, Sprout } from "lucide-react";
import { useTranslation } from "react-i18next";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: ShoppingCart,
      title: t('features.marketplace.title'),
      description: t('features.marketplace.description'),
      path: "/marketplace",
    },
    {
      icon: Newspaper,
      title: t('features.news.title'),
      description: t('features.news.description'),
      path: "/news",
    },
    {
      icon: TrendingUp,
      title: t('features.msp.title'),
      description: t('features.msp.description'),
      path: "/msp",
    },
    {
      icon: Sprout,
      title: t('features.cropSuggestion.title'),
      description: t('features.cropSuggestion.description'),
      path: "/crop-suggestion",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20 lg:py-32">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {t('hero.title')} <span className="text-primary">{t('hero.appName')}</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link to="/marketplace">
                  <ShoppingCart className="h-4 w-4" />
                  {t('hero.exploreMarketplace')}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/crop-suggestion">{t('hero.getCropSuggestions')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="container px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">{t('features.title')}</h2>
            <p className="text-muted-foreground">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Link key={feature.path} to={feature.path}>
                <Card className="h-full transition-all duration-300 hover:shadow-[var(--shadow-medium)] hover:-translate-y-1">
                  <CardHeader>
                    <feature.icon className="h-10 w-10 mb-4 text-primary" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-16">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">{t('cta.title')}</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              {t('cta.subtitle')}
            </p>
            <Button asChild size="lg">
              <Link to="/marketplace">{t('cta.button')}</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Chatbot />
    </div>
  );
};

export default Index;