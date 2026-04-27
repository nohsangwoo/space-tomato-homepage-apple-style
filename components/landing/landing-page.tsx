import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Bot,
  Eye,
  Layers3,
  MousePointer2,
  Orbit,
  Sparkles,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollHeroSequence } from "@/components/landing/scroll-hero-sequence";
import { ScrollStoryStage } from "@/components/landing/scroll-story-stage";
import { cn } from "@/lib/utils";

const capabilities = [
  {
    title: "Interactive Web",
    description:
      "Cinematic pages, motion systems, and responsive interfaces that make the product feel present.",
    icon: MousePointer2,
    imageSrc: "/assets/InteractiveWeb.jpg",
    imageComment: "CAPABILITY_IMAGE_01",
  },
  {
    title: "AI Content System",
    description:
      "Structured content flows that help teams produce, adapt, and ship sharper brand narratives.",
    icon: Bot,
    imageSrc: "/assets/AIContentSystem.jpg",
    imageComment: "CAPABILITY_IMAGE_02",
  },
  {
    title: "Conversion UX",
    description:
      "Intentional pathways that turn attention into action without flattening the atmosphere.",
    icon: Layers3,
    imageSrc: "/assets/ConversionUX.jpg",
    imageComment: "CAPABILITY_IMAGE_03",
  },
];

const process = [
  {
    label: "01 Seed",
    description: "We isolate the core signal: audience, promise, threat, and desired action.",
  },
  {
    label: "02 Growth",
    description: "The interface system grows around the signal with hierarchy, motion, and flow.",
  },
  {
    label: "03 Mutation",
    description: "We stress-test the experience across devices until the weak parts change shape.",
  },
  {
    label: "04 Domination",
    description: "Launch, measure, and tune the page so the experience keeps pulling attention.",
  },
];

const works = [
  {
    title: "Abyssal Launch",
    category: "Interactive Campaign",
    imageSrc: "/assets/SelectedWorks/AbyssalLaunch.jpg",
    imageComment: "PORTFOLIO_IMAGE_01",
  },
  {
    title: "Red Signal",
    category: "Conversion Landing",
    imageSrc: "/assets/SelectedWorks/RedSignal.jpg",
    imageComment: "PORTFOLIO_IMAGE_02",
  },
  {
    title: "Living Archive",
    category: "AI Content System",
    imageSrc: "/assets/SelectedWorks/LivingArchive.jpg",
    imageComment: "PORTFOLIO_IMAGE_03",
  },
  {
    title: "Orbital Rite",
    category: "Product Experience",
    imageSrc: "/assets/SelectedWorks/OrbitalRite.jpg",
    imageComment: "PORTFOLIO_IMAGE_04",
  },
];

const palette = [
  { name: "Void", value: "#000000", className: "bg-[#000000]" },
  { name: "Primary Red", value: "#FF2D2D", className: "bg-[#FF2D2D]" },
  { name: "Deep Red", value: "#8A0F0F", className: "bg-[#8A0F0F]" },
  { name: "Bone Text", value: "#FFFFFF", className: "bg-white" },
  { name: "Subtext", value: "#AAAAAA", className: "bg-[#AAAAAA]" },
];

const companyDetails = [
  { label: "Legal Name", value: "LUDGI Inc." },
  { label: "CEO", value: "Sangwoo Noh" },
  { label: "Established", value: "2024" },
  { label: "Business Registration No.", value: "307-88-03283" },
  { label: "D-U-N-S No.", value: "963415644" },
];

const contactDetails = [
  { label: "Email", value: "milli@molluhub.com", href: "mailto:milli@molluhub.com" },
  { label: "Office", value: "+82 2-931-9310", href: "tel:+8229319310" },
  { label: "Mobile", value: "+82 10-9915-7569", href: "tel:+821099157569" },
  { label: "Address", value: "Songdo Centroad, Incheon, South Korea" },
];

const storyPanelCount = 6;

const storyAnchors = [
  { id: "capabilities", panelIndex: 1 },
  { id: "process", panelIndex: 2 },
  { id: "works", panelIndex: 3 },
  { id: "design-system", panelIndex: 4 },
  { id: "contact", panelIndex: 5 },
];

function storyAnchorStyle(panelIndex: number): CSSProperties {
  return {
    top: `calc((100% - 100vh) * ${panelIndex / (storyPanelCount - 1)})`,
  };
}

function PlaceholderFrame({
  comment,
  src,
  alt,
  sizes = "(min-width: 768px) 33vw, 100vw",
  className,
}: {
  comment: string;
  src?: string;
  alt?: string;
  sizes?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md border border-red-500/10 bg-black/20",
        "before:absolute before:inset-0 before:bg-[linear-gradient(110deg,transparent_0%,rgba(255,45,45,0.12)_45%,transparent_72%)] before:opacity-30",
        "after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_0%,rgba(255,45,45,0.12),transparent_46%)]",
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          sizes={sizes}
          className="object-cover opacity-90 transition duration-500 group-hover/card:scale-[1.04]"
        />
      ) : (
        <>
          {comment === "CAPABILITY_IMAGE_01" && <>{/* CAPABILITY_IMAGE_01 */}</>}
          {comment === "CAPABILITY_IMAGE_02" && <>{/* CAPABILITY_IMAGE_02 */}</>}
          {comment === "CAPABILITY_IMAGE_03" && <>{/* CAPABILITY_IMAGE_03 */}</>}
          {comment === "PORTFOLIO_IMAGE_01" && <>{/* PORTFOLIO_IMAGE_01 */}</>}
          {comment === "PORTFOLIO_IMAGE_02" && <>{/* PORTFOLIO_IMAGE_02 */}</>}
          {comment === "PORTFOLIO_IMAGE_03" && <>{/* PORTFOLIO_IMAGE_03 */}</>}
          {comment === "PORTFOLIO_IMAGE_04" && <>{/* PORTFOLIO_IMAGE_04 */}</>}
        </>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/8 to-transparent" />
      <div className="absolute inset-x-5 top-5 h-px bg-red-500/25" />
      <div className="absolute inset-x-5 bottom-5 h-px bg-white/5" />
    </div>
  );
}

function StorySectionHeader({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto mb-6 max-w-3xl text-center sm:mb-8", className)}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-normal text-red-400 sm:mb-4">
        {eyebrow}
      </p>
      <h2 className="text-2xl font-semibold leading-tight text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-6 text-white/60 sm:mt-5 sm:text-lg sm:leading-7">
        {description}
      </p>
    </div>
  );
}

function StoryPanelShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="flex h-full w-full items-center px-5 pb-5 pt-20 sm:px-8 sm:pb-8 sm:pt-24 lg:py-20">
      <div className={cn("mx-auto w-full max-w-7xl", className)}>{children}</div>
    </div>
  );
}

function HeroStoryPanel() {
  return (
    <StoryPanelShell className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end">
      <div className="max-w-4xl">
        <p className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-normal text-red-300">
          <Eye className="size-4" />
          Organic sci-fi interface studio
        </p>
        <h1 className="text-5xl font-black leading-[0.94] tracking-normal text-white sm:text-6xl lg:text-8xl">
          Space
          <br />
          Tomato
        </h1>
        <p className="mt-7 max-w-2xl text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">
          We don&apos;t build websites.
          <br />
          We summon experiences.
        </p>
        <p className="mt-6 max-w-xl text-base leading-7 text-white/64 sm:text-lg">
          A landing system for brands that need presence, tension, and a page
          that behaves like it knows the visitor is there.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href="#contact"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 rounded-lg bg-[#FF2D2D] px-6 text-white shadow-[0_0_20px_rgba(255,45,45,0.6)] hover:bg-red-500"
            )}
          >
            Start the Project
            <ArrowRight />
          </a>
          <a
            href="#works"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 rounded-lg border-white/20 bg-white/[0.03] px-6 text-white hover:border-red-400/60 hover:bg-red-500/10"
            )}
          >
            View Works
          </a>
        </div>
      </div>

      <aside className="hidden rounded-md border border-red-500/15 bg-white/[0.03] p-5 text-sm text-white/70 shadow-[0_0_70px_rgba(138,15,15,0.22)] backdrop-blur-md lg:block">
        <div className="mb-10 flex items-center justify-between">
          <span className="text-xs uppercase tracking-normal text-red-300">
            Entity Link
          </span>
          <Orbit className="size-5 text-red-300" />
        </div>
        <div className="space-y-5">
          {["Presence", "Tension", "Conversion"].map((item, index) => (
            <div key={item}>
              <div className="mb-2 flex items-center justify-between">
                <span>{item}</span>
                <span className="text-red-300">{88 + index * 4}%</span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-white/8">
                <div
                  className="h-full rounded-full bg-[#FF2D2D] shadow-[0_0_18px_rgba(255,45,45,0.7)]"
                  style={{ width: `${88 + index * 4}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </aside>
    </StoryPanelShell>
  );
}

function CapabilitiesStoryPanel() {
  return (
    <StoryPanelShell>
      <StorySectionHeader
        eyebrow="Capabilities"
        title="Tools for interfaces that feel alive."
        description="Each layer is built to serve the atmosphere first, then guide the visitor into a deliberate action."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {capabilities.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.title}
              size="sm"
              className="group rounded-md border border-red-500/10 bg-black/45 py-3 text-white shadow-none backdrop-blur-md transition-all duration-300 hover:border-red-400/35 hover:shadow-[0_0_34px_rgba(255,45,45,0.18)] sm:py-0"
            >
              <PlaceholderFrame
                comment={item.imageComment}
                src={item.imageSrc}
                alt={`${item.title} visual`}
                className="hidden aspect-[16/8] rounded-b-none border-x-0 border-t-0 sm:block"
              />
              <CardHeader className="grid-cols-[auto_1fr] items-center gap-3 px-4 sm:block sm:px-5 sm:pt-5">
                <div className="flex size-9 items-center justify-center rounded-md border border-red-500/20 bg-red-500/10 text-red-300 sm:mb-2 sm:size-10">
                  <Icon className="size-5" />
                </div>
                <CardTitle className="text-lg font-semibold text-white sm:text-xl">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="hidden px-4 pb-4 sm:block sm:px-5 sm:pb-6">
                <CardDescription className="text-xs leading-5 text-white/62 sm:text-sm sm:leading-6">
                  {item.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </StoryPanelShell>
  );
}

function ProcessStoryPanel() {
  return (
    <StoryPanelShell>
      <StorySectionHeader
        eyebrow="Process"
        title="A ritual path from weak signal to dominant presence."
        description="The work grows, changes, and sharpens until the page can hold attention."
      />

      <div className="relative grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        <div className="absolute left-0 top-7 hidden h-px w-full bg-red-500/20 shadow-[0_0_22px_rgba(255,45,45,0.5)] lg:block" />
        {process.map((item) => (
          <div key={item.label} className="relative">
            <div className="mb-3 flex size-10 items-center justify-center rounded-full border border-red-500/30 bg-black text-red-200 shadow-[0_0_24px_rgba(255,45,45,0.18)] sm:mb-5 sm:size-14">
              <span className="size-2 rounded-full bg-[#FF2D2D] shadow-[0_0_16px_rgba(255,45,45,0.8)]" />
            </div>
            <h3 className="text-base font-semibold text-white sm:text-xl">
              {item.label}
            </h3>
            <p className="mt-2 max-w-sm text-xs leading-5 text-white/62 sm:mt-4 sm:text-sm sm:leading-7">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </StoryPanelShell>
  );
}

function WorksStoryPanel() {
  return (
    <StoryPanelShell>
      <StorySectionHeader
        eyebrow="Selected Works"
        title="Frames reserved for the worlds you want to reveal."
        description="Cinematic interface worlds shaped around launch momentum, conversion pressure, content intelligence, and product presence."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {works.map((item) => (
          <article
            key={item.title}
            className="group relative overflow-hidden rounded-md border border-red-500/10 bg-black/45 transition duration-300 hover:border-red-400/35"
          >
            <PlaceholderFrame
              comment={item.imageComment}
              src={item.imageSrc}
              alt={`${item.title} visual`}
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="aspect-[4/3] rounded-none border-0 transition duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-red-600/0 transition duration-300 group-hover:bg-red-600/12" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/78 to-transparent p-4">
              <p className="text-xs font-semibold uppercase tracking-normal text-red-300">
                {item.category}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-white sm:text-xl">
                {item.title}
              </h3>
            </div>
          </article>
        ))}
      </div>
    </StoryPanelShell>
  );
}

function DesignSystemStoryPanel() {
  return (
    <StoryPanelShell>
      <StorySectionHeader
        eyebrow="Design System"
        title="A restrained system for an aggressive mood."
        description="Black carries the experience, red marks intent, and every element stays subordinate to the moving background entity."
      />

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-5">
        <div className="rounded-md border border-white/8 bg-black/45 p-3 backdrop-blur-md sm:p-5">
          <div className="grid grid-cols-5 gap-2 sm:gap-3">
            {palette.map((color) => (
              <div
                key={color.name}
                className="rounded-md border border-white/8 p-2 sm:p-3"
              >
                <div
                  className={cn("mb-2 h-10 rounded-md sm:mb-4 sm:h-16", color.className)}
                />
                <p className="truncate text-xs font-semibold text-white sm:text-sm">
                  {color.name}
                </p>
                <p className="mt-1 hidden text-xs text-white/50 sm:block">
                  {color.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-md border border-white/8 bg-black/45 p-4 backdrop-blur-md sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-normal text-red-300">
            Type and Controls
          </p>
          <p className="mt-4 text-3xl font-black leading-none text-white sm:mt-5 sm:text-4xl">
            Something is watching.
          </p>
          <p className="mt-3 text-sm leading-6 text-white/62 sm:mt-4 sm:text-base sm:leading-7">
            Let&apos;s make them stay with sharp hierarchy, durable spacing,
            and actions that glow only when they matter.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row">
            <a
              href="#contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 rounded-lg bg-[#FF2D2D] px-6 text-white shadow-[0_0_20px_rgba(255,45,45,0.6)] hover:bg-red-500"
              )}
            >
              Start the Project
              <Sparkles />
            </a>
            <a
              href="#works"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "hidden h-12 rounded-lg border-white/20 bg-transparent px-6 text-white hover:border-red-400/60 hover:bg-red-500/10 sm:inline-flex"
              )}
            >
              View Works
            </a>
          </div>
        </div>
      </div>
    </StoryPanelShell>
  );
}

function FinalInvocationStoryPanel() {
  return (
    <StoryPanelShell className="max-w-4xl text-center">
      <p className="mb-5 text-xs font-semibold uppercase tracking-normal text-red-300">
        Final Invocation
      </p>
      <h2 className="text-4xl font-black leading-tight text-white sm:text-6xl">
        Ready to summon something extraordinary?
      </h2>
      <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/68 sm:text-lg">
        Bring the story, product, or campaign. We will shape the interface into
        something visitors remember before they understand why.
      </p>
      <a
        href="mailto:milli@molluhub.com"
        className={cn(
          buttonVariants({ size: "lg" }),
          "mt-9 h-12 rounded-lg bg-[#FF2D2D] px-6 text-white shadow-[0_0_20px_rgba(255,45,45,0.6)] hover:bg-red-500"
        )}
      >
        Start the Project
        <ArrowRight />
      </a>
    </StoryPanelShell>
  );
}

export function LandingPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-black/30 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="flex items-center gap-3">
            <span className="relative flex size-3">
              <span className="absolute inset-0 animate-ping rounded-full bg-red-500/60" />
              <span className="relative size-3 rounded-full bg-[#FF2D2D]" />
            </span>
            <span className="text-sm font-semibold uppercase tracking-normal text-white">
              Space Tomato
            </span>
          </a>
          <div className="hidden items-center gap-8 text-sm text-white/58 md:flex">
            <a className="transition-colors hover:text-white" href="#capabilities">
              Capabilities
            </a>
            <a className="transition-colors hover:text-white" href="#process">
              Process
            </a>
            <a className="transition-colors hover:text-white" href="#works">
              Works
            </a>
          </div>
          <a
            href="#contact"
            className={cn(
              buttonVariants({ size: "sm" }),
              "border border-red-500/40 bg-red-600/90 text-white shadow-[0_0_20px_rgba(255,45,45,0.28)] hover:bg-[#FF2D2D]"
            )}
          >
            Start
            <ArrowRight />
          </a>
        </nav>
      </header>

      <section
        id="top"
        className="relative h-[720vh]"
      >
        {storyAnchors.map((anchor) => (
          <span
            key={anchor.id}
            id={anchor.id}
            className="absolute left-0 size-px"
            style={storyAnchorStyle(anchor.panelIndex)}
            aria-hidden="true"
          />
        ))}

        <div className="sticky top-0 h-screen overflow-hidden">
          {/* HERO_SCROLL_FRAME_SEQUENCE */}
          <ScrollHeroSequence className="absolute inset-0 h-full w-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.2)_60%,rgba(0,0,0,0.96)_100%)]" />
          <div className="ritual-grid absolute inset-0 opacity-35" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />

          <ScrollStoryStage
            scrollTargetId="top"
            className="relative z-10 h-full w-full"
          >
            <HeroStoryPanel />
            <CapabilitiesStoryPanel />
            <ProcessStoryPanel />
            <WorksStoryPanel />
            <DesignSystemStoryPanel />
            <FinalInvocationStoryPanel />
          </ScrollStoryStage>
        </div>
      </section>

      <footer className="border-t border-white/8 px-5 py-12 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 text-sm text-white/52 lg:grid-cols-[1.2fr_1fr_1.1fr_0.8fr]">
          <div>
            <p className="font-semibold uppercase tracking-normal text-white">
              Space Tomato
            </p>
            <p className="mt-3 max-w-xs leading-6">
              Operated by LUDGI Inc., a trusted technology partner for SEO, AI,
              cloud, technology consulting, and SaaS.
            </p>
            <p className="mt-6 text-xs text-white/34">
              (c) 2026 LUDGI Inc. All rights reserved.
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-normal text-red-300">
              Company
            </p>
            <dl className="space-y-3">
              {companyDetails.map((item) => (
                <div key={item.label}>
                  <dt className="text-white/36">{item.label}</dt>
                  <dd className="mt-1 text-white/72">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-normal text-red-300">
              Contact
            </p>
            <dl className="space-y-3">
              {contactDetails.map((item) => (
                <div key={item.label}>
                  <dt className="text-white/36">{item.label}</dt>
                  <dd className="mt-1 text-white/72">
                    {item.href ? (
                      <a className="transition-colors hover:text-white" href={item.href}>
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-normal text-red-300">
              Navigate
            </p>
            <div className="flex flex-col gap-3">
              <a className="transition-colors hover:text-white" href="#capabilities">
                Capabilities
              </a>
              <a className="transition-colors hover:text-white" href="#process">
                Process
              </a>
              <a className="transition-colors hover:text-white" href="#works">
                Works
              </a>
              <a className="transition-colors hover:text-white" href="#top">
                Return
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
