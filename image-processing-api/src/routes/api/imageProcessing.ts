import express from "express";
/* The path module provides utilities for working with file and directory paths */
import path from "path";
/* The fs module is to check if the file is exist or not */
import fs from "fs";

import resizeImage from "../../utilities/resizeImage";

const imageProcessing = express.Router();

/*The absolute path of the image after resizing it*/
const pathOfResizedImage = path.join(path.resolve("./"),"/images/thumb");
/*The absolute path of the image*/
const pathOfImage = path.join(path.resolve("./"),"/images");

imageProcessing.get(
  "/",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const nameOfImage: string = req.query.image as string;
    const height: number = parseInt(req.query.height as string);
    const width: number = parseInt(req.query.width as string);
    const originalImagePath = path.resolve(pathOfImage, `${nameOfImage}.jpg`);
    /* check if the user enters a valid value for width and height, and enters the name of image or name of non existing image */
    if (
      !nameOfImage ||
      (!fs.existsSync(originalImagePath) &&
        (isNaN(height) || !height || height <= 0) &&
        (isNaN(width) || !width || width <= 0))
    ) {
      /* Return 400 because it's a Bad Request, The User uses incorrect Syntax in the Request */
      res
        .status(400)
        .send(
          "Please enter the name of image, height and width greater than 1"
        );
        return;
    }
    /* check if the user enters a valid value for width and height */
    if (
      (isNaN(height) || !height || height <= 0) &&
      (isNaN(width) || !width || width <= 0)
    ) {
      /* Return 400 because it's a Bad Request, The User uses incorrect Syntax in the Request */
      res
        .status(400)
        .send("Please enter the height and width of the image greater than 1");
        return;
    }
    /* check if the user doesn't enter the image name or enters a name of non existing image */
    if (!nameOfImage || !fs.existsSync(originalImagePath)) {
      console.log(!fs.existsSync(originalImagePath));
      /* Return 400 because it's a Bad Request, The User uses incorrect Syntax in the Request */
      res.status(400).send("Please enter the name of image");
      return;
    }
    /* Check if the user doesn't enter the height or enters it less than zero or enters a digit instead of a number */
    if (isNaN(height) || !height || height <= 0) {
      /* Return 400 because it's a Bad Request, The User uses incorrect Syntax in the Request */
      res
        .status(400)
        .send("Please enter the height of the image greater than 1");
        return;
    }
    /* Check if the user doesn't enter the width or enters it less than zero or enters a digit instead of a number */
    if (isNaN(width) || !width || width <= 0) {
      /* Return 400 because it's a Bad Request, The User uses incorrect Syntax in the Request */
      res
        .status(400)
        .send("Please enter the width of the image greater than 1");
        return;
    }
    try {
      const image_R = path.resolve(
        pathOfResizedImage,
        `${nameOfImage}W${width}H${height}.jpg`
      );
      /* check if the resized image is exist in the thumb folder or not */
      if (fs.existsSync(image_R)) {
        res.sendFile(image_R);
        return;
      } else {
        const resizedImage = await resizeImage(nameOfImage, height, width);
        res.sendFile(resizedImage);
        try {
          res.sendFile(resizedImage);
        } catch (error) {
          res.status(400).send(error);
        }
      }
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
);

export { pathOfResizedImage, pathOfImage };
export default imageProcessing;
