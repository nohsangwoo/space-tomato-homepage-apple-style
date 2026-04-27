"use client";

import {
  Children,
  type CSSProperties,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const LEAD_HOLD = 0.04;
const TAIL_HOLD = 0.06;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getScrollProgress(target: HTMLElement) {
  const rect = target.getBoundingClientRect();
  const scrollDistance = Math.max(1, rect.height - window.innerHeight);

  return clamp(-rect.top / scrollDistance, 0, 1);
}

function getPanelStyle(index: number, stagePosition: number): CSSProperties {
  const distance = stagePosition - index;
  const boundedDistance = clamp(distance, -1, 1);
  const opacity = clamp(1 - Math.abs(distance) * 1.75, 0, 1);
  const translateY = -boundedDistance * 96;
  const scale = 0.985 + opacity * 0.015;

  return {
    opacity,
    pointerEvents: opacity > 0.72 ? "auto" : "none",
    transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
    transition: "opacity 120ms linear, transform 120ms linear",
    zIndex: Math.round(opacity * 100),
  };
}

export function ScrollStoryStage({
  children,
  className,
  scrollTargetId = "top",
}: {
  children: ReactNode;
  className?: string;
  scrollTargetId?: string;
}) {
  const panels = useMemo(() => Children.toArray(children), [children]);
  const [progress, setProgress] = useState(0);
  const animationFrameRef = useRef(0);
  const progressRef = useRef(-1);

  useEffect(() => {
    const updateProgress = () => {
      animationFrameRef.current = 0;

      const target = document.getElementById(scrollTargetId);

      if (!target) {
        return;
      }

      const nextProgress = getScrollProgress(target);

      if (Math.abs(nextProgress - progressRef.current) > 0.001) {
        progressRef.current = nextProgress;
        setProgress(nextProgress);
      }
    };

    const requestProgressUpdate = () => {
      if (animationFrameRef.current === 0) {
        animationFrameRef.current =
          window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();

    window.addEventListener("scroll", requestProgressUpdate, {
      passive: true,
    });
    window.addEventListener("resize", requestProgressUpdate);

    return () => {
      if (animationFrameRef.current !== 0) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }

      window.removeEventListener("scroll", requestProgressUpdate);
      window.removeEventListener("resize", requestProgressUpdate);
    };
  }, [scrollTargetId]);

  const normalizedProgress = clamp(
    (progress - LEAD_HOLD) / (1 - LEAD_HOLD - TAIL_HOLD),
    0,
    1
  );
  const stagePosition =
    normalizedProgress * Math.max(0, panels.length - 1);
  const activeIndex = clamp(
    Math.round(stagePosition),
    0,
    Math.max(0, panels.length - 1)
  );

  return (
    <div className={className}>
      {panels.map((panel, index) => (
        <div
          key={index}
          className="absolute inset-0"
          data-active={index === activeIndex ? "true" : "false"}
          style={getPanelStyle(index, stagePosition)}
        >
          {panel}
        </div>
      ))}
    </div>
  );
}
