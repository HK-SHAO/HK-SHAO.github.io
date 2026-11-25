import type { Vec3 } from "../../../src/math/vec";
import { ID_ACCENT_TILE, ID_CLAY_RED, ID_CLAY_WHITE, ID_WALL, ID_WATER, CLAY_BLOCKS } from "../../../src/world/blocks";
import { VOXEL_COUNT } from "../../../src/world/dims";
import type { MapDocument } from "../../../src/world/document";
import { boxWriter } from "../../../src/world/maps/box";
import { defaultSpawn } from "../../../src/world/state";

export const location = { latitude: -31, longitude: 114 };
export const time = Date.UTC(2026, 2, 20, 2, 34);
export const view = { position: [14.05, 6.15, 39.9] as Vec3, yaw: -0.46, pitch: 0.1, roll: 0, vfov: 76 };
export const blackClay = CLAY_BLOCKS.find((block) => block.label === "blackClay")!.id;

export function buildPoster(): MapDocument {
  const voxels = new Uint8Array(VOXEL_COUNT);
  const box = boxWriter(voxels);
  const wall = ID_CLAY_WHITE;
  const tile = ID_WALL;

  box(3, 0, 36, 16, 3, 67, tile);
  box(3, 3, 36, 16, 16, 62, wall);
  box(4, 13, 37, 14, 14, 60, blackClay);
  box(4, 3, 37, 15, 13, 60, 0);
  box(4, 3, 37, 15, 5, 60, ID_WATER);
  box(4, 2, 37, 15, 3, 60, ID_ACCENT_TILE);

  box(3, 3, 37, 5, 6, 60, tile);
  box(14, 3, 37, 16, 5, 60, tile);
  box(4, 6, 37, 5, 8, 60, tile);
  box(15, 6, 37, 16, 8, 60, tile);
  box(4, 3, 59, 15, 6, 61, tile);
  box(4, 6, 60, 15, 8, 61, tile);
  box(4, 5, 40, 5, 6, 59, tile);
  box(15, 5, 37, 16, 6, 60, tile);

  box(4, 6, 60, 15, 13, 67, wall);
  box(11, 6, 59, 13, 10, 65, 0);
  box(11, 5, 59, 13, 6, 65, tile);
  box(11, 6, 64, 13, 10, 66, blackClay);
  box(7, 8, 60, 10, 10, 61, 0);
  box(7, 8, 61, 10, 10, 62, ID_CLAY_RED);

  box(5, 1, 38, 14, 2, 48, ID_ACCENT_TILE);
  box(5, 2, 38, 14, 3, 48, ID_WATER);
  box(5, 2, 40, 12, 3, 47, tile);
  box(5, 3, 40, 11, 4, 46, tile);

  box(4, 11, 43, 5, 13, 60, wall);
  box(14, 13, 41, 16, 16, 45, 0);
  box(13, 13, 45, 16, 16, 47, 0);
  box(12, 13, 47, 15, 16, 49, 0);
  box(12, 13, 49, 14, 16, 51, 0);
  box(12, 13, 51, 14, 16, 53, 0);
  box(12, 13, 53, 13, 16, 55, 0);

  const { position, yaw, pitch, roll } = view;
  return {
    voxels,
    spawn: { ...defaultSpawn(), position: [position[0], 7.75, position[2]], yaw, pitch, roll },
    sky: { site: location, time },
  };
}
