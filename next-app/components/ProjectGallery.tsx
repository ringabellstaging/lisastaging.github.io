"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { ProjectImage } from "@/lib/projects";
import { photoAlt, translator, type Locale } from "@/lib/i18n";

export default function ProjectGallery({
  images,
  title,
  locale = "en",
}: {
  images: ProjectImage[];
  title: string;
  locale?: Locale;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const t = translator(locale);
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
            aria-label={t(
              `Enlarge ${image.alt}`,
              `放大 ${photoAlt(image.alt, locale)}`,
              `放大 ${photoAlt(image.alt, locale)}`,
            )}
            onClick={(event) => {
              lastTrigger.current = event.currentTarget;
              setSelected(index);
            }}
          >
            <Image
              src={image.src}
              alt={photoAlt(image.alt, locale)}
              fill
              sizes={
                index === 0
                  ? "(max-width: 800px) calc(100vw - 40px), (max-width: 1100px) calc(100vw - 64px), (max-width: 1392px) calc(100vw - 112px), 1280px"
                  : "(max-width: 520px) calc((100vw - 52px) / 2), (max-width: 800px) calc((100vw - 62px) / 2), (max-width: 1100px) calc((100vw - 86px) / 2), (max-width: 1392px) calc((100vw - 134px) / 2), 629px"
              }
              priority={index === 0}
              quality={75}
            />
            <span>{t("View full image ↗", "查看大图 ↗", "查看大圖 ↗")}</span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={t(
          `${title} photo gallery`,
          `${title} 案例相册`,
          `${title} 案例相冊`,
        )}
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
              aria-label={t("Close photo gallery", "关闭相册", "關閉相冊")}
            >
              <X size={22} />
            </button>
          </div>
          {selected !== null && (
            <>
              <div className="lightbox-image">
                <Image
                  src={images[selected].src}
                  alt={photoAlt(images[selected].alt, locale)}
                  fill
                  sizes="95vw"
                  quality={90}
                />
              </div>
              <div className="lightbox-controls">
                <button
                  type="button"
                  aria-label={t("Previous photo", "上一张照片", "上一張照片")}
                  onClick={() => move(-1)}
                >
                  <ArrowLeft size={20} />
                </button>
                <span aria-live="polite">
                  {selected + 1} / {images.length}
                </span>
                <button
                  type="button"
                  aria-label={t("Next photo", "下一张照片", "下一張照片")}
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
