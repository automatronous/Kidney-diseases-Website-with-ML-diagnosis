import PredictionDashboard from "@/components/PredictionDashboard";

export default function AssessmentPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-500">
      <div className="pt-24 pb-16 border-b border-border">
        <div className="editorial-container max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-primary">
            Prediction Tool
          </h1>
          <p className="text-lg text-foreground/70 leading-relaxed font-normal">
            Enter clinical parameters to simulate an AI-assisted diagnostic prediction. This tool is built strictly for educational demonstration.
          </p>
        </div>
      </div>

      <div className="editorial-container py-16">
        <PredictionDashboard />
      </div>
    </div>
  );
}
