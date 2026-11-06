// Keuze voor het certificaat bij het boeken. Prijzen excl. btw (btw komt erbij).
export const certificateOptions = {
  digital: { label: "Als PDF opsturen en digitale VCA-pas", priceCents: 0 },
  paper: { label: "Papieren certificaat en plastic pas", priceCents: 2000 }
} as const;

export type CertificateChoice = keyof typeof certificateOptions;

export const isCertificateChoice = (value: unknown): value is CertificateChoice =>
  typeof value === "string" && value in certificateOptions;

// Alleen bij de VCA-examens (Basis, VOL, VIL-VCU) is er een keuze voor het certificaat.
const certificateCourses = new Set(["vca-basis", "vca-vol", "vil-vcu"]);
export const offersCertificateChoice = (courseSlug: string) => certificateCourses.has(courseSlug);
