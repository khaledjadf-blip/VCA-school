"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Hero3D = dynamic(() => import("@/components/hero-3d").then((mod) => mod.Hero3D), {
  ssr: false,
  loading: () => <div className="h-[330px] w-full sm:h-[420px] lg:h-[520px]" />
});

export function Hero3DLoader() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const load = () => setReady(true);
    const id = globalThis.setTimeout(load, 6500);
    return () => globalThis.clearTimeout(id);
  }, []);

  return ready ? <Hero3D /> : <div className="h-[330px] w-full sm:h-[420px] lg:h-[520px]" aria-hidden="true" />;
}
