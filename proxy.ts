import { NextResponse, type NextRequest } from "next/server";

// Nederlands op /..., Arabisch op /ar/...; intern draaien beide onder app/(site)/[lang].
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /nl/... bestaat niet als publieke URL: doorsturen naar het pad zonder voorvoegsel.
  if (pathname === "/nl" || pathname.startsWith("/nl/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/nl/, "") || "/";
    return NextResponse.redirect(url, 308);
  }

  const isArabic = pathname === "/ar" || pathname.startsWith("/ar/");
  const dutchPath = isArabic ? pathname.slice(3) || "/" : pathname;

  let response: NextResponse;
  if (isArabic) {
    response = NextResponse.next();
  } else {
    const url = request.nextUrl.clone();
    url.pathname = `/nl${pathname === "/" ? "" : pathname}`;
    response = NextResponse.rewrite(url);
  }

  // Vertel zoekmachines welke taalversies bij elkaar horen (hreflang).
  const origin = request.nextUrl.origin;
  const nlUrl = `${origin}${dutchPath}`;
  const arUrl = `${origin}/ar${dutchPath === "/" ? "" : dutchPath}`;
  response.headers.set(
    "Link",
    `<${nlUrl}>; rel="alternate"; hreflang="nl", <${arUrl}>; rel="alternate"; hreflang="ar", <${nlUrl}>; rel="alternate"; hreflang="x-default"`
  );
  return response;
}

export const config = {
  // Niet voor: Next-bestanden, API, beheer, afbeeldingen, sitemap/robots en bestanden met een extensie.
  matcher: ["/((?!_next|api|admin|images|sitemap\\.xml|robots\\.txt|favicon\\.ico|.*\\..*).*)"]
};
