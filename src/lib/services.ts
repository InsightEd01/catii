/** The four catii offerings, with a representative still from the footage. */
export const SERVICES = [
  { key: "grooming", image: "/frames/lg/frame-046.webp" },
  { key: "sitting", image: "/frames/lg/frame-091.webp" },
  { key: "smartHome", image: "/frames/lg/frame-138.webp" },
  { key: "health", image: "/frames/lg/frame-001.webp" },
] as const;

export type ServiceKey = (typeof SERVICES)[number]["key"];
