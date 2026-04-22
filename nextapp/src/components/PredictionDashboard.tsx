"use client";

import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  Beaker,
  CheckCircle2,
  Droplet,
  HeartPulse,
  Loader2,
} from "lucide-react";
import { clsx } from "clsx";
import {
  buildPredictionPayload,
  initialPredictionFormData,
  predictionFieldCount,
  requestPrediction,
  type PredictionFormData,
  type PredictionResponse,
} from "@/lib/prediction";

const percentFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

function formatPercent(value: number) {
  return `${percentFormatter.format(value)}%`;
}

function clampPercent(value: number) {
  return Math.min(Math.max(value, 0), 100);
}

export default function PredictionDashboard() {
  const [formData, setFormData] = useState<PredictionFormData>(initialPredictionFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const calculateProgress = () => {
    const filled = Object.values(formData).filter((value) => value !== "").length;
    return Math.round((filled / predictionFieldCount) * 100);
  };

  const progress = calculateProgress();
  const isComplete = progress === 100;

  const handleInputChange = (field: keyof PredictionFormData, value: string) => {
    setFormData((previous) => ({ ...previous, [field]: value }));
    setErrorMessage(null);
    setResult(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setResult(null);
    setErrorMessage(null);

    try {
      const payload = buildPredictionPayload(formData);
      const prediction = await requestPrediction(payload);
      setResult(prediction);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to run the prediction right now. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isHighRisk = result?.prediction === 1;
  const confidence = result ? clampPercent(result.confidence) : 0;
  const lowerRiskProbability = result ? clampPercent(result.probabilities[0] * 100) : 0;
  const higherRiskProbability = result ? clampPercent(result.probabilities[1] * 100) : 0;

  return (
    <div className="flex flex-col lg:flex-row gap-16 items-start">
      {/* Left Column: Form */}
      <div className="w-full lg:w-2/3">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold text-primary">Clinical Assessment</h2>
            <p className="text-foreground/60 text-sm mt-1">Provide the 13 required parameters.</p>
          </div>
          <div className="text-right">
            <span className="text-xl font-bold text-foreground">{progress}%</span>
          </div>
        </div>

        <form id="prediction-form" onSubmit={handleSubmit} className="space-y-12">
          <fieldset disabled={isSubmitting} className="space-y-12">
            {/* Group 1: Vitals */}
            <div>
              <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
                <HeartPulse className="w-5 h-5 opacity-50" />
                Clinical Vitals
              </h3>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-foreground/50 mb-2">
                    Blood Pressure (Bp)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      className="form-input"
                      placeholder="e.g. 80"
                      value={formData.bp}
                      onChange={(e) => handleInputChange("bp", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-foreground/50 mb-2">
                    Hypertension (Htn)
                  </label>
                  <select
                    className="form-input"
                    value={formData.htn}
                    onChange={(e) => handleInputChange("htn", e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Group 2: Urinalysis */}
            <div className="pt-8 border-t border-border">
              <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
                <Droplet className="w-5 h-5 opacity-50" />
                Urinalysis
              </h3>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-foreground/50 mb-2">
                    Specific Gravity (Sg)
                  </label>
                  <select
                    className="form-input"
                    value={formData.sg}
                    onChange={(e) => handleInputChange("sg", e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="1.005">1.005</option>
                    <option value="1.010">1.010</option>
                    <option value="1.015">1.015</option>
                    <option value="1.020">1.020</option>
                    <option value="1.025">1.025</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-foreground/50 mb-2">
                    Albumin (Al)
                  </label>
                  <select
                    className="form-input"
                    value={formData.al}
                    onChange={(e) => handleInputChange("al", e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-foreground/50 mb-2">
                    Sugar (Su)
                  </label>
                  <select
                    className="form-input"
                    value={formData.su}
                    onChange={(e) => handleInputChange("su", e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-foreground/50 mb-2">
                    Red Blood Cells (Rbc)
                  </label>
                  <select
                    className="form-input"
                    value={formData.rbc}
                    onChange={(e) => handleInputChange("rbc", e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="1">Normal</option>
                    <option value="0">Abnormal</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Group 3: Blood Chemistry */}
            <div className="pt-8 border-t border-border">
              <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
                <Beaker className="w-5 h-5 opacity-50" />
                Blood Chemistry
              </h3>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-foreground/50 mb-2">
                    Blood Urea (Bu)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    className="form-input"
                    placeholder="e.g. 36"
                    value={formData.bu}
                    onChange={(e) => handleInputChange("bu", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-foreground/50 mb-2">
                    Serum Creatinine (Sc)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    className="form-input"
                    placeholder="e.g. 1.2"
                    value={formData.sc}
                    onChange={(e) => handleInputChange("sc", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-foreground/50 mb-2">
                    Sodium (Sod)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    className="form-input"
                    placeholder="e.g. 138"
                    value={formData.sod}
                    onChange={(e) => handleInputChange("sod", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-foreground/50 mb-2">
                    Potassium (Pot)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    className="form-input"
                    placeholder="e.g. 4.4"
                    value={formData.pot}
                    onChange={(e) => handleInputChange("pot", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Group 4: Complete Blood Count */}
            <div className="pt-8 border-t border-border">
              <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 opacity-50" />
                Complete Blood Count
              </h3>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-foreground/50 mb-2">
                    Hemoglobin (Hemo)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    className="form-input"
                    placeholder="e.g. 15.4"
                    value={formData.hemo}
                    onChange={(e) => handleInputChange("hemo", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-foreground/50 mb-2">
                    WBC Count (Wbcc)
                  </label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="e.g. 7800"
                    value={formData.wbcc}
                    onChange={(e) => handleInputChange("wbcc", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-foreground/50 mb-2">
                    RBC Count (Rbcc)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    className="form-input"
                    placeholder="e.g. 5.2"
                    value={formData.rbcc}
                    onChange={(e) => handleInputChange("rbcc", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </fieldset>
        </form>
      </div>

      {/* Right Column: Minimal Result Widget */}
      <div className="w-full lg:w-1/3 sticky top-32">
        <div className="border border-border p-8 bg-secondary/10" aria-live="polite" aria-busy={isSubmitting}>
          <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/50 mb-8 border-b border-border pb-4">
            Analysis Summary
          </h3>

          <div>
            {isSubmitting ? (
              <div className="py-8">
                <div className="flex items-center gap-3 text-sm font-medium text-foreground/70">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Running prediction against the FastAPI backend...
                </div>
                <p className="text-foreground/60 text-sm leading-relaxed mt-4">
                  Submitting the 13 validated inputs and waiting for the model to return a
                  prediction, confidence, and probability scores.
                </p>
              </div>
            ) : errorMessage ? (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 py-4" role="alert">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-destructive">
                      Prediction unavailable
                    </h4>
                    <p className="text-sm text-foreground/70 leading-relaxed">{errorMessage}</p>
                  </div>
                </div>
              </div>
            ) : !result ? (
              <div className="py-8">
                <p className="text-foreground/60 text-sm leading-relaxed">
                  Awaiting complete parameters. Fill out all 13 fields to generate an experimental AI prediction.
                </p>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-700 py-4">
                <div className="flex items-start gap-3">
                  {isHighRisk ? (
                    <AlertTriangle className="w-5 h-5 text-destructive mt-1 shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-success mt-1 shrink-0" />
                  )}
                  <div>
                    <h4
                      className={clsx(
                        "text-xl font-bold mb-2",
                        isHighRisk ? "text-destructive" : "text-success",
                      )}
                    >
                      {isHighRisk
                        ? "Higher-risk profile: possible CKD"
                        : "Lower-risk profile: no CKD indicated"}
                    </h4>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {isHighRisk
                        ? "The submitted values matched a higher-risk CKD pattern in the model output. Please review this with a qualified clinician."
                        : "The submitted values did not match the model’s CKD pattern. Clinical context still matters and normal-looking output does not replace medical review."}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex justify-between text-xs font-bold text-foreground/50 uppercase tracking-widest mb-3">
                    <span>Prediction Output</span>
                    <span className="text-primary">{result.prediction}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-foreground/50 uppercase tracking-widest mb-3">
                    <span>Model Confidence</span>
                    <span className="text-primary">{formatPercent(confidence)}</span>
                  </div>
                  <div className="w-full h-1 bg-border rounded-none overflow-hidden">
                    <div
                      className={clsx(
                        "h-full transition-all duration-1000",
                        isHighRisk ? "bg-destructive" : "bg-success",
                      )}
                      style={{ width: `${confidence}%` }}
                    />
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-foreground/50 uppercase tracking-widest mb-3">
                      <span>Lower Risk / No CKD</span>
                      <span className="text-primary">{formatPercent(lowerRiskProbability)}</span>
                    </div>
                    <div className="w-full h-1 bg-border rounded-none overflow-hidden">
                      <div
                        className="h-full transition-all duration-1000 bg-success"
                        style={{ width: `${lowerRiskProbability}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-foreground/50 uppercase tracking-widest mb-3">
                      <span>Higher Risk / Possible CKD</span>
                      <span className="text-primary">{formatPercent(higherRiskProbability)}</span>
                    </div>
                    <div className="w-full h-1 bg-border rounded-none overflow-hidden">
                      <div
                        className="h-full transition-all duration-1000 bg-destructive"
                        style={{ width: `${higherRiskProbability}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              form="prediction-form"
              disabled={isSubmitting || !isComplete}
              className={clsx(
                "w-full mt-8 py-3 font-bold transition-all text-sm uppercase tracking-widest",
                isSubmitting
                  ? "bg-secondary text-foreground/40 cursor-not-allowed"
                  : !isComplete
                    ? "bg-secondary text-foreground/40 cursor-not-allowed"
                    : "bg-primary text-primary-foreground hover:bg-primary/90",
              )}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Running Prediction
                </span>
              ) : (
                "Run Prediction"
              )}
            </button>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-foreground/50 leading-relaxed uppercase tracking-wider">
                <strong>Notice:</strong> Educational tool only. This is not a medical diagnosis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
