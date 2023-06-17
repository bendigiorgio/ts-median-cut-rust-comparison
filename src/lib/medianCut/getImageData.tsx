import { StaticImageData } from "next/image";

export const extractData = (imageUrl: string | StaticImageData) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();

  if (typeof imageUrl === "object") imageUrl = imageUrl.src;
  img.src = imageUrl;

  if (!ctx) throw new Error("Could not get context");
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
  };
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
};
