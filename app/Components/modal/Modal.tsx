"use client";

import { useEffect, useRef } from "react";

import type { ModalProps } from "../../Components/modal/modal.type";

export function Modal({
  isOpen,
  title,
  description,
  children,
  onClose,
  footer,
  closeOnOverlayClick = true,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modalRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  function handleOverlayClick(event: React.MouseEvent<HTMLDivElement>) {
    if (!closeOnOverlayClick) {
      return;
    }

    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      role="presentation"
      onMouseDown={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? "modal-description" : undefined}
        tabIndex={-1}
        className="w-full max-w-lg rounded-2xl bg-white shadow-xl outline-none"
      >
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 p-6">
          <div>
            <h2
              id="modal-title"
              className="text-xl font-semibold text-slate-900"
            >
              {title}
            </h2>

            {description && (
              <p id="modal-description" className="mt-1 text-sm text-slate-500">
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            ×
          </button>
        </header>

        <div className="p-6">{children}</div>

        {footer && (
          <footer className="flex justify-end gap-3 border-t border-slate-200 p-6">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
}
