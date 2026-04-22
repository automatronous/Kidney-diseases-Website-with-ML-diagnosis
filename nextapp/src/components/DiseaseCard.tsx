"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { clsx } from "clsx";
import type { KidneyDisease } from "@/data/education";

export default function DiseaseCard({ disease }: { disease: KidneyDisease }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border bg-transparent transition-colors duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left focus:outline-none focus-visible:bg-secondary/50"
      >
        <span className="text-lg font-bold text-primary">{disease.name}</span>
        <ChevronDown 
          className={clsx(
            "w-5 h-5 text-foreground/50 transition-transform duration-300",
            isOpen && "rotate-180"
          )} 
        />
      </button>
      
      <div 
        className={clsx(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="p-5 pt-0 border-t border-border">
          <p className="text-foreground/80 leading-relaxed mb-6 text-sm">{disease.description}</p>
          
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
              <p className="text-foreground/70 leading-relaxed text-sm">{disease.whenToSeekCare}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
