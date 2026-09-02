/**
 * BentoCard.jsx
 * Reusable bento-grid card container with a mouse-move spotlight glow effect.
 * Wraps any children with consistent card styling and optional click handler.
 */

import React, { useRef, useEffect, useCallback } from 'react';

/**
 * @param {object}   props
 * @param {React.ReactNode} props.children   - Card content
 * @param {string}   [props.className]       - Extra Tailwind classes appended to the card
 * @param {number}   [props.colSpan]         - CSS grid column span (1-12)
 * @param {Function} [props.onClick]         - Optional click / navigation handler
 */
export default function BentoCard({ children, className = '', colSpan, onClick }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  /**
   * Track mouse position inside the card and paint a radial spotlight on the
   * transparent glow layer that sits between the background and the content.
   */
  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    glow.style.background = `radial-gradient(300px circle at ${x}px ${y}px, rgba(192,193,255,0.07), transparent 70%)`;
  }, []);

  /** Clear spotlight when the cursor leaves the card */
  const handleMouseLeave = useCallback(() => {
    const glow = glowRef.current;
    if (glow) glow.style.background = 'transparent';
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  // Inline grid-column style when a colSpan is supplied
  const spanStyle = colSpan ? { gridColumn: `span ${colSpan}` } : {};

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      style={spanStyle}
      className={[
        'bento-card relative overflow-hidden rounded-xl',
        'bg-[#171f33] border border-[#464554]',
        'transition-all duration-200',
        onClick ? 'cursor-pointer hover:border-[#c0c1ff]/40 hover:translate-y-[-1px]' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Spotlight glow layer — sits above bg, below content */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 z-0 transition-background duration-100 ease-out"
        aria-hidden="true"
      />

      {/* Card content — above the glow layer */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
