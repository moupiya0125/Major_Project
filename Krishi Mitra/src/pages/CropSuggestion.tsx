import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Lightbulb } from "lucide-react";

const CropSuggestion = () => {
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder logic - in real app, this would use ML model or API
    const mockSuggestions = ["Wheat", "Rice", "Cotton", "Sugarcane"];
    setSuggestions(mockSuggestions);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Crop Suggestion Tool</h1>
          <p className="text-muted-foreground">
            Get personalized crop recommendations based on your soil and environmental conditions
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Soil Parameters</CardTitle>
              <CardDescription>Enter your soil's NPK values and we'll suggest suitable crops</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nitrogen">Nitrogen (N) - kg/ha</Label>
                  <Input
                    id="nitrogen"
                    type="number"
                    placeholder="e.g., 40"
                    value={nitrogen}
                    onChange={(e) => setNitrogen(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phosphorus">Phosphorus (P) - kg/ha</Label>
                  <Input
                    id="phosphorus"
                    type="number"
                    placeholder="e.g., 60"
                    value={phosphorus}
                    onChange={(e) => setPhosphorus(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="potassium">Potassium (K) - kg/ha</Label>
                  <Input
                    id="potassium"
                    type="number"
                    placeholder="e.g., 45"
                    value={potassium}
                    onChange={(e) => setPotassium(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Get Crop Suggestions
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Recommended Crops
              </CardTitle>
              <CardDescription>Based on your soil parameters and local weather conditions</CardDescription>
            </CardHeader>
            <CardContent>
              {suggestions.length > 0 ? (
                <div className="space-y-3">
                  {suggestions.map((crop, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg border bg-card hover:shadow-[var(--shadow-soft)] transition-all"
                    >
                      <h3 className="font-semibold text-lg">{crop}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        This crop is well-suited for your soil conditions
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Lightbulb className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter your soil parameters to get personalized crop suggestions</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <ol className="space-y-2">
              <li>Enter your soil's NPK (Nitrogen, Phosphorus, Potassium) values</li>
              <li>Weather data is automatically fetched based on your location</li>
              <li>Our system analyzes soil nutrients and climate conditions</li>
              <li>Get personalized crop recommendations for optimal yield</li>
            </ol>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CropSuggestion;