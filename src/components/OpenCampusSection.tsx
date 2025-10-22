// src/sections/OpenCampusSection/index.tsx
import React from "react";
import BlogCard from "@/components/BlogCard"; // Reusing the unified BlogCard
import { SquareMenu, School, Users, Blocks, TextQuote } from "lucide-react"; // Use lucide-react icons for consistency

// Data Array for List Items
const listItems = [
    { text: "Understand which certification is right for you", icon: <SquareMenu className="text-[#0C868D] w-6 h-6" /> },
    { text: "Know the top certifications to propel your career", icon: <School className="text-[#0C868D] w-6 h-6" /> },
    { text: "Get tips from experts to excel in certification exams", icon: <Users className="text-[#0C868D] w-6 h-6" /> },
    { text: "Access useful toolkits to practice for certification exams", icon: <Blocks className="text-[#0C868D] w-6 h-6" /> },
    { text: "Be aware of the latest exam trends and patterns", icon: <TextQuote className="text-[#0C868D] w-6 h-6" /> },
];

interface OpenCampusSectionProps {
    posts: any[];
}

const OpenCampusSection: React.FC<OpenCampusSectionProps> = ({posts}) => {

    const getStringPath = (post_url: string) => {
        // Correctly generate the relative path for OpenCampus blogs
        return post_url.replace("https://www.greycampus.com/opencampus/", "/opencampus/");
    };

    return (
        <>
 
         <section className="bg-gradient-hero px-[20px] py-[50px] md:px-[30px] md:py-[70px]">
        <div className="container max-w-7xl mx-auto">

             <h1 className="text-4xl sm:text-5xl md:text-4xl lg:text-5xl font-bold text-dark-gray leading-tight mb-3">
                The {' '}
                <span className="text-gradient">OpenCampus</span>
              </h1>

              <p className="text-base md:text-lg text-medium-gray leading-relaxed max-w-4xl mb-4">
                The largest resource library on professional certifications
              </p>

                <ul className="space-y-3">
                        {listItems.map((item, index) => (
                            <li key={index} className="flex items-start">
                                <span className="mr-3 shrink-0">{item.icon}</span>
                                <span className="text-base">{item.text}</span>
                            </li>
                        ))}
                    </ul>

        </div>
        </section>


   <section className="bg-white px-[20px] py-[50px] md:px-[30px] md:py-[70px]">
        <div className="container max-w-7xl mx-auto">
            {/* Blog List Section: Using the Tailwind Grid Layout */}
            <div className="flex flex-col items-center bg-white px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
                    {posts?.map((item: any) => {
                        const relativePath = getStringPath(item.post_url);
                        
                        return (
                            <div key={item.id} className="w-full">
                                <BlogCard 
                                    {...item} 
                                    onReadMorePath={relativePath} 
                                    isOpenCampusBlog={true} // Important flag for data mapping
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
        </section>
        </>
    );
};

export default OpenCampusSection;