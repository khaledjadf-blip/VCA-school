const options = [
  {
    name: "System Sans",
    note: "Closest to the Netjes & Klaar setup. Very safe, fast, and normal.",
    className: "font-system",
    stack: "ui-sans-serif, system-ui, sans-serif"
  },
  {
    name: "Source Sans 3",
    note: "My favorite for this site: public-service feeling, readable, official without looking old.",
    className: "font-source",
    stack: "Source Sans 3, ui-sans-serif, system-ui, sans-serif"
  },
  {
    name: "Noto Sans",
    note: "Very neutral and international. Slightly less character, but extremely dependable.",
    className: "font-noto",
    stack: "Noto Sans, ui-sans-serif, system-ui, sans-serif"
  }
];

export default function FontTestPage() {
  return (
    <section className="section-shell py-10">
      <style
        dangerouslySetInnerHTML={{
          __html:
            ".font-system{font-family:ui-sans-serif,system-ui,sans-serif}.font-source{font-family:var(--font-source-sans),ui-sans-serif,system-ui,sans-serif}.font-noto{font-family:ui-sans-serif,system-ui,sans-serif}"
        }}
      />
      <div className="border-b border-border bg-white p-6">
        <p className="official-kicker">Fonttest</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[#154273] sm:text-5xl">
          Welke letter voelt het meest officieel?
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
          Ik zou voor VCA Veilig & Vakkundig eerder een rustige overheidsachtige sans gebruiken dan een trendy marketingfont.
        </p>
      </div>

      <div className="mt-8 grid gap-6">
        {options.map((option) => (
          <article key={option.name} className={`${option.className} border border-border bg-white p-6`}>
            <div className="flex flex-col gap-2 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-xs font-bold uppercase text-[#154273]">Optie</p>
                <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-[#154273]">{option.name}</h2>
              </div>
              <p className="text-sm text-muted-foreground">{option.stack}</p>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
              <div>
                <h3 className="text-5xl font-extrabold leading-none tracking-tight text-foreground">
                  Veilig werken begint bij VCA Veilig & Vakkundig.
                </h3>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
                  Professionele VCA-cursussen, heftrucktraining en examenregistratie voor professionals en bedrijven die veiligheid serieus nemen.
                </p>
                <p className="mt-5 text-base leading-7 text-foreground">
                  Deze letter moet vooral betrouwbaar voelen bij langere uitleg over VCA Basis, VCA VOL, VIL-VCU, examens en bedrijfsaanmeldingen.
                </p>
              </div>

              <div className="border border-border bg-secondary p-5">
                <h4 className="text-xl font-bold text-[#154273]">Direct regelen</h4>
                <div className="mt-4 grid border-y border-border">
                  <span className="border-b border-border py-3 font-semibold text-[#154273]">Cursus kiezen</span>
                  <span className="border-b border-border py-3 font-semibold text-[#154273]">Live klassen bekijken</span>
                  <span className="py-3 font-semibold text-[#154273]">Inschrijven of contact</span>
                </div>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{option.note}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
