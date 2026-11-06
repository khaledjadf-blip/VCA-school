import { formatEuro } from "@/lib/time";

/** "vanaf € 250 excl. btw" — losse stukjes, zodat de vertaling ze herkent. */
export function CoursePrice({ priceExVat, priceFrom }: { priceExVat: number; priceFrom: boolean }) {
  return (
    <>
      {priceFrom ? <span>vanaf</span> : null}
      {priceFrom ? " " : null}
      <span dir="ltr">{formatEuro(priceExVat * 100).replace(/,00$/, "")}</span>{" "}
      <span className="text-[0.7em] font-semibold text-muted-foreground">excl. btw</span>
    </>
  );
}
