"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { ProjectImage } from "@/lib/projects";

export default function ProjectGallery({
  images,
  title,
}: {
  images: ProjectImage[];
  title: string;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (selected === null) return;
    dialog.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [selected]);
  function close() {
    dialog.current?.close();
    setSelected(null);
    lastTrigger.current?.focus();
  }
  function move(offset: number) {
    setSelected((index) =>
      index === null ? null : (index + offset + images.length) % images.length,
    );
  }
  return (
    <>
      <div className="project-gallery">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className="gallery-photo"
            aria-label={`Enlarge ${image.alt}`}
            onClick={(event) => {
              lastTrigger.current = event.currentTarget;
              setSelected(index);
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={
                index === 0
                  ? "(max-width: 800px) 95vw, 90vw"
                  : "(max-width: 800px) 46vw, 43vw"
              }
              priority={index === 0}
              quality={80}
            />
            <span>View full image ↗</span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={`${title} photo gallery`}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") move(-1);
          if (event.key === "ArrowRight") move(1);
        }}
      >
        <div className="lightbox-inner">
          <div className="lightbox-top">
            <span>{title}</span>
            <button
              type="button"
              onClick={close}
              aria-label="Close photo gallery"
            >
              <X size={22} />
            </button>
          </div>
          {selected !== null && (
            <>
              <div className="lightbox-image">
                <Image
                  src={images[selected].src}
                  alt={images[selected].alt}
                  fill
                  sizes="95vw"
                  quality={90}
                />
              </div>
              <div className="lightbox-controls">
                <button
                  type="button"
                  aria-label="Previous photo"
                  onClick={() => move(-1)}
                >
                  <ArrowLeft size={20} />
                </button>
                <span aria-live="polite">
                  {selected + 1} / {images.length}
                </span>
                <button
                  type="button"
                  aria-label="Next photo"
                  onClick={() => move(1)}
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
