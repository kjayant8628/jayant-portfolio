export interface Point {
  x: number;
  y: number;
}

export type Side = "top" | "bottom" | "left" | "right";

/** Returns the anchor point on a given side of a rect defined by (x, y, width, height). */
export function anchor(x: number, y: number, width: number, height: number, side: Side): Point {
  switch (side) {
    case "top":
      return { x: x + width / 2, y };
    case "bottom":
      return { x: x + width / 2, y: y + height };
    case "left":
      return { x, y: y + height / 2 };
    case "right":
      return { x: x + width, y: y + height / 2 };
  }
}
