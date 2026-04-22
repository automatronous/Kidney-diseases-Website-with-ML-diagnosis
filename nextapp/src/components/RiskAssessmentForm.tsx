"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, ChevronRight, RotateCcw } from "lucide-react";
import { clsx } from "clsx";

type AssessmentData = {
  ageRange: string;
  gender: string;
  bloodPressure: string;
  diabetes: string;
  familyHistory: string;
  symptoms: string[];
};

export default function RiskAssessmentForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<AssessmentData>({
    ageRange: "",
    gender: "",
    bloodPressure: "",
    diabetes: "",
    familyHistory: "",
    symptoms: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<null | { riskLevel: string; message: string }>(null);

  const totalSteps = 4;

  const handleNext = () => setStep((s) => Math.min(s + 1, totalSteps));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  const updateForm = (key: keyof AssessmentData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleSymptom = (symptom: string) => {
    setFormData((prev) => {
      const exists = prev.symptoms.includes(symptom);
      if (exists) {
        return { ...prev, symptoms: prev.symptoms.filter((s) => s !== symptom) };
      }
      return { ...prev, symptoms: [...prev.symptoms, symptom] };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate an API call
    setTimeout(() => {
      setIsSubmitting(false);
      let riskLevel = "Low";
      if (formData.diabetes === "yes" || formData.bloodPressure === "yes") {
        riskLevel = "Moderate";
      }
      if (formData.symptoms.length > 2 || (formData.diabetes === "yes" && formData.bloodPressure === "yes")) {
        riskLevel = "High";
      }
      setResult({
        riskLevel,
        message: "Based on the educational data provided, you have selected factors commonly associated with kidney health risks. This is not a diagnosis. Please discuss these results with a certified healthcare provider.",
      });
    }, 1500);
  };

  if (result) {
    const isHigh = result.riskLevel === 'High';
    const isModerate = result.riskLevel === 'Moderate';
    
    return (
      <div className="clinical-card max-w-2xl mx-auto overflow-hidden">
        <div className={clsx(
          "p-8 border-b",
          isHigh ? "bg-red-50 dark:bg-red-950/20 border-red-100 dark:border-red-900" :
          isModerate ? "bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900" :
          "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900"
        )}>
          <div className="flex items-center gap-4 mb-4">
            {isHigh ? <AlertCircle className="w-10 h-10 text-destructive" /> : <CheckCircle2 className="w-10 h-10 text-success" />}
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider opacity-70 mb-1">Assessment Complete</p>
              <h2 className="text-2xl font-bold text-primary">
                Risk Profile: <span className={clsx(isHigh ? "text-destructive" : isModerate ? "text-warning" : "text-success")}>{result.riskLevel}</span>
              </h2>
            </div>
          </div>
          <p className="text-foreground/80 leading-relaxed text-sm">
            {result.message}
          </p>
        </div>
        
        <div className="p-8">
          <h3 className="font-semibold text-primary mb-4 text-lg">Recommended Next Steps</h3>
          <ul className="space-y-4 text-sm text-foreground/80">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
              Schedule an appointment with your primary care physician to discuss your risk factors.
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
              Request a routine blood test (eGFR) to check how well your kidneys are filtering.
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
              Ask about a simple urine test to check for protein (albuminuria).
            </li>
          </ul>
          
          <div className="mt-10 pt-6 border-t border-border">
            <button 
              onClick={() => { setResult(null); setStep(1); setFormData({ ageRange: "", gender: "", bloodPressure: "", diabetes: "", familyHistory: "", symptoms: [] }); }}
              className="btn-outline w-full gap-2 text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Start New Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="clinical-card max-w-2xl mx-auto p-8">
      {/* Header & Progress */}
      <div className="mb-10">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="text-2xl font-bold text-primary">Risk Assessment</h2>
            <p className="text-sm text-foreground/60 mt-1">Step {step} of {totalSteps}</p>
          </div>
          <span className="text-sm font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
            {Math.round((step / totalSteps) * 100)}%
          </span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-accent h-full transition-all duration-500 ease-out rounded-full" 
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={step === totalSteps ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
        <div className="min-h-[320px]">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">Demographic Information</h3>
                <p className="text-sm text-foreground/60 mb-6">Select the options that best describe you to help personalize the assessment.</p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-3">What is your age range?</label>
                    <select 
                      className="w-full p-3.5 rounded-lg border border-border bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-accent outline-none transition-shadow text-sm"
                      value={formData.ageRange}
                      onChange={(e) => updateForm('ageRange', e.target.value)}
                      required
                    >
                      <option value="" disabled>Select your age range</option>
                      <option value="Under 30">Under 30</option>
                      <option value="30-49">30-49</option>
                      <option value="50-64">50-64</option>
                      <option value="65+">65+</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-primary mb-3">Biological Sex</label>
                    <div className="grid grid-cols-2 gap-4">
                      {['Male', 'Female'].map(gender => (
                        <label key={gender} className={clsx(
                          "cursor-pointer p-4 rounded-xl border transition-all text-sm font-medium flex items-center justify-center",
                          formData.gender === gender 
                            ? "border-accent bg-accent/5 text-accent ring-1 ring-accent" 
                            : "border-border bg-slate-50 dark:bg-slate-800 text-foreground/80 hover:border-accent/50"
                        )}>
                          <input 
                            type="radio" 
                            name="gender" 
                            value={gender}
                            checked={formData.gender === gender}
                            onChange={(e) => updateForm('gender', e.target.value)}
                            className="sr-only"
                            required
                          />
                          {gender}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">Key Health Factors</h3>
                <p className="text-sm text-foreground/60 mb-6">These conditions are the two leading causes of chronic kidney disease.</p>

                <div className="space-y-8">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-3">Do you have high blood pressure?</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[{label: 'Yes', value: 'yes'}, {label: 'No', value: 'no'}, {label: 'Not Sure', value: 'unsure'}].map(opt => (
                        <label key={opt.value} className={clsx(
                          "cursor-pointer p-3 rounded-xl border transition-all text-sm font-medium text-center",
                          formData.bloodPressure === opt.value 
                            ? "border-accent bg-accent/5 text-accent ring-1 ring-accent" 
                            : "border-border bg-slate-50 dark:bg-slate-800 text-foreground/80 hover:border-accent/50"
                        )}>
                          <input 
                            type="radio" 
                            name="bloodPressure" 
                            value={opt.value}
                            checked={formData.bloodPressure === opt.value}
                            onChange={(e) => updateForm('bloodPressure', e.target.value)}
                            className="sr-only"
                            required
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-3">Do you have diabetes?</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[{label: 'Yes', value: 'yes'}, {label: 'No', value: 'no'}, {label: 'Not Sure', value: 'unsure'}].map(opt => (
                        <label key={opt.value} className={clsx(
                          "cursor-pointer p-3 rounded-xl border transition-all text-sm font-medium text-center",
                          formData.diabetes === opt.value 
                            ? "border-accent bg-accent/5 text-accent ring-1 ring-accent" 
                            : "border-border bg-slate-50 dark:bg-slate-800 text-foreground/80 hover:border-accent/50"
                        )}>
                          <input 
                            type="radio" 
                            name="diabetes" 
                            value={opt.value}
                            checked={formData.diabetes === opt.value}
                            onChange={(e) => updateForm('diabetes', e.target.value)}
                            className="sr-only"
                            required
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">Family History</h3>
                <p className="text-sm text-foreground/60 mb-6">Genetics can significantly influence your overall kidney health.</p>

                <div>
                  <label className="block text-sm font-medium text-primary mb-4 leading-relaxed">
                    Does anyone in your immediate family have kidney disease or kidney failure?
                  </label>
                  <div className="space-y-3">
                    {[{label: 'Yes', value: 'yes'}, {label: 'No', value: 'no'}, {label: 'Not Sure', value: 'unsure'}].map(opt => (
                      <label key={opt.value} className={clsx(
                        "cursor-pointer p-4 rounded-xl border transition-all text-sm font-medium flex items-center justify-between group",
                        formData.familyHistory === opt.value 
                          ? "border-accent bg-accent/5 text-accent ring-1 ring-accent" 
                          : "border-border bg-slate-50 dark:bg-slate-800 text-foreground/80 hover:border-accent/50"
                      )}>
                        <input 
                          type="radio" 
                          name="familyHistory" 
                          value={opt.value}
                          checked={formData.familyHistory === opt.value}
                          onChange={(e) => updateForm('familyHistory', e.target.value)}
                          className="sr-only"
                          required
                        />
                        {opt.label}
                        <div className={clsx(
                          "w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
                          formData.familyHistory === opt.value ? "border-accent" : "border-slate-300"
                        )}>
                          {formData.familyHistory === opt.value && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">Current Symptoms</h3>
                <p className="text-sm text-foreground/60 mb-6">Select any symptoms you are currently experiencing. Check all that apply.</p>

                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    'Fatigue or low energy', 
                    'Trouble sleeping', 
                    'Dry and itchy skin', 
                    'Need to urinate more often', 
                    'Blood or foam in urine', 
                    'Swollen feet or ankles',
                    'Puffiness around eyes',
                    'Poor appetite'
                  ].map(symptom => {
                    const isSelected = formData.symptoms.includes(symptom);
                    return (
                      <label key={symptom} className={clsx(
                        "cursor-pointer p-3.5 rounded-xl border transition-all text-sm font-medium flex items-start gap-3",
                        isSelected
                          ? "border-accent bg-accent/5 text-accent ring-1 ring-accent" 
                          : "border-border bg-slate-50 dark:bg-slate-800 text-foreground/80 hover:border-accent/50"
                      )}>
                        <div className={clsx(
                          "w-5 h-5 rounded border mt-0.5 flex items-center justify-center shrink-0 transition-colors",
                          isSelected ? "bg-accent border-accent" : "border-slate-300 bg-white dark:bg-slate-900"
                        )}>
                          {isSelected && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <input 
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSymptom(symptom)}
                          className="sr-only"
                        />
                        {symptom}
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 pt-6 border-t border-border flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrev}
            disabled={step === 1 || isSubmitting}
            className={clsx(
              "text-sm font-medium transition-colors px-4 py-2 rounded-lg -ml-4",
              step === 1 ? "text-transparent pointer-events-none" : "text-foreground/60 hover:text-primary hover:bg-secondary"
            )}
          >
            Back
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary group"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing
              </span>
            ) : step === totalSteps ? (
              'Complete Assessment'
            ) : (
              <span className="flex items-center gap-2">
                Continue
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
