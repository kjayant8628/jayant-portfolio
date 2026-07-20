"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeading } from "@/components/sections/section-heading";
import { TechStackGrid } from "@/components/sections/tech-stack";
import { ExperienceList } from "@/components/sections/experience";

export function SkillsExperience() {
  return (
    <section id="skills" className="border-t border-border py-28">
      <div className="container">
        <Tabs defaultValue="stack">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Skills & experience"
              title="What I know, and where I've applied it"
              description="Tech stack grouped by depth, and roles you can expand for the specific work — not just the title."
            />
            <TabsList className="shrink-0">
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="stack">Tech stack</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="stack" className="mt-12">
            <TechStackGrid />
          </TabsContent>
          <TabsContent value="experience" className="mt-12">
            <ExperienceList />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
