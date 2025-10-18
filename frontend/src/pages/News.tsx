import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

const News = () => {
  const newsItems = [
    {
      id: 1,
      title: "Government Announces New Crop Insurance Scheme",
      description: "The Ministry of Agriculture has launched a comprehensive crop insurance program to protect farmers against natural calamities.",
      category: "Policy",
      date: "2025-10-08",
    },
    {
      id: 2,
      title: "Monsoon Expected to Be Above Normal This Year",
      description: "Weather department predicts favorable monsoon conditions that could boost kharif crop production significantly.",
      category: "Weather",
      date: "2025-10-07",
    },
    {
      id: 3,
      title: "Organic Farming Subsidy Increased by 20%",
      description: "State governments across India increase subsidies for organic farming to promote sustainable agriculture practices.",
      category: "Subsidy",
      date: "2025-10-06",
    },
    {
      id: 4,
      title: "New Technology Helps Farmers Reduce Water Usage",
      description: "Innovative drip irrigation systems show 40% reduction in water consumption while maintaining crop yields.",
      category: "Technology",
      date: "2025-10-05",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Agricultural News</h1>
          <p className="text-muted-foreground">Stay updated with the latest developments in agriculture</p>
        </div>

        <div className="space-y-6">
          {newsItems.map((news) => (
            <Card key={news.id} className="hover:shadow-[var(--shadow-medium)] transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{news.category}</Badge>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(news.date).toLocaleDateString('en-IN', { 
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <CardTitle className="text-2xl">{news.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{news.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default News;
