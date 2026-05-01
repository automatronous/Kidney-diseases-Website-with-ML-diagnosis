"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { clsx } from "clsx";
import type { KidneyDisease } from "@/data/education";
import Image from "next/image";

export default function DiseaseCard({ disease }: { disease: KidneyDisease }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={clsx(
      "border bg-transparent transition-all duration-300 rounded-xl overflow-hidden mb-4",
      isOpen ? "border-primary/50 shadow-md shadow-primary/5" : "border-border hover:border-primary/30"
    )}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "w-full flex items-center justify-between p-5 text-left focus:outline-none transition-colors duration-300",
          isOpen ? "bg-secondary/30" : "hover:bg-secondary/10"
        )}
      >
        <span className="text-lg font-bold text-primary">{disease.title}</span>
        <ChevronDown 
          className={clsx(
            "w-5 h-5 text-foreground/50 transition-transform duration-300",
            isOpen && "rotate-180"
          )} 
        />
      </button>
      
      <div 
        className={clsx(
          "grid transition-all duration-500 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="p-5 pt-0 border-t border-border mt-5 flex flex-col md:flex-row gap-8">
            
            {/* Image Area */}
            <div className="w-full md:w-1/3 flex-shrink-0">
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-secondary/20 border border-border/50 shadow-sm group">
                <Image
                  src={disease.image}
                  alt={disease.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  onError={(e) => {
                    // Simple fallback if image fails to load gracefully
                    e.currentTarget.style.opacity = '0';
                    e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center', 'bg-secondary/40');
                    e.currentTarget.parentElement?.setAttribute('data-error', 'true');
                  }}
                />
                {/* Fallback Icon/Text that shows if image is missing (assuming it is transparent or not loaded) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-50 -z-10 group-data-[error=true]:z-10">
                  <span className="text-sm font-medium">Image Placeholder</span>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="w-full md:w-2/3">
              <p className="text-foreground/80 leading-relaxed mb-6 text-sm">{disease.shortDescription}</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-primary mb-2 text-sm uppercase tracking-wider">Common Causes</h4>
                  <ul className="space-y-1.5 mb-4">
                    {disease.causes.map((cause, i) => (
                      <li key={i} className="text-foreground/70 text-sm flex gap-2">
                        <span className="text-primary">•</span>{cause}
                      </li>
                    ))}
                  </ul>
                  
                  <h4 className="font-bold text-primary mb-2 text-sm uppercase tracking-wider">Symptoms</h4>
                  <ul className="space-y-1.5">
                    {disease.symptoms.map((sym, i) => (
                      <li key={i} className="text-foreground/70 text-sm flex gap-2">
                        <span className="text-primary">•</span>{sym}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-primary mb-2 text-sm uppercase tracking-wider">Prevention</h4>
                  <ul className="space-y-1.5 mb-4">
                    {disease.prevention.map((prev, i) => (
                      <li key={i} className="text-foreground/70 text-sm flex gap-2">
                        <span className="text-primary">•</span>{prev}
                      </li>
                    ))}
                  </ul>

                  <h4 className="font-bold text-primary mb-2 text-sm uppercase tracking-wider">Medical Care</h4>
                  <p className="text-foreground/70 leading-relaxed text-sm">{disease.medicalCare}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
