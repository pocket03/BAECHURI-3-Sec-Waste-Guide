import Image from "next/image";

export function BrandMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <Image
      src="/baechuri-mark.png"
      alt="배추리 매니저"
      width={size}
      height={size}
      className={className}
      priority
    />
  );
}
