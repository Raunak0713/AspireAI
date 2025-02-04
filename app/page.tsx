"use client"
import HeroSection from "@/components/HeroSection";
import { useTheme } from "next-themes";

export default function Home() {
  const { resolvedTheme } = useTheme();
  
  return (
    <div>
      <div className={`grid-background ${resolvedTheme === 'dark' ? 'grid-background-dark' : 'grid-background-light'}`}></div>
      <HeroSection />
    </div>
  );
}
