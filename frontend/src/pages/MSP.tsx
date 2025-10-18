import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const MSP = () => {
  const mspData = [
    { crop: "Paddy (Common)", msp: "₹2,300", season: "Kharif 2025" },
    { crop: "Paddy (Grade A)", msp: "₹2,320", season: "Kharif 2025" },
    { crop: "Wheat", msp: "₹2,275", season: "Rabi 2024-25" },
    { crop: "Maize", msp: "₹2,090", season: "Kharif 2025" },
    { crop: "Bajra", msp: "₹2,500", season: "Kharif 2025" },
    { crop: "Jowar", msp: "₹3,180", season: "Kharif 2025" },
    { crop: "Cotton", msp: "₹7,020", season: "Kharif 2025" },
    { crop: "Groundnut", msp: "₹6,377", season: "Kharif 2025" },
    { crop: "Soyabean", msp: "₹4,600", season: "Kharif 2025" },
    { crop: "Sugarcane", msp: "₹340", season: "2024-25" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Minimum Support Price (MSP)</h1>
          <p className="text-muted-foreground">Current government-announced MSP rates for various crops</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>MSP Rates 2024-25</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Crop</TableHead>
                  <TableHead>MSP (per quintal)</TableHead>
                  <TableHead>Season</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mspData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.crop}</TableCell>
                    <TableCell className="text-primary font-semibold">{item.msp}</TableCell>
                    <TableCell>{item.season}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> MSP rates are announced by the Government of India based on recommendations 
            from the Commission for Agricultural Costs and Prices (CACP). These rates are subject to periodic revisions.
          </p>
        </div>
      </main>
    </div>
  );
};

export default MSP;