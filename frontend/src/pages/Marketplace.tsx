import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart } from "lucide-react";

const Marketplace = () => {
  const products = [
    { id: 1, name: "Organic Wheat", price: "₹2,500/quintal", seller: "Ramesh Kumar", location: "Punjab" },
    { id: 2, name: "Fresh Tomatoes", price: "₹30/kg", seller: "Suresh Patil", location: "Maharashtra" },
    { id: 3, name: "Rice Seeds", price: "₹1,800/quintal", seller: "Mohan Singh", location: "Haryana" },
    { id: 4, name: "Organic Fertilizer", price: "₹450/bag", seller: "Green Agro", location: "Gujarat" },
    { id: 5, name: "Tractor (Used)", price: "₹4,50,000", seller: "Farm Solutions", location: "Uttar Pradesh" },
    { id: 6, name: "Fresh Potatoes", price: "₹20/kg", seller: "Prakash Yadav", location: "Bihar" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Agricultural Marketplace</h1>
          <p className="text-muted-foreground">Connect with farmers and buyers across India</p>
        </div>

        <div className="mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search for products, seeds, equipment..." className="pl-10" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id} className="hover:shadow-[var(--shadow-medium)] transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl">{product.name}</CardTitle>
                <CardDescription>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm">Seller: {product.seller}</p>
                    <p className="text-sm">Location: {product.location}</p>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{product.price}</span>
                  <Button size="sm" className="gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Marketplace;