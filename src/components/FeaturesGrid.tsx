import React from 'react';
import { GlowingEffect } from './ui/glowing-effect';
import { Box, Lock, Search, Settings, Sparkles } from './Icons';

const features = [
  {
    area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
    icon: <Box className="h-4 w-4 text-zinc-400" />,
    title: "High-Quality Production",
    description: "Every beat is meticulously crafted with industry-standard tools to ensure pristine audio quality for your projects.",
  },
  {
    area: "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]",
    icon: <Settings className="h-4 w-4 text-zinc-400" />,
    title: "Instant File Delivery",
    description: "Get your files delivered to your inbox instantly after purchase. No waiting, just creating.",
  },
  {
    area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]",
    icon: <Lock className="h-4 w-4 text-zinc-400" />,
    title: "Flexible & Clear Licensing",
    description: "From simple leases to exclusive rights, our straightforward licensing options cover all your needs.",
  },
  {
    area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]",
    icon: <Sparkles className="h-4 w-4 text-zinc-400" />,
    title: "Diverse Genre Selection",
    description: "Explore a wide range of genres from Trap and Lo-Fi to R&B and Drill to find your perfect sound.",
  },
  {
    area: "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]",
    icon: <Search className="h-4 w-4 text-zinc-400" />,
    title: "Constantly Updated Catalog",
    description: "New beats are added regularly, providing a fresh and continuous source of inspiration for your music.",
  },
];

interface GridItemProps {
    area: string;
    icon: React.ReactNode;
    title: string;
    description: string;
}

const GridItem: React.FC<GridItemProps> = ({ area, icon, title, description }) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border border-zinc-800 p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01} />
        <div
          className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl bg-zinc-950 p-6 md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-zinc-800 bg-zinc-900 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3
                className="-tracking-wide pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-white md:text-2xl/[1.875rem]">
                {title}
              </h3>
              <h2
                className="font-sans text-sm/[1.125rem] text-zinc-400 md:text-base/[1.375rem]">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export const FeaturesGrid: React.FC = () => {
  return (
    <ul
      className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      {features.map((feature, i) => (
        <GridItem key={i} {...feature} />
      ))}
    </ul>
  );
};
