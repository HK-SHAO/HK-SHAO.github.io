import { PoolroomsRenderer } from "../../../src/renderer";
import { QUALITY_DEFAULT } from "../../../src/render/quality";
import { SITE_DEFAULT } from "../../../src/render/site";
import { celestial } from "../../../src/render/celestial";
import { serializeMap } from "../../../src/world/file";
import { buildPoster, location, time, view } from "./scene";

type Capture = {
  width: number;
  height: number;
  samples: number;
  causticGrid: number;
  reflections?: number;
  exposure: number;
  animation: number;
  shadows?: number;
  yaw?: number;
  pitch?: number;
  vfov?: number;
  position?: readonly [number, number, number];
  utc?: number;
  latitude?: number;
};

let fatalError: unknown;
const canvas = document.createElement("canvas");
document.body.append(canvas);
const renderer = new PoolroomsRenderer(canvas, {
  onError(error) {
    fatalError = error;
  },
});
const scene = buildPoster();
const ready = renderer.ready.then(() => renderer.replaceWorld(scene, new AbortController().signal));

async function dataUrl(blob: Blob) {
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(String(reader.result)));
    reader.addEventListener("error", () => reject(reader.error));
    reader.readAsDataURL(blob);
  });
}

async function capture(options: Capture) {
  const { width, height, samples, exposure, animation, causticGrid, utc = time } = options;
  const signal = new AbortController().signal;
  const site = { ...location, latitude: options.latitude ?? location.latitude };
  const camera = {
    position: options.position ?? view.position,
    yaw: options.yaw ?? view.yaw,
    pitch: options.pitch ?? view.pitch,
    roll: view.roll,
  };
  const quality = {
    ...QUALITY_DEFAULT,
    causticGrid,
    cloudSamples: 128,
    shadowSamples: 8,
    opticalInterfaces: 24,
    giBounces: 96,
    reflections: options.reflections ?? 24,
    taaHistory: 0.94,
    lensWater: 0,
  };
  await ready;
  renderer.setFilter("none");
  renderer.setCrosshair(false);
  renderer.setDisplay({ shadows: options.shadows ?? 1, white: 1, peak: 4 });
  renderer.setScale(1);
  renderer.setVfov(options.vfov ?? view.vfov);
  renderer.setTaa(true);
  renderer.setExposure(exposure);
  renderer.setCloudCover(0);
  renderer.setLightMalfunctions(0);
  renderer.setSkyEnabled(true);
  renderer.setSite({ ...SITE_DEFAULT, ...site });
  renderer.setQuality(quality);
  renderer.patchClock({ time: utc, animation, seed: 0, frozen: true });
  await renderer.waitForScene(120_000, signal);
  await renderer.beginFrames({ width, height, hdr: false }, signal);
  await renderer.renderFrame({ time: animation, delta: 1 / 60, samples: 2, camera }, signal);
  await renderer.renderFrame({ time: animation, delta: 1 / 60, samples, camera }, signal);
  if (fatalError) throw fatalError;
  const adapter = await navigator.gpu?.requestAdapter();
  const frame = await renderer.readFrame(signal);
  if (!(frame.data instanceof Uint8ClampedArray) || frame.width !== width || frame.height !== height)
    throw new Error("The renderer did not return the requested native frame");
  const output = document.createElement("canvas");
  output.width = width;
  output.height = height;
  const ctx = output.getContext("2d", { colorSpace: "srgb" })!;
  ctx.putImageData(new ImageData(frame.data, width, height, { colorSpace: "srgb" }), 0, 0);
  const blob = await new Promise<Blob>((resolve, reject) =>
    output.toBlob((png) => (png ? resolve(png) : reject(Error("PNG encoding failed"))), "image/png"),
  );
  return {
    png: await dataUrl(blob),
    map: await dataUrl(await serializeMap({ ...scene, sky: { site, time: utc }, spawn: scene.spawn })),
    settings: {
      width,
      height,
      samples,
      exposure,
      animation,
      utc,
      site,
      quality,
      camera,
      configuration: renderer.configuration(),
      adapter: adapter?.info
        ? { vendor: adapter.info.vendor, architecture: adapter.info.architecture, device: adapter.info.device }
        : undefined,
      sunDirection: celestial(utc, site).sunDir,
    },
  };
}

Object.assign(window, { capturePoster: capture });
