"use client";

import { Industry } from "@/types/industry";
import React, { useState, useEffect } from "react"; // Add useEffect
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema } from "@/lib/zodSchema";
// import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTheme } from "next-themes";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface OnboardingFormValues {
  industry: string;
  subIndustry: string;
  bio: string;
  experience: number;
  skills: string[];
}

interface OnboardingFormProps {
  industries: Industry[];
}

const OnboardingForm = ({ industries }: OnboardingFormProps) => {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const { resolvedTheme } = useTheme();
  // const router = useRouter();
  const [isMounted, setIsMounted] = useState(false); // Add mounted state

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
  });

  const watchIndustry = watch("industry");

  // Check if the component is mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = async (values: OnboardingFormValues) => {
    try {
      if (!values.industry || !values.subIndustry) {
        throw new Error("Industry and SubIndustry are required.");
      }

      const formattedIndustry = `${values.industry}-${values.subIndustry.toLowerCase().replace(/ /g, "-")}`;
      setUpdateLoading(true);
      await updateUser({
        data: {
          industry: formattedIndustry,
          experience: values.experience,
          bio: values.bio,
          skills: values.skills,
        },
      });
      toast.success("Profile Completed Successfully");

      // Ensure router is mounted before pushing
      if (isMounted) {
        // router.push("/dashboard");
      }
    } catch (error) {
      console.error("Onboarding Error", error);
      toast.error("Failed to update profile. Please check your inputs.");
    } finally {
      setUpdateLoading(false);
    }
  };

  if (!isMounted) {
    return null; // Render nothing until the component is mounted
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className={`grid-background ${
          resolvedTheme === "dark" ? "grid-background-dark" : "grid-background-light"
        }`}
      ></div>
      <Card className="w-full max-w-sm md:max-w-lg mt-10 mx-2">
        <CardHeader>
          <CardTitle
            className={`${resolvedTheme === "dark" ? "gradient-title-dark" : "gradient-title-light"} text-center text-3xl md:text-4xl`}
          >
            Complete your profile
          </CardTitle>
          <CardDescription>
            Select your industry to get personalized career insights and recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-1">
              <Label className="ml-1" htmlFor="industry">
                Industry
              </Label>
              <Select
                onValueChange={(value) => {
                  setValue("industry", value);
                  const selected = industries.find((ind) => ind.id === value);
                  setSelectedIndustry(selected || null);
                  setValue("subIndustry", "");
                }}
              >
                <SelectTrigger id="industry">
                  <SelectValue placeholder={"Select an Industry"} />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((ind) => (
                    <SelectItem key={ind.id} value={ind.id}>
                      {ind.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {typeof errors?.industry?.message === "string" && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.industry.message}
                </p>
              )}
            </div>

            {watchIndustry && (
              <div className="space-y-1">
                <Label className="ml-1" htmlFor="subIndustry">
                  SubIndustry
                </Label>
                <Select onValueChange={(value) => setValue("subIndustry", value)}>
                  <SelectTrigger id="industry">
                    <SelectValue placeholder={"Select an Industry"} />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedIndustry?.subIndustries.map((ind) => (
                      <SelectItem key={ind} value={ind}>
                        {ind}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {typeof errors?.subIndustry?.message === "string" && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.subIndustry.message}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                min="0"
                max="50"
                placeholder="Enter years of experience"
                {...register("experience")}
              />
              {typeof errors?.experience?.message === "string" && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.experience.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label className="ml-1" htmlFor="experience">
                Skills
              </Label>
              <Input
                id="skills"
                placeholder="e.g Java, TypeScript, Project Management"
                {...register("skills")}
              />
              <p className="ml-1 text-sm text-muted-foreground">
                Seperate multiple skills with comma
              </p>
              {typeof errors?.skills?.message === "string" && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.skills.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label className="ml-1" htmlFor="bio">
                Professional Bio
              </Label>
              <Textarea
                id="bio"
                placeholder="Tell us about your professional background"
                className="h-32"
                {...register("bio")}
              />
              {typeof errors?.bio?.message === "string" && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.bio.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={updateLoading}>
              {updateLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Complete Profile"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;