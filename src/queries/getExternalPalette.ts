"use server";

export async function getExternalPalette(
  url: string,
  iterations: number,
  endpoint: string
) {
  const response = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify({
      link: url,
      iterations: iterations,
    }),
  });
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  return response.json;
}
