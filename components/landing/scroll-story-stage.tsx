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
const SNAP_LOCK_MS = 760;
const TOUCH_SWIPE_THRESHOLD = 28;

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

function getPanelProgress(index: number, panelCount: number) {
  if (panelCount <= 1 || index <= 0) {
    return 0;
  }

  const normalizedIndex = index / (panelCount - 1);

  return LEAD_HOLD + normalizedIndex * (1 - LEAD_HOLD - TAIL_HOLD);
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
  const activeIndexRef = useRef(0);
  const snapLockRef = useRef(0);
  const snapLockTimerRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);
  const touchStartIndexRef = useRef(0);

  useEffect(() => {
    const panelCount = panels.length;

    const getTarget = () => document.getElementById(scrollTargetId);

    const getActiveIndex = (target: HTMLElement) => {
      const nextProgress = getScrollProgress(target);
      const normalizedProgress = clamp(
        (nextProgress - LEAD_HOLD) / (1 - LEAD_HOLD - TAIL_HOLD),
        0,
        1
      );
      const stagePosition =
        normalizedProgress * Math.max(0, panelCount - 1);

      return clamp(
        Math.round(stagePosition),
        0,
        Math.max(0, panelCount - 1)
      );
    };

    const isPinned = (target: HTMLElement) => {
      const rect = target.getBoundingClientRect();

      return rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
    };

    const scrollToPanel = (target: HTMLElement, panelIndex: number) => {
      const rect = target.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const scrollDistance = Math.max(1, target.offsetHeight - window.innerHeight);
      const progressTarget = getPanelProgress(panelIndex, panelCount);
      const targetY = sectionTop + scrollDistance * progressTarget;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      snapLockRef.current = window.performance.now() + SNAP_LOCK_MS;
      window.clearTimeout(snapLockTimerRef.current);
      snapLockTimerRef.current = window.setTimeout(() => {
        snapLockRef.current = 0;
      }, SNAP_LOCK_MS);

      window.scrollTo({
        top: targetY,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    };

    const requestPanelSnap = (direction: 1 | -1, startIndex?: number) => {
      if (window.performance.now() < snapLockRef.current) {
        return;
      }

      const target = getTarget();

      if (!target || panelCount <= 1 || !isPinned(target)) {
        return;
      }

      const currentIndex = startIndex ?? getActiveIndex(target);
      const nextIndex = clamp(
        currentIndex + direction,
        0,
        Math.max(0, panelCount - 1)
      );

      if (nextIndex === currentIndex) {
        return;
      }

      activeIndexRef.current = nextIndex;
      scrollToPanel(target, nextIndex);
    };

    const updateProgress = () => {
      animationFrameRef.current = 0;

      const target = getTarget();

      if (!target) {
        return;
      }

      const nextProgress = getScrollProgress(target);

      if (Math.abs(nextProgress - progressRef.current) > 0.001) {
        progressRef.current = nextProgress;
        setProgress(nextProgress);
        activeIndexRef.current = getActiveIndex(target);
      }
    };

    const requestProgressUpdate = () => {
      if (animationFrameRef.current === 0) {
        animationFrameRef.current =
          window.requestAnimationFrame(updateProgress);
      }
    };

    const handleWheel = (event: WheelEvent) => {
      const target = getTarget();

      if (
        !target ||
        event.ctrlKey ||
        panelCount <= 1 ||
        !isPinned(target) ||
        Math.abs(event.deltaY) < 2
      ) {
        return;
      }

      const currentIndex = getActiveIndex(target);
      const direction = event.deltaY > 0 ? 1 : -1;
      const isAtFirstPanel = currentIndex === 0 && direction < 0;
      const isAtLastPanel = currentIndex === panelCount - 1 && direction > 0;

      if (isAtFirstPanel || isAtLastPanel) {
        return;
      }

      event.preventDefault();
      requestPanelSnap(direction, currentIndex);
    };

    const handleTouchStart = (event: TouchEvent) => {
      const target = getTarget();

      if (!target || !isPinned(target) || event.touches.length !== 1) {
        touchStartYRef.current = null;
        return;
      }

      touchStartYRef.current = event.touches[0].clientY;
      touchStartIndexRef.current = getActiveIndex(target);
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (touchStartYRef.current === null || event.changedTouches.length !== 1) {
        return;
      }

      const deltaY = touchStartYRef.current - event.changedTouches[0].clientY;
      touchStartYRef.current = null;

      if (Math.abs(deltaY) < TOUCH_SWIPE_THRESHOLD) {
        return;
      }

      requestPanelSnap(deltaY > 0 ? 1 : -1, touchStartIndexRef.current);
    };

    updateProgress();

    window.addEventListener("scroll", requestProgressUpdate, {
      passive: true,
    });
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("resize", requestProgressUpdate);

    return () => {
      if (animationFrameRef.current !== 0) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }

      window.clearTimeout(snapLockTimerRef.current);
      window.removeEventListener("scroll", requestProgressUpdate);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", requestProgressUpdate);
    };
  }, [panels.length, scrollTargetId]);

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
