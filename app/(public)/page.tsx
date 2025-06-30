"use client";

import { Suspense } from "react";
import LandingSections from "@/components/landing/LandingSections";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LandingSections />
    </Suspense>
  );
}
