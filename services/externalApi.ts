export const fetchExternalData = async (query: string): Promise<any | null> => {
  try {
    // Vite env var: VITE_EXTERNAL_API_URL
    const url = (import.meta as any).env?.VITE_EXTERNAL_API_URL;
    if (!url) return null;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    });

    if (!res.ok) return null;

    const json = await res.json();
    // Expecting { data: ... } or arbitrary JSON
    return json.data ?? json;
  } catch (err) {
    console.error('External API fetch failed:', err);
    return null;
  }
};
