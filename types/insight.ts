import { Id } from "@/convex/_generated/dataModel";
import { Salary } from "./salary";

export type Insight = {
  id : Id<"industryInsights">;
  industry : string;
  creationTime : number;
  demandLevel : "High" | "Medium" | "Low";
  growthRate : number;
  keyTrends : string[];
  lastUpdated : number;
  marketOutlook : "Positive" | "Negative" | "Neutral"
  nextUpdate : number;
  recommendedSkills : string[];
  salaryRanges : Salary[];
  topSkills : string[]
}