// utils/fetchData.ts
export async function fetchData<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const apiUrl = import.meta.env.VITE_API_URL;

  const fullUrl = apiUrl + url;

  const res = await fetch(fullUrl, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}
