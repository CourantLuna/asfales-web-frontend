"use server";

import React from "react";
import HostelsGueshousesResults from "@/components/lodging-search/HostelsGueshousesResults";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ searchParams }: PageProps) {
  // ✔️ Resolver el promise
  const params = await searchParams;

  console.log("searchParams en page.tsx:", params);

  return (
    <div>
      <HostelsGueshousesResults initialSearchParams={params} />
    </div>
  );
}
  