import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';

export const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: {
  name: string;
  className: string;
  background: ReactNode;
  Icon?: any;
  description: string;
  href?: string;
  cta?: string;
}) => (
  <div
    key={name}
    className={cn(
      'group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-xl',
      'bg-zinc-900 border border-zinc-800',
      'hover:border-amber-500/30 transition-all duration-300',
      className
    )}
  >
    <div>{background}</div>
    <div className="pointer-events-none z-10 flex flex-col gap-1 p-6 transition-all duration-300">
      {Icon && <Icon className="h-12 w-12 text-amber-500 mb-2" />}
      <h3 className="text-xl font-semibold text-white">
        {name}
      </h3>
      <p className="text-sm text-zinc-400">{description}</p>
    </div>

    {href && cta && (
      <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <a
          href={href}
          className="pointer-events-auto text-sm font-medium text-amber-500 hover:text-amber-400"
        >
          {cta}
          <span className="ml-1">→</span>
        </a>
      </div>
    )}
  </div>
);
