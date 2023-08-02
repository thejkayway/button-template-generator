import { Crop } from "react-image-crop";

type Circle = {
  xCenter: number;
  yCenter: number;
  radius: number;
};

// Page Descriptors
const DPI = 300;
const PAGE_WIDTH = 8.5 * DPI;
const PAGE_HEIGHT = 11 * DPI;
const BUTTON_GUIDE_DIAMETER = 2.625 * DPI;
const BUTTON_GUIDE_RADIUS = BUTTON_GUIDE_DIAMETER / 2;
const BUTTON_HORIZONTAL_MARGIN = (PAGE_WIDTH - 3 * BUTTON_GUIDE_DIAMETER) / 4;
const BUTTON_VERTICAL_MARGIN = (PAGE_HEIGHT - 4 * BUTTON_GUIDE_DIAMETER) / 5;

// Button Positions
const COLUMN_ONE_CENTER = BUTTON_GUIDE_RADIUS + BUTTON_HORIZONTAL_MARGIN;
const COLUMN_TWO_CENTER = PAGE_WIDTH / 2;
const COLUMN_THREE_CENTER =
  PAGE_WIDTH - BUTTON_GUIDE_RADIUS - BUTTON_HORIZONTAL_MARGIN;
const ROW_ONE_CENTER = BUTTON_GUIDE_RADIUS + BUTTON_VERTICAL_MARGIN;
const ROW_TWO_CENTER =
  ROW_ONE_CENTER + BUTTON_GUIDE_DIAMETER + BUTTON_VERTICAL_MARGIN;
const ROW_THREE_CENTER =
  ROW_TWO_CENTER + BUTTON_GUIDE_DIAMETER + BUTTON_VERTICAL_MARGIN;
const ROW_FOUR_CENTER =
  ROW_THREE_CENTER + BUTTON_GUIDE_DIAMETER + BUTTON_VERTICAL_MARGIN;

const BUTTON_GUIDE_OUTLINES = [
  {
    xCenter: COLUMN_ONE_CENTER,
    yCenter: ROW_ONE_CENTER,
    radius: BUTTON_GUIDE_RADIUS,
  },
  {
    xCenter: COLUMN_ONE_CENTER,
    yCenter: ROW_TWO_CENTER,
    radius: BUTTON_GUIDE_RADIUS,
  },
  {
    xCenter: COLUMN_ONE_CENTER,
    yCenter: ROW_THREE_CENTER,
    radius: BUTTON_GUIDE_RADIUS,
  },
  {
    xCenter: COLUMN_ONE_CENTER,
    yCenter: ROW_FOUR_CENTER,
    radius: BUTTON_GUIDE_RADIUS,
  },
  {
    xCenter: COLUMN_TWO_CENTER,
    yCenter: ROW_ONE_CENTER,
    radius: BUTTON_GUIDE_RADIUS,
  },
  {
    xCenter: COLUMN_TWO_CENTER,
    yCenter: ROW_TWO_CENTER,
    radius: BUTTON_GUIDE_RADIUS,
  },
  {
    xCenter: COLUMN_TWO_CENTER,
    yCenter: ROW_THREE_CENTER,
    radius: BUTTON_GUIDE_RADIUS,
  },
  {
    xCenter: COLUMN_TWO_CENTER,
    yCenter: ROW_FOUR_CENTER,
    radius: BUTTON_GUIDE_RADIUS,
  },
  {
    xCenter: COLUMN_THREE_CENTER,
    yCenter: ROW_ONE_CENTER,
    radius: BUTTON_GUIDE_RADIUS,
  },
  {
    xCenter: COLUMN_THREE_CENTER,
    yCenter: ROW_TWO_CENTER,
    radius: BUTTON_GUIDE_RADIUS,
  },
  {
    xCenter: COLUMN_THREE_CENTER,
    yCenter: ROW_THREE_CENTER,
    radius: BUTTON_GUIDE_RADIUS,
  },
  {
    xCenter: COLUMN_THREE_CENTER,
    yCenter: ROW_FOUR_CENTER,
    radius: BUTTON_GUIDE_RADIUS,
  },
];

export async function canvasTemplate(image: HTMLImageElement, crop: Crop) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  canvas.width = PAGE_WIDTH;
  canvas.height = PAGE_HEIGHT;

  ctx.imageSmoothingQuality = "high";

  // draw our circle-cropped images
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = "rgba(0,0,0,0.0)";
  BUTTON_GUIDE_OUTLINES.forEach((circle) => drawCircle(ctx, circle));
  ctx.clip();
  BUTTON_GUIDE_OUTLINES.forEach((circle) =>
    drawImage(ctx, image, circle, crop)
  );
  ctx.stroke();
  ctx.closePath();
  ctx.restore();

  // draw our cutting guide outlines
  // ctx.beginPath();
  // BUTTON_GUIDE_OUTLINES.forEach((circle) => drawCircle(ctx, circle));
  // ctx.stroke();
  // ctx.closePath();

  // save the image
  const link = document.createElement("a");
  link.download = "template.png";
  link.href = canvas.toDataURL();
  link.click();
}

function drawCircle(ctx: CanvasRenderingContext2D, circle: Circle) {
  ctx.moveTo(circle.xCenter + circle.radius, circle.yCenter);
  ctx.arc(circle.xCenter, circle.yCenter, circle.radius, 0, 2 * Math.PI);
}

function drawImage(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  circle: Circle,
  crop: Crop
) {
  const cropXPercent = crop.x / 100;
  const cropYPercent = crop.y / 100;
  const cropWidthPercent = crop.width / 100;
  const cropHeightPercent = crop.height / 100;

  ctx.drawImage(
    image,
    cropXPercent * image.naturalWidth,
    cropYPercent * image.naturalHeight,
    cropWidthPercent * image.naturalWidth,
    cropHeightPercent * image.naturalHeight,
    circle.xCenter - cropWidthPercent - circle.radius,
    circle.yCenter - circle.radius,
    circle.radius * 2,
    circle.radius * 2
  );
}
