import express from "express";
/* The sharp module is to convert large images in common formats to smaller(Varying image dimensions) */
import sharp from "sharp";
/* The path module provides utilities for working with file and directory paths */
import path from "path";

import { pathOfResizedImage, pathOfImage } from "../routes/api/imageProcessing";

const res = express.response;

const resizeImage = async (
  nameOfImage: string,
  width: number,
  height: number
): Promise<string> => {
  const absoluteImagePath = path.join(`${pathOfImage}`,`${nameOfImage}.jpg`);
  const absoluteResizedImagePath = path.join(
    `${pathOfResizedImage}`,
    `${nameOfImage}W${width}H${height}.jpg`
  );
  try {
    await sharp(absoluteImagePath)
      .resize(width, height)
      .jpeg()
      .toFile(absoluteResizedImagePath);

  } catch (error) {
    console.log(error);
    res.send(error);
  }
  return absoluteResizedImagePath;
};

export default resizeImage;
