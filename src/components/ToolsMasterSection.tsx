"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface Tool {
  path: string;
  name: string;
}

interface ToolsMasterSectionProps {
  sectionClass?: string
  title?: string;
  subtitle?: string;
  tools: Tool[];
}

const ToolsMasterSection = ({
  title = "Tools You Will Master",
  subtitle = "Our comprehensive curriculum teaches you the most in-demand tools used worldwide",
  tools,
  sectionClass
}: ToolsMasterSectionProps) => {
  return (
    <section className={`py-16 md:py-24 ${sectionClass || ''}`}>
      <div className="container max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium">
            Industry Tools
          </span>

          <h2 className="text-3xl md:text-4xl font-bold mt-4 text-gray-900">
            {title.split(" ")[0]}{" "}
            <span className="text-blue-600">
              {title.replace(title.split(" ")[0], "")}
            </span>
          </h2>

          <p className="text-gray-500 mt-3 mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {tools.map((tool, index) => (
            <Card
              key={index}
              className="border border-gray-200 shadow-sm hover:shadow-lg transition rounded-xl"
            >
              <CardContent className="p-6 flex flex-col items-center justify-center">
                <div className="w-16 h-16 relative mb-4">
                  <Image
                    src={tool.path}
                    alt={tool.name}
                    fill
                    className="object-contain"
                  />
                </div>

                <h3 className="text-gray-900 font-medium text-sm md:text-base text-center">
                  {tool.name}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsMasterSection;
