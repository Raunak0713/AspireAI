"use client"
import HeroSection from "@/components/HeroSection";
import { Card, CardContent } from "@/components/ui/card";
import { features } from "@/data/features";
import { useTheme } from "next-themes";

export default function Home() {
  const { resolvedTheme } = useTheme();
  
  return (
    <div>
      <div className={`grid-background ${resolvedTheme === 'dark' ? 'grid-background-dark' : 'grid-background-light'}`}></div>
      <HeroSection />
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-center mb-12">Powerful Features for Your Career Growth</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              return (
                <Card className="border-2" key={index}>
                  <CardContent className="pt-6 text-center flex flex-col items-center justify-between">
                    <div className="flex flex-col items-center justify-center">
                      {feature.icon}
                      <h3 className="text-xl font-bold mb-2 ">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
