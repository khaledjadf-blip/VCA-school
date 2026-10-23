// Sterretje voor verplichte velden (los tekstknooppunt, zodat de vertaling van het label blijft werken).
export function Req() {
  return <span aria-hidden className="ms-0.5 text-destructive">*</span>;
}

export function RequiredNote() {
  return <p className="text-xs text-muted-foreground">Velden met * zijn verplicht.</p>;
}
