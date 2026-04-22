import Link from "next/link";
import { diseases, preventionSteps, symptomsList, faqs } from "@/data/education";
import DiseaseCard from "@/components/DiseaseCard";
import { ArrowRight, Beaker } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-500">
      
      {/* Ultra-Minimal Hero Section */}
      <section className="pt-24 pb-16 border-b border-border">
        <div className="editorial-container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight tracking-tight">
              Kidney Health Education
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 mb-10 leading-relaxed font-normal">
              Clear, approachable information to help you recognize warning signs, understand common conditions, and take practical steps to protect your kidneys.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#conditions" className="btn-primary">
                Explore Conditions
              </Link>
              <Link href="/assessment" className="btn-outline gap-2">
                <Beaker className="w-5 h-5 opacity-70" />
                Prediction Tool
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Educational Content */}
      <div className="editorial-container py-16">
        
        {/* Intro Text Blocks */}
        <div className="grid md:grid-cols-3 gap-12 mb-20">
          <div>
            <h3 className="text-lg font-bold text-primary mb-3">Vital Function</h3>
            <p className="text-foreground/70 leading-relaxed text-sm">
              Your kidneys filter half a cup of blood every minute, removing wastes and extra water to produce urine.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary mb-3">Silent Progression</h3>
            <p className="text-foreground/70 leading-relaxed text-sm">
              Early kidney disease often has no symptoms. Routine blood and urine testing are crucial for early detection.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary mb-3">Prevention is Key</h3>
            <p className="text-foreground/70 leading-relaxed text-sm">
              Managing blood pressure and blood sugar are the two most critical steps in preventing long-term kidney damage.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          <main className="lg:w-2/3 space-y-20">
            
            {/* Diseases Section */}
            <section id="conditions" className="scroll-mt-32">
              <div className="mb-8">
                <h2 className="section-title">Common Conditions</h2>
                <p className="section-subtitle">
                  Learn about the major forms of kidney disease, their underlying causes, and standard medical approaches.
                </p>
              </div>
              <div className="space-y-4">
                {diseases.map((disease) => (
                  <DiseaseCard key={disease.id} disease={disease} />
                ))}
              </div>
            </section>

            {/* Prevention Section */}
            <section id="prevention" className="scroll-mt-32">
              <div className="mb-8">
                <h2 className="section-title">Lifestyle & Prevention</h2>
                <p className="section-subtitle">
                  Practical, daily habits that can significantly reduce your risk of developing chronic kidney disease.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
                {preventionSteps.map((step, index) => (
                  <div key={index} className="border-t border-border pt-4">
                    <h3 className="font-bold text-primary mb-2 text-base">{step.title}</h3>
                    <p className="text-foreground/70 leading-relaxed text-sm">{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Sidebar */}
          <aside className="lg:w-1/3">
            <div className="sticky top-32 space-y-12">
              
              {/* Callout to ML Tool */}
              <div className="border border-border bg-secondary/30 p-8 rounded-none">
                <h3 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
                  <Beaker className="w-5 h-5 opacity-70" />
                  Prediction Tool
                </h3>
                <p className="text-foreground/70 leading-relaxed mb-6 text-sm">
                  Have recent lab results? Try our experimental machine learning diagnostic assistant to explore how your clinical data correlates with disease risk.
                </p>
                <Link href="/assessment" className="btn-primary w-full group">
                  Open Tool
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <p className="text-xs text-foreground/50 mt-4 text-center">
                  Not a medical diagnosis. Educational use only.
                </p>
              </div>

              {/* Warning Signs */}
              <div className="border-t border-border pt-8">
                <h3 className="font-bold text-primary mb-6 text-lg">
                  General Warning Signs
                </h3>
                <ul className="space-y-3">
                  {symptomsList.map((symptom, i) => (
                    <li key={i} className="flex gap-3 text-foreground/70 text-sm leading-relaxed">
                      <span className="text-primary mt-0.5">•</span>
                      {symptom}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
