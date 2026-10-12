"use client";

import { useState, type ComponentProps } from "react";
import Link from "next/link";

type Props = Omit<
  ComponentProps<typeof Link>,
  "prefetch" | "onMouseEnter" | "onFocus" | "onTouchStart"
> & { prefetchOnView?: boolean };

// Warm featured routes in view, and other projects only when someone shows intent.
// Keep Next's normal navigation, keyboard behavior and prefetch cache management.
export default function ProjectLink({
  prefetchOnView = false,
  ...props
}: Props) {
  const [active, setActive] = useState(false);
  return (
    <Link
      {...props}
      prefetch={prefetchOnView || active ? null : false}
      onMouseEnter={() => setActive(true)}
      onFocus={() => setActive(true)}
      onTouchStart={() => setActive(true)}
    />
  );
}
