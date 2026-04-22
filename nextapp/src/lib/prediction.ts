const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type PredictionFormData = {
  bp: string;
  sg: string;
  al: string;
  su: string;
  rbc: string;
  bu: string;
  sc: string;
  sod: string;
  pot: string;
  hemo: string;
  wbcc: string;
  rbcc: string;
  htn: string;
};

export type PredictionPayload = {
  Bp: number;
  Sg: number;
  Al: number;
  Su: number;
  Rbc: number;
  Bu: number;
  Sc: number;
  Sod: number;
  Pot: number;
  Hemo: number;
  Wbcc: number;
  Rbcc: number;
  Htn: number;
};

export type PredictionResponse = {
  prediction: 0 | 1;
  confidence: number;
  probabilities: [number, number];
};

export const initialPredictionFormData: PredictionFormData = {
  bp: "",
  sg: "",
  al: "",
  su: "",
  rbc: "",
  bu: "",
  sc: "",
  sod: "",
  pot: "",
  hemo: "",
  wbcc: "",
  rbcc: "",
  htn: "",
};

const predictionFieldDefinitions = [
  { formKey: "bp", payloadKey: "Bp", label: "Blood Pressure" },
  { formKey: "sg", payloadKey: "Sg", label: "Specific Gravity" },
  { formKey: "al", payloadKey: "Al", label: "Albumin" },
  { formKey: "su", payloadKey: "Su", label: "Sugar" },
  { formKey: "rbc", payloadKey: "Rbc", label: "Red Blood Cells" },
  { formKey: "bu", payloadKey: "Bu", label: "Blood Urea" },
  { formKey: "sc", payloadKey: "Sc", label: "Serum Creatinine" },
  { formKey: "sod", payloadKey: "Sod", label: "Sodium" },
  { formKey: "pot", payloadKey: "Pot", label: "Potassium" },
  { formKey: "hemo", payloadKey: "Hemo", label: "Hemoglobin" },
  { formKey: "wbcc", payloadKey: "Wbcc", label: "WBC Count" },
  { formKey: "rbcc", payloadKey: "Rbcc", label: "RBC Count" },
  { formKey: "htn", payloadKey: "Htn", label: "Hypertension" },
] as const;

export const predictionFieldCount = predictionFieldDefinitions.length;

export function buildPredictionPayload(formData: PredictionFormData): PredictionPayload {
  const payloadEntries = predictionFieldDefinitions.map(({ formKey, payloadKey, label }) => {
    const rawValue = formData[formKey].trim();

    if (rawValue === "") {
      throw new Error(`${label} is required.`);
    }

    const numericValue = Number(rawValue);

    if (Number.isNaN(numericValue)) {
      throw new Error(`${label} must be a valid number.`);
    }

    return [payloadKey, numericValue] as const;
  });

  return Object.fromEntries(payloadEntries) as PredictionPayload;
}

export async function requestPrediction(
  payload: PredictionPayload,
): Promise<PredictionResponse> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(
      `Unable to connect to the prediction service. Confirm the backend is running at ${API_URL}.`,
    );
  }

  const rawBody = await response.text();
  const data = rawBody ? parseJsonSafely(rawBody) : null;

  if (!response.ok) {
    throw new Error(getPredictionErrorMessage(data, response.status));
  }

  return parsePredictionResponse(data);
}

function parseJsonSafely(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function getPredictionErrorMessage(data: unknown, status: number): string {
  if (data && typeof data === "object" && "detail" in data) {
    const { detail } = data as { detail?: unknown };

    if (typeof detail === "string" && detail.trim()) {
      return detail;
    }

    if (Array.isArray(detail)) {
      const messages = detail.flatMap((item) => {
        if (item && typeof item === "object" && "msg" in item) {
          const { msg } = item as { msg?: unknown };

          if (typeof msg === "string" && msg.trim()) {
            return msg;
          }
        }

        return [];
      });

      if (messages.length > 0) {
        return messages.join(" ");
      }
    }
  }

  if (typeof data === "string" && data.trim()) {
    return data;
  }

  if (status >= 500) {
    return "The prediction service returned a server error. Please try again in a moment.";
  }

  return `Prediction request failed with status ${status}. Review the inputs and try again.`;
}

function parsePredictionResponse(data: unknown): PredictionResponse {
  if (!data || typeof data !== "object") {
    throw new Error("Prediction service returned an unexpected response.");
  }

  const {
    prediction,
    confidence,
    probabilities,
  } = data as {
    prediction?: unknown;
    confidence?: unknown;
    probabilities?: unknown;
  };

  if (prediction !== 0 && prediction !== 1) {
    throw new Error("Prediction service returned an invalid prediction value.");
  }

  if (typeof confidence !== "number" || Number.isNaN(confidence)) {
    throw new Error("Prediction service returned an invalid confidence value.");
  }

  if (!Array.isArray(probabilities) || probabilities.length < 2) {
    throw new Error("Prediction service returned invalid probability data.");
  }

  const lowerRiskProbability = probabilities[0];
  const higherRiskProbability = probabilities[1];

  if (
    typeof lowerRiskProbability !== "number" ||
    Number.isNaN(lowerRiskProbability) ||
    typeof higherRiskProbability !== "number" ||
    Number.isNaN(higherRiskProbability)
  ) {
    throw new Error("Prediction service returned invalid probability values.");
  }

  return {
    prediction,
    confidence,
    probabilities: [lowerRiskProbability, higherRiskProbability],
  };
}
