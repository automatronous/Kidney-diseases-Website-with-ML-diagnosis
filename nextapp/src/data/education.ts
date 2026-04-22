export type KidneyDisease = {
  id: string;
  name: string;
  description: string;
  causes: string[];
  symptoms: string[];
  prevention: string[];
  whenToSeekCare: string;
  care?: string;
};

export const diseases: KidneyDisease[] = [
  {
    id: "ckd",
    name: "Chronic Kidney Disease (CKD)",
    description: "A long-term condition where the kidneys don't work as well as they should. It gradually worsens over time.",
    causes: ["High blood pressure", "Diabetes", "High cholesterol", "Kidney infections"],
    symptoms: ["Weight loss and poor appetite", "Swollen ankles, feet or hands", "Shortness of breath", "Tiredness", "Blood in urine"],
    prevention: ["Manage blood pressure and sugar", "Eat a healthy diet", "Stop smoking", "Exercise regularly"],
    whenToSeekCare: "If you experience persistent swelling, extreme fatigue, or changes in urination patterns, consult a doctor immediately."
  },
  {
    id: "aki",
    name: "Acute Kidney Injury (AKI)",
    description: "Sudden damage to the kidneys that causes them to stop working properly. It can range from minor loss of function to complete failure.",
    causes: ["Severe dehydration", "Reduced blood flow to kidneys", "Certain medications", "Severe infections (sepsis)"],
    symptoms: ["Decreased urine output", "Fluid retention", "Shortness of breath", "Confusion", "Nausea"],
    prevention: ["Stay hydrated during illness", "Avoid unnecessary NSAIDs", "Treat infections promptly"],
    whenToSeekCare: "AKI is a medical emergency. Seek immediate care if you stop urinating or experience severe confusion/shortness of breath."
  },
  {
    id: "stones",
    name: "Kidney Stones",
    description: "Hard deposits made of minerals and salts that form inside your kidneys.",
    causes: ["Dehydration", "Diet high in protein, salt, or sugar", "Obesity", "Digestive diseases"],
    symptoms: ["Severe, sharp pain in the side and back", "Pain radiating to the lower abdomen", "Pain or burning during urination", "Pink, red or brown urine"],
    prevention: ["Drink plenty of water", "Eat fewer oxalate-rich foods", "Choose a diet low in salt and animal protein"],
    whenToSeekCare: "Seek immediate attention if pain is so severe you can't sit still, accompanied by nausea, vomiting, fever, or chills."
  },
  {
    id: "uti",
    name: "Urinary Tract Infection (UTI)",
    description: "An infection in any part of the urinary system, the kidneys, bladder or urethra.",
    causes: ["Bacteria entering the urinary tract through the urethra", "Weakened immune system", "Urinary blockages"],
    symptoms: ["Strong, persistent urge to urinate", "Burning sensation when urinating", "Passing frequent, small amounts of urine", "Cloudy or strong-smelling urine"],
    prevention: ["Drink plenty of liquids, especially water", "Wipe from front to back", "Empty your bladder soon after intercourse"],
    whenToSeekCare: "Contact a healthcare provider if symptoms persist for more than a day or if you develop back pain and fever, which may indicate a kidney infection."
  },
  {
    id: "pkd",
    name: "Polycystic Kidney Disease (PKD)",
    description: "An inherited disorder in which clusters of cysts develop primarily within your kidneys, causing your kidneys to enlarge and lose function over time.",
    causes: ["Genetic inheritance (autosomal dominant or recessive)"],
    symptoms: ["High blood pressure", "Back or side pain", "Blood in urine", "A feeling of fullness in abdomen", "Increased size of abdomen"],
    prevention: ["Manage blood pressure", "Maintain a low-salt diet", "Since it is genetic, prevention focuses on slowing progression"],
    whenToSeekCare: "If you have a family history of PKD or develop unexplained flank pain and high blood pressure, consult a nephrologist."
  },
  {
    id: "glomerulonephritis",
    name: "Glomerulonephritis",
    description: "Inflammation of the tiny filters in your kidneys (glomeruli) that remove excess fluid, electrolytes and waste from your bloodstream.",
    causes: ["Infections (like strep throat)", "Immune diseases (like lupus)", "Vasculitis (blood vessel inflammation)"],
    symptoms: ["Pink or cola-colored urine (hematuria)", "Foamy urine (proteinuria)", "High blood pressure", "Fluid retention (edema) in face, hands, feet"],
    prevention: ["Seek prompt treatment for strep infections", "Manage high blood pressure", "Control blood sugar levels"],
    whenToSeekCare: "See a doctor immediately if you notice blood in your urine or sudden, severe swelling in your face or limbs."
  },
  {
    id: "dkd",
    name: "Diabetic Kidney Disease",
    description: "A serious complication of type 1 and type 2 diabetes affecting the kidneys' ability to do their usual work of removing waste products.",
    causes: ["Long-term, poorly controlled diabetes", "High blood pressure associated with diabetes"],
    symptoms: ["Often asymptomatic in early stages", "Worsening blood pressure control", "Protein in the urine", "Swelling of feet, ankles, hands or eyes", "Increased need to urinate"],
    prevention: ["Keep blood sugar levels in target range", "Manage blood pressure", "Follow a healthy diet", "Get regular A1C and kidney function tests"],
    whenToSeekCare: "Diabetics should have their urine and blood checked annually. See a doctor if you notice new swelling or extreme fatigue."
  },
  {
    id: "hypertensive",
    name: "Hypertensive Kidney Disease",
    description: "Kidney damage caused by chronic high blood pressure, which damages blood vessels in the kidneys.",
    causes: ["Uncontrolled high blood pressure over a long period"],
    symptoms: ["Mostly asymptomatic until advanced", "Frequent urination at night", "Swelling in the legs", "High blood pressure that is difficult to control"],
    prevention: ["Monitor and control blood pressure", "Take prescribed antihypertensive medications", "Reduce dietary sodium", "Exercise regularly"],
    whenToSeekCare: "Regular screening is crucial if you have hypertension. Seek care if your blood pressure readings are consistently high."
  }
];

export const preventionSteps = [
  { title: "Control Blood Pressure", desc: "High blood pressure is a leading cause of kidney damage. Aim for a target set by your doctor." },
  { title: "Control Diabetes", desc: "Keep your blood sugar levels in check to prevent damage to the kidney's blood vessels." },
  { title: "Drink Enough Water", desc: "Staying hydrated helps the kidneys clear sodium, urea, and toxins from the body." },
  { title: "Reduce Salt Intake", desc: "High sodium intake increases blood pressure. Limit processed foods and added salt." },
  { title: "Avoid Unnecessary Painkillers", desc: "Overuse of NSAIDs (like ibuprofen or naproxen) can harm the kidneys over time." },
  { title: "Do Not Smoke", desc: "Smoking damages blood vessels and decreases blood flow to the kidneys." },
  { title: "Exercise and Maintain Healthy Weight", desc: "Regular physical activity helps control blood pressure and manage weight." },
  { title: "Get Periodic Kidney Tests", desc: "If you are at high risk (diabetes, hypertension, family history), ask your doctor for regular screenings." }
];

export const symptomsList = [
  "Swelling in the legs, ankles, or around the eyes",
  "Persistent fatigue or weakness",
  "Foamy or bubbly urine",
  "Blood in the urine (pink, red, or cola-colored)",
  "Changes in urination frequency (especially at night)",
  "Unexplained back or flank pain",
  "High blood pressure that is difficult to control"
];

export const faqs = [
  {
    question: "What do the kidneys do?",
    answer: "The kidneys are two bean-shaped organs that filter waste products and excess fluid from the blood to form urine. They also help regulate blood pressure, produce red blood cells, and keep bones healthy."
  },
  {
    question: "Can kidney disease be cured?",
    answer: "Most forms of chronic kidney disease cannot be cured, but their progression can be slowed or stopped with early detection, medication, and lifestyle changes."
  },
  {
    question: "Is kidney disease genetic?",
    answer: "Some kidney diseases, like Polycystic Kidney Disease (PKD), are strictly genetic. For others, having a family history can increase your overall risk."
  },
  {
    question: "How do I get tested for kidney disease?",
    answer: "Testing involves a simple blood test to check your eGFR (estimated glomerular filtration rate) and a urine test to check for the presence of protein (albumin)."
  }
];
