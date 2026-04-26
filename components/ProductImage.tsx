"use client";
import NextImage from "next/image";
import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export default function ProductImage({
  src,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
}: Props) {
  const [errored, setErrored] = useState(false);

  if (errored) return null;

  return (
    <NextImage
      src={src}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      priority={priority}
      onError={() => setErrored(true)}
    />
  );
}
