"use client";

import { useEffect, useRef } from "react";

const FRAME_COUNT = 145;
const FRAME_SOURCES = Array.from(
  { length: FRAME_COUNT },
  (_, index) =>
    `/assets/hero-scroll-frames/frame_${String(index + 1).padStart(4, "0")}.webp`
);

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function ScrollHeroSequence({
  className,
  scrollTargetId = "top",
}: {
  className?: string;
  scrollTargetId?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedFramesRef = useRef<Set<number>>(new Set());
  const requestedFrameRef = useRef(0);
  const renderedFrameRef = useRef(-1);

  useEffect(() => {
    let animationFrame = 0;
    let isDisposed = false;

    const resizeCanvas = () => {
      const canvas = canvasRef.current;

      if (!canvas) {
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const drawFrame = (frameIndex: number) => {
      const canvas = canvasRef.current;
      const image = imagesRef.current[frameIndex];

      if (
        !canvas ||
        !image ||
        !loadedFramesRef.current.has(frameIndex) ||
        image.naturalWidth === 0 ||
        image.naturalHeight === 0
      ) {
        return false;
      }

      const context = canvas.getContext("2d");

      if (!context) {
        return false;
      }

      resizeCanvas();

      const canvasRatio = canvas.width / canvas.height;
      const imageRatio = image.naturalWidth / image.naturalHeight;
      let sourceX = 0;
      let sourceY = 0;
      let sourceWidth = image.naturalWidth;
      let sourceHeight = image.naturalHeight;

      if (imageRatio > canvasRatio) {
        sourceWidth = image.naturalHeight * canvasRatio;
        sourceX = (image.naturalWidth - sourceWidth) / 2;
      } else {
        sourceHeight = image.naturalWidth / canvasRatio;
        sourceY = (image.naturalHeight - sourceHeight) / 2;
      }

      context.drawImage(
        image,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        canvas.width,
        canvas.height
      );
      renderedFrameRef.current = frameIndex;

      return true;
    };

    const updateFrame = () => {
      animationFrame = 0;

      const target = document.getElementById(scrollTargetId);

      if (!target) {
        return;
      }

      const rect = target.getBoundingClientRect();
      const scrollDistance = Math.max(1, rect.height - window.innerHeight);
      const progress = clamp(-rect.top / scrollDistance, 0, 1);
      const nextFrame = clamp(
        Math.floor(progress * FRAME_COUNT),
        0,
        FRAME_COUNT - 1
      );

      requestedFrameRef.current = nextFrame;

      if (nextFrame !== renderedFrameRef.current) {
        drawFrame(nextFrame);
      }
    };

    const requestFrameUpdate = () => {
      if (animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(updateFrame);
      }
    };

    const markFrameLoaded = (frameIndex: number) => {
      if (isDisposed) {
        return;
      }

      loadedFramesRef.current.add(frameIndex);

      if (
        frameIndex === requestedFrameRef.current ||
        renderedFrameRef.current === -1
      ) {
        const didDrawRequestedFrame = drawFrame(requestedFrameRef.current);

        if (!didDrawRequestedFrame) {
          drawFrame(frameIndex);
        }
      }
    };

    imagesRef.current = FRAME_SOURCES.map((source, frameIndex) => {
      const image = new window.Image();
      image.decoding = "async";

      if (frameIndex === 0) {
        image.fetchPriority = "high";
      }

      image.onload = () => {
        image
          .decode()
          .catch(() => undefined)
          .then(() => markFrameLoaded(frameIndex));
      };
      image.src = source;

      return image;
    });

    updateFrame();

    window.addEventListener("scroll", requestFrameUpdate, { passive: true });
    window.addEventListener("resize", requestFrameUpdate);

    const resizeObserver = new ResizeObserver(requestFrameUpdate);

    if (canvasRef.current) {
      resizeObserver.observe(canvasRef.current);
    }

    return () => {
      isDisposed = true;

      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
      }

      window.removeEventListener("scroll", requestFrameUpdate);
      window.removeEventListener("resize", requestFrameUpdate);
      resizeObserver.disconnect();
    };
  }, [scrollTargetId]);

  return (
    <canvas ref={canvasRef} aria-hidden="true" className={className} />
  );
}
