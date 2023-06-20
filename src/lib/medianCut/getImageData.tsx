import { StaticImageData } from "next/image";

export const extractData = async (imageUrl: string | StaticImageData) => {
  let loadingFinished = false;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();

  if (typeof imageUrl === "object") imageUrl = imageUrl.src;
  img.src = imageUrl;
  img.crossOrigin = "Anonymous";

  if (!ctx) throw new Error("Could not get context");
  const loadImage = async () => {
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      loadingFinished = true;
    };
  };
  const imageData = await loadImage().then(() => {
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  });
  return imageData;
};
