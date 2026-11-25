import { voxpoolLinks } from "./voxpool-links";

export const workPath = (id: string) => `/works/${id}/`;

export const workRedirects: Record<string, string> = {
  [workPath("poolrooms")]: voxpoolLinks.home,
  [workPath("meri-isle")]: "/isle/",
  "/voxpool/capybara/": voxpoolLinks.home,
};
