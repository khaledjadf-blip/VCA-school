// Prijzen staan overal exclusief btw; de btw komt er bij het betalen bij.
export const VAT_PERCENT = 21;

/** Prijs excl. btw (centen) → te betalen bedrag incl. btw (centen). */
export function withVat(cents: number) {
  return Math.round((cents * (100 + VAT_PERCENT)) / 100);
}

/** Het btw-deel van een prijs excl. btw (centen). */
export function vatOf(cents: number) {
  return withVat(cents) - cents;
}
