import { extractData } from "@/lib/medianCut/getImageData";
import { medianCut, rgbToHex } from "@/lib/medianCut/palette";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const { link, iterations } = (await request.json()) as {
    link: string;
    iterations: number;
  };
  const startTime = process.hrtime.bigint();

  const imageData = extractData(link);
  const palette = medianCut(imageData, iterations);
  const paletteJson = {
    colors: palette.map((color) => {
      rgbToHex(color);
    }),
  };
  const endTime = process.hrtime.bigint();
  const timeDifference = Number(endTime - startTime) / 1e6;
  return NextResponse.json({ ...paletteJson, internal_time: timeDifference });
}
