interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "h-4 w-full" }: SkeletonProps) {
  return (
    <div className={`animate-pulse rounded-lg bg-[#5C5470]/30 ${className}`} aria-hidden="true" />
  );
}

export default Skeleton;
