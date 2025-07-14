// utils/navigation.ts
export function openInNewTab(path: string, query?: Record<string, string | number>) {
  const url = new URL(path, window.location.origin);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.set(key, String(value));
    });
  }

  window.open(url.toString(), "_blank", "noopener,noreferrer");
}
