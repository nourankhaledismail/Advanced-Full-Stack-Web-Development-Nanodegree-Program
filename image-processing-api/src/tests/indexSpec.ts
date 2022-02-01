import supertest from "supertest";
import resizeImage from "../utilities/resizeImage";
import application from "../index";
import path from "path";

const request = supertest(application);

/* This for testing the endpoints */
describe("Test endpoint responses", () => {
  it("gets the api endpoint", async () => {
    const response = await request.get("/api");
    expect(response.status).toEqual(200);
  });
  /* This for testing if the user gets the original image */
  it("test to get the api of the original image", async () => {
    const response = await request.get("/api/icelandwaterfall.jpg");
    expect(response.status).toBe(200);
  });
  /* This for testing when the user enter the name of the image and height but doesn't enter a number for width  */
  it("test /api/resized enter a digit in width instead of number", async () => {
    const response = await request.get(
      "/api/resized/?image=icelandwaterfall&width=a&height=300"
    );
    expect(response.status).toEqual(400);
  });
  /* This for testing when the user enter the name of the image and width but forget the height  */
  it("test /api/resized forget width", async () => {
    const response = await request.get(
      "/api/resized/?image=icelandwaterfall&width=250"
    );
    expect(response.status).toEqual(400);
  });
});

describe("Test the resize dimensions of the image", () => {
  it("The return value will be true", async () => {
    const nameOfImage = "icelandwaterfall";
    const outputPath = path.join(__dirname,"../../images/thumb/icelandwaterfallW300H400.jpg");
    const resize = await resizeImage(nameOfImage, 300, 400);
    console.log(outputPath);
    expect(resize).toBe(outputPath);
  });
});
