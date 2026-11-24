import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight,
  Download,
  FileText,
  X,
  ExternalLink,
  Mail,
  MapPin,
  Award,
  GraduationCap,
  Users,
  Menu,
  CheckCircle2,
  Eye,
  Code2,
  Cpu,
  Trophy,
  Sparkles,
  ZoomIn,
} from 'lucide-react';

// Custom Social SVG Icons (GitHub, Instagram)
const GithubIcon = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const InstagramIcon = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

// Hardware-Accelerated Scroll Reveal Component (Smooth 60fps Fade + Slide Up on Scroll)
const ScrollReveal = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`scroll-reveal ${isVisible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

// ============================================================================
// 1. INTERACTIVE 3D HANGING ID CARD (LANYARD) WITH EXACT TRIGONOMETRIC JOINT
// ============================================================================
const HangingIdCard = () => {
  const stageRef = useRef(null);
  const strapRef = useRef(null);
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const [isDraggingUI, setIsDraggingUI] = useState(false);

  // Base vertical distance (px) from top ceiling pivot to card lanyard slot
  const BASE_STRAP_LEN = 84;

  const physRef = useRef({
    isDragging: false,
    isHovering: false,
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    targetX: 0,
    targetY: 0,
    rotZ: 0,
    vRotZ: 0,
    rotX: 0,
    vRotX: 0,
    rotY: 0,
    vRotY: 0,
    targetRotX: 0,
    targetRotY: 0,
  });

  useEffect(() => {
    let rafId;
    const p = physRef.current;

    const animate = (time) => {
      if (p.isDragging) {
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        p.vx = dx * 0.34;
        p.vy = dy * 0.34;
        p.x += p.vx;
        p.y += p.vy;

        // Calculate exact rope vector from ceiling anchor (0, 0) to card hook (p.x, BASE_STRAP_LEN + p.y)
        const hookX = p.x;
        const hookY = Math.max(45, BASE_STRAP_LEN + p.y);
        const ropeAngleDeg = -Math.atan2(hookX, hookY) * (180 / Math.PI);

        // Card aligns naturally with the lanyard angle plus slight inertia swing
        const desiredRotZ = Math.max(-42, Math.min(42, ropeAngleDeg - p.vx * 0.28));
        p.rotZ += (desiredRotZ - p.rotZ) * 0.32;

        // 3D depth tilt while dragging
        const desiredRotY = Math.max(-28, Math.min(28, p.x * 0.13 + p.vx * 0.25));
        const desiredRotX = Math.max(-22, Math.min(22, -p.y * 0.11 - p.vy * 0.18));
        p.rotY += (desiredRotY - p.rotY) * 0.28;
        p.rotX += (desiredRotX - p.rotX) * 0.28;
      } else {
        // Spring physics back to center equilibrium
        const stiffness = 0.08;
        const damping = 0.85;

        // Subtle ambient pendulum sway when idle
        const idleX = p.isHovering ? 0 : Math.sin(time * 0.0016) * 6;
        const ax = (idleX - p.x) * stiffness;
        const ay = (0 - p.y) * stiffness;
        p.vx = (p.vx + ax) * damping;
        p.vy = (p.vy + ay) * damping;
        p.x += p.vx;
        p.y += p.vy;

        const hookX = p.x;
        const hookY = Math.max(45, BASE_STRAP_LEN + p.y);
        const ropeAngleDeg = -Math.atan2(hookX, hookY) * (180 / Math.PI);

        const idleSwayY = p.isHovering ? p.targetRotY : Math.cos(time * 0.0015) * 4.5;
        const idleSwayX = p.isHovering ? p.targetRotX : Math.sin(time * 0.0013) * 2.0;

        // Pendulum swing physics locked to rope angle
        const targetZ = ropeAngleDeg - p.vx * 0.45;
        const aRotZ = (targetZ - p.rotZ) * 0.14;
        p.vRotZ = (p.vRotZ + aRotZ) * 0.82;
        p.rotZ += p.vRotZ;

        // 3D Tilt X & Y spring
        const aRotX = (idleSwayX - p.rotX) * 0.11;
        const aRotY = (idleSwayY - p.rotY) * 0.11;
        p.vRotX = (p.vRotX + aRotX) * 0.82;
        p.vRotY = (p.vRotY + aRotY) * 0.82;
        p.rotX += p.vRotX;
        p.rotY += p.vRotY;
      }

      // Exact trigonometric distance & angle from top ceiling pivot (0,0) to card hook (p.x, BASE_STRAP_LEN + p.y)
      // This guarantees the strap and metal clip NEVER detach or leave a gap!
      const hookX = p.x;
      const hookY = Math.max(45, BASE_STRAP_LEN + p.y);
      const exactLength = Math.hypot(hookX, hookY);
      const exactAngleDeg = -Math.atan2(hookX, hookY) * (180 / Math.PI);

      if (strapRef.current) {
        strapRef.current.style.height = `${exactLength + 6}px`;
        strapRef.current.style.transform = `translate3d(-50%, 0, 0) rotate(${exactAngleDeg}deg)`;
      }

      // Update 3D ID Card Transform (Anchored right at the hook joint)
      if (cardRef.current) {
        cardRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotateZ(${p.rotZ}deg) rotateX(${p.rotX}deg) rotateY(${p.rotY}deg)`;
      }

      // Update Specular Glare Reflection
      if (glareRef.current) {
        const gx = Math.max(0, Math.min(100, 50 + p.rotY * 1.8));
        const gy = Math.max(0, Math.min(100, 35 - p.rotX * 1.8));
        glareRef.current.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.26) 0%, rgba(56,189,248,0.10) 38%, transparent 70%)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handlePointerDown = (e) => {
    const p = physRef.current;
    p.isDragging = true;
    setIsDraggingUI(true);
    p.startX = e.clientX - p.x;
    p.startY = e.clientY - p.y;
    if (e.currentTarget.setPointerCapture) {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // Ignore capture errors
      }
    }
  };

  const handlePointerMove = (e) => {
    const p = physRef.current;
    if (p.isDragging) {
      const rawX = e.clientX - p.startX;
      const rawY = e.clientY - p.startY;
      p.targetX = Math.max(-185, Math.min(185, rawX));
      p.targetY = Math.max(-65, Math.min(155, rawY));
    } else if (stageRef.current) {
      p.isHovering = true;
      const rect = stageRef.current.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      p.targetRotY = relX * 26;
      p.targetRotX = -relY * 22;
    }
  };

  const handlePointerUp = () => {
    const p = physRef.current;
    if (p.isDragging) {
      p.isDragging = false;
      setIsDraggingUI(false);
    }
  };

  const handlePointerLeave = () => {
    const p = physRef.current;
    p.isHovering = false;
    if (!p.isDragging) {
      p.targetRotX = 0;
      p.targetRotY = 0;
    }
  };

  return (
    <div
      ref={stageRef}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      className="relative w-full h-[460px] sm:h-[510px] flex flex-col items-center justify-start select-none overflow-visible"
      style={{ perspective: '1300px' }}
    >
      {/* Ambient Backlight Glow Behind Hanging ID Card */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-88 sm:h-88 rounded-full opacity-75 blur-2xl"
        style={{
          background:
            'radial-gradient(circle, rgba(59, 130, 246, 0.32) 0%, rgba(56, 189, 248, 0.08) 55%, transparent 75%)',
        }}
      />

      {/* Top Ceiling Anchor Mount */}
      <div className="relative z-40 w-12 h-2.5 rounded-b-lg bg-gradient-to-r from-slate-700 via-slate-400 to-slate-700 border border-white/20 shadow-md" />

      {/* LANYARD STRAP (Dynamically stretches & rotates to exact card hook coordinates — never breaks!) */}
      <div
        ref={strapRef}
        style={{
          height: `${BASE_STRAP_LEN + 6}px`,
          transformOrigin: 'top center',
          willChange: 'transform, height',
        }}
        className="absolute top-0 left-1/2 z-40 flex flex-col items-center pointer-events-none"
      >
        {/* Black Fabric Lanyard Ribbon with Branding Text (flex-1 so it stretches seamlessly without distorting the metal clip) */}
        <div className="w-10 sm:w-11 flex-1 min-h-[48px] bg-gradient-to-b from-[#060B14] via-[#111C2F] to-[#080E1A] border-x border-white/15 shadow-[0_10px_25px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center overflow-hidden relative">
          {/* Fabric Stitch Lines */}
          <div className="absolute inset-y-0 left-1 w-px border-l border-dashed border-white/15" />
          <div className="absolute inset-y-0 right-1 w-px border-r border-dashed border-white/15" />

          {/* Vertical Branding on Lanyard Ribbon */}
          <div
            style={{ writingMode: 'vertical-rl' }}
            className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-display font-extrabold tracking-[0.18em] text-[#F1F5F9]/90 uppercase py-1"
          >
            <span className="w-4 h-4 rounded-full border border-[#38BDF8] text-[#38BDF8] flex items-center justify-center text-[8px] font-mono shrink-0">
              E
            </span>
            <span className="whitespace-nowrap">Evan Prasetya</span>
          </div>
        </div>

        {/* Metallic Silver Clamp (Fixed proportions, never distorted) */}
        <div className="w-11 sm:w-12 h-3.5 shrink-0 rounded-[4px] bg-gradient-to-r from-slate-400 via-slate-100 to-slate-500 border border-white/50 shadow-md flex items-center justify-center">
          <div className="w-6 h-1 rounded-full bg-slate-700/40" />
        </div>
        {/* Metal Hook Ring connecting directly into the Card Slot Hole */}
        <div className="w-3.5 h-5 -mt-1 shrink-0 rounded-full border-[3px] border-slate-200 shadow-[0_2px_6px_rgba(0,0,0,0.85)] bg-transparent" />
      </div>

      {/* 3D DRAGGABLE ID CARD HOLDER (Pivot origin set directly at top slot hole `50% 14px`) */}
      <div
        ref={cardRef}
        onPointerDown={handlePointerDown}
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: '50% 14px',
          willChange: 'transform',
          touchAction: 'none',
        }}
        className={`relative z-30 mt-[74px] w-[292px] sm:w-[332px] rounded-[20px] p-2.5 bg-gradient-to-b from-[#17253B] via-[#0B1322] to-[#070C16] border-[2px] ${isDraggingUI ? 'border-[#38BDF8] cursor-grabbing' : 'border-white/20 cursor-grab'
          } shadow-[0_28px_65px_rgba(0,0,0,0.9),0_0_30px_rgba(59,130,246,0.2)] transition-colors duration-200`}
      >
        {/* Dynamic Glare Overlay */}
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 rounded-[18px] z-30 mix-blend-screen transition-opacity duration-200"
        />

        {/* Top Lanyard Slot Cutout Hole */}
        <div className="mx-auto mb-2 w-14 h-3 rounded-full bg-[#050912] border border-white/20 shadow-inner flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300/30" />
        </div>

        {/* INNER EDITORIAL POSTER CARD */}
        <div className="relative rounded-[14px] overflow-hidden bg-[#EBE7DC] text-[#0E1E38] border border-[#0E1E38]/20 shadow-inner">
          {/* Subtle Technical Grid Background on Cream Card */}
          <div
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(14, 30, 56, 0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(14, 30, 56, 0.22) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          {/* Top Bar: Role Badge & University Identity */}
          <div className="relative z-10 px-3.5 pt-3 pb-1 flex items-center justify-between">
            <span className="px-2.5 py-0.5 bg-[#0E1E38] text-[#EBE7DC] font-display font-black text-[10px] tracking-[0.16em] uppercase">
              FULL-STACK
            </span>
            <div className="flex items-center gap-1.5 text-right">
              <div className="w-5 h-5 rounded-full bg-[#0E1E38] text-[#38BDF8] flex items-center justify-center font-mono text-[8px] font-black">
                USM
              </div>
              <div className="leading-[1.05] font-display font-extrabold text-[8px] text-[#0E1E38] uppercase tracking-tight">
                <div>UNIVERSITAS</div>
                <div>SEMARANG</div>
              </div>
            </div>
          </div>

          {/* Giant Editorial Headline "DEVELOPER" Behind Portrait */}
          <div className="relative z-10 px-3 pt-0.5">
            <div className="border-y border-[#0E1E38]/40 py-1 relative flex items-center justify-center">
              <span className="absolute -top-1 -left-1 w-1.5 h-1.5 rounded-full bg-[#0E1E38]" />
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-[#0E1E38]" />
              <span className="absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full bg-[#0E1E38]" />
              <span className="absolute -bottom-1 -right-1 w-1.5 h-1.5 rounded-full bg-[#0E1E38]" />

              <div className="font-display font-black text-[38px] sm:text-[43px] leading-none tracking-[-0.04em] text-[#0E1E38] uppercase select-none">
                DEVELOPER
              </div>

              <span className="absolute left-[34%] top-1/2 -translate-y-1/2 -rotate-12 px-1.5 py-0.5 bg-[#EBE7DC] border border-[#0E1E38] font-mono text-[7px] font-black uppercase tracking-wider text-[#0E1E38] shadow-sm">
                VERIFIED
              </span>
            </div>
          </div>

          {/* Center Composition: Ocean Blue Window + Vertical Title + Cutout Photo */}
          <div className="relative z-10 px-3.5 pt-2 h-[245px] sm:h-[272px] flex items-end justify-center overflow-hidden">
            <div className="absolute left-3.5 top-3 bottom-4 w-[58%] rounded-[4px] bg-gradient-to-br from-[#0F294A] via-[#153B6B] to-[#0A182E] overflow-hidden border border-[#0E1E38]/30 shadow-inner">
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 30% 30%, rgba(56, 189, 248, 0.45), transparent 65%)',
                }}
              />
            </div>

            <div className="absolute right-3.5 top-3 bottom-4 w-[28%] border border-[#0E1E38]/40 flex items-center justify-center">
              <span className="absolute -top-1 -left-1 w-1.5 h-1.5 rounded-full bg-[#0E1E38]" />
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-[#0E1E38]" />
              <span className="absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full bg-[#0E1E38]" />
              <span className="absolute -bottom-1 -right-1 w-1.5 h-1.5 rounded-full bg-[#0E1E38]" />
              <div
                style={{ writingMode: 'vertical-rl' }}
                className="rotate-180 font-display font-black text-[18px] sm:text-[20px] tracking-[0.04em] text-[#0E1E38] uppercase whitespace-nowrap select-none"
              >
                SISTEM INFORMASI
              </div>
            </div>

            <img
              src="/profile/evan-cutout.png"
              alt="Alfarell Nabil Evan Prasetya"
              draggable={false}
              className="relative z-20 h-[118%] sm:h-[120%] w-auto object-contain object-bottom scale-[1.06] origin-bottom drop-shadow-[0_12px_20px_rgba(10,20,36,0.6)] pointer-events-none select-none"
              onError={(e) => {
                e.currentTarget.src = '/profile/evan-profile.jpg';
              }}
            />

            <div className="absolute bottom-3.5 left-4 z-30 -rotate-2 bg-[#EBE7DC] border-[1.5px] border-[#0E1E38] px-2.5 py-1 shadow-[0_6px_14px_rgba(0,0,0,0.35)]">
              <span className="font-display font-black text-[10px] sm:text-[11px] tracking-[0.04em] text-[#0E1E38] uppercase block">
                ALFARELL NABIL EVAN P.
              </span>
            </div>
          </div>

          {/* Bottom Navy Footer Strip inside ID Card */}
          <div className="relative z-20 bg-[#0E1E38] text-[#EBE7DC] px-3.5 py-2.5 flex items-center justify-between">
            <span className="font-display font-black text-[16px] sm:text-[18px] tracking-tight uppercase leading-none">
              PORTFOLIO
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[7px] text-[#38BDF8] tracking-widest uppercase">
                (((((●)))))
              </span>
              <div className="font-mono text-[8px] leading-[1.15] text-[#EBE7DC]/80 text-right">
                <div>Clean code</div>
                <div>&amp; architecture</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 2. INTERACTIVE 3D TILT CARD FOR CERTIFICATES & PROJECT SHOWCASE
// ============================================================================
const Interactive3DCard = ({ children, onClick, className = '' }) => {
  const cardRef = useRef(null);
  const glareRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    if (glareRef.current) {
      const gx = (x / rect.width) * 100;
      const gy = (y / rect.height) * 100;
      glareRef.current.style.opacity = '1';
      glareRef.current.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(56, 189, 248, 0.22) 0%, rgba(255, 255, 255, 0.06) 40%, transparent 70%)`;
    }
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.25s ease',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      className={`relative ${className}`}
    >
      <div
        ref={glareRef}
        style={{ opacity: 0 }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-20 transition-opacity duration-300"
      />
      {children}
    </div>
  );
};

export default function App() {
  const [activeNav, setActiveNav] = useState('profile');
  const [portfolioTab, setPortfolioTab] = useState('projects'); // 'projects' | 'certificates' | 'achievements' | 'techstack'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showCVModal, setShowCVModal] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const cvFileUrl = '/CV - Alfarell Nabil Evan Prasetya.pdf';

  // Passive Scroll Progress Bar
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const docHeight =
            document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const progress =
            docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lightweight IntersectionObserver for Active Section Indicator
  useEffect(() => {
    const sectionIds = ['profile', 'about', 'selected', 'career', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveNav(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Close Modals on Escape Key
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (zoomedImage) setZoomedImage(null);
        else if (selectedProject) setSelectedProject(null);
        else if (selectedCertificate) setSelectedCertificate(null);
        else if (showCVModal) setShowCVModal(false);
        else if (mobileMenuOpen) setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [zoomedImage, selectedProject, selectedCertificate, showCVModal, mobileMenuOpen]);

  // Navigasi Utama
  const navItems = [
    { id: 'profile', code: '01', label: 'PROFIL', href: '#profile', tab: null },
    { id: 'selected', code: '02', label: 'PORTFOLIO', href: '#selected', tab: 'projects' },
    {
      id: 'credentials',
      code: '03',
      label: 'SERTIFIKAT',
      href: '#selected',
      tab: 'certificates',
    },
    { id: 'career', code: '04', label: 'PENDIDIKAN', href: '#career', tab: null },
    { id: 'contact', code: '05', label: 'KONTAK', href: '#contact', tab: null },
  ];

  // Spesialisasi & Keahlian (Sesuai dengan Projek Asli)
  const specializations = [
    {
      num: '01',
      title: 'FRONTEND & AI WEB APPLICATION',
      description:
        'Pengembangan antarmuka web modern yang interaktif, responsif, serta integrasi kemampuan Multimodal AI dan Real-Time Video AI pada aplikasi berbasis browser.',
      skills: [
        'React.js',
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'Vanilla JS',
        'Google Gemini API',
        'Decart AI SDK',
      ],
    },
    {
      num: '02',
      title: 'BACKEND & RESTFUL API ARCHITECTURE',
      description:
        'Perancangan arsitektur sistem client-server, pengembangan endpoint RESTful API berkinerja tinggi, keamanan pemindaian URL real-time, serta manajemen basis data relasional.',
      skills: [
        'Laravel 11',
        'PHP',
        'RESTful API',
        'MySQL',
        'VirusTotal API',
        'Database Design',
      ],
    },
    {
      num: '03',
      title: 'UI/UX DESIGN & DEVELOPMENT TOOLS',
      description:
        'Perancangan prototipe antarmuka pengguna (UI/UX), analisis sistem informasi terstruktur, pengujian endpoint API, serta manajemen kontrol versi.',
      skills: [
        'Figma UI/UX',
        'System Analysis',
        'Postman',
        'Git & GitHub',
        'VS Code',
        'Python',
      ],
    },
  ];

  // 6 Projek Portofolio Asli (RapiDoc di atas, Stand Chilla di bawah)
  const selectedProjects = [
    {
      id: 'rapidoc',
      number: '01',
      title: 'RapiDoc — Smart Document Formatter',
      category: 'WEB APPLICATION · DOCUMENT AUTOMATION',
      year: '2026',
      thumbnail: '/projects/rapidoc/1-landing.png',
      shortDesc:
        'Aplikasi web untuk mengotomatisasi proses perapian dan pemformatan dokumen Microsoft Word (.docx) maupun teks/Markdown secara presisi di atas mesin Office Open XML (OOXML) asli agar tetap 100% dapat diedit.',
      tags: ['OOXML', 'DOCX Processing', 'Markdown', 'Web Document Editor'],
      liveUrl: 'https://rapidoc-workspace.vercel.app/',
      details: {
        problem:
          'Mengatur margin, jenis font, spasi, penomoran halaman Romawi & Arab, serta daftar isi di Microsoft Word secara manual sering memakan waktu lama dan menghasilkan format yang tidak konsisten pada dokumen akademik maupun profesional.',
        solution:
          'Membangun RapiDoc dengan mesin pemrosesan Office Open XML (OOXML) asli yang mengotomatisasi 12+ aturan pemformatan sekaligus—mendukung unggah file .docx maupun tempel teks/Markdown dari AI—dengan hasil dokumen Word yang tetap 100% editable.',
        features: [
          'Pemformatan Otomatis & Audit Format: Mengatur margin A4 (mis. 4-4-3-3 cm), font Times New Roman / Calibri, ukuran teks, spasi baris 1.5, indentasi, dan mendeteksi ketidaksesuaian format per paragraf.',
          'Pemrosesan DOCX & Markdown AI: Mendukung unggah file .docx (maks. 20 MB) maupun tempel teks biasa/Markdown dari ChatGPT atau Claude untuk langsung dikonversi menjadi dokumen terstruktur.',
          '9+ Preset Template & Logo Cover Otomatis: Tersedia preset Makalah Kuliah, Skripsi/Tugas Akhir, Laporan Magang/PKL/KKN, Proposal, Surat Resmi, hingga CV ATS-Friendly lengkap dengan penyematan logo instansi/kampus.',
          'Penomoran Halaman, Word TOC Field & Ekspor Multi-Format: Mendukung Section Break Romawi (i, ii) & Arab (1, 2), Daftar Isi otomatis (Word TOC Field), serta unduhan dalam format .DOCX, .PDF, .HTML, .TXT, dan .MD.',
        ],
      },
      gallery: [
        {
          src: '/projects/rapidoc/1-landing.png',
          caption: 'Halaman Utama RapiDoc: Smart Document Formatter berbasis pemrosesan DOCX nyata',
        },
        {
          src: '/projects/rapidoc/2-ooxml-engine.png',
          caption: 'Arsitektur Engine OOXML Asli: Manipulasi XML Word (100% Editable) & Audit Format',
        },
        {
          src: '/projects/rapidoc/3-templates.jpg',
          caption: 'Katalog Preset Template Siap Pakai: Makalah, Skripsi, Laporan Magang, Proposal, Surat & CV ATS',
        },
        {
          src: '/projects/rapidoc/4-upload-docx.png',
          caption: 'Workspace Unggah Dokumen .DOCX (Drag & Drop) dengan Engine OOXML Aktif',
        },
        {
          src: '/projects/rapidoc/5-template-picker.png',
          caption: 'Pemilih 9 Jenis Template Dokumen Akademik & Profesional di Workspace',
        },
        {
          src: '/projects/rapidoc/6-paste-markdown.png',
          caption: 'Mode Tempel Teks / Markdown AI beserta Pengaturan Logo Universitas pada Halaman Cover',
        },
        {
          src: '/projects/rapidoc/7-preview-rules.png',
          caption: 'Pratinjau Dokumen A4 & Panel 12/12 Aturan Pemformatan (Margin, Font, TOC & Section Break)',
        },
        {
          src: '/projects/rapidoc/8-output-editor.jpg',
          caption: 'Output Akhir Siap Unduh: Dokumen Makalah Terformat Rapi Lengkap dengan Cover Logo & Ekspor .DOCX/.PDF/.HTML/.MD',
        },
      ],
    },
    {
      id: 'webguard',
      number: '02',
      title: 'WebGuard: Real-Time URL Security Scanner',
      category: 'FULL-STACK WEB DEVELOPMENT',
      year: '2026',
      thumbnail: '/projects/webguard/home.png',
      shortDesc:
        'Aplikasi keamanan web berbasis client-server untuk mendeteksi ancaman malware dan phishing pada tautan (URL) secara real-time terintegrasi API VirusTotal.',
      tags: ['React.js', 'Laravel 11', 'VirusTotal API', 'Tailwind CSS'],
      githubUrl: 'https://github.com/EvanPrasetya',
      details: {
        problem:
          'API VirusTotal versi gratis sering menempatkan permintaan pemindaian baru ke dalam antrean (queued) yang memakan waktu hingga 30 detik, membuat pengalaman pengguna (UX) di frontend terasa lambat atau error.',
        solution:
          'Merombak arsitektur backend Laravel untuk memprioritaskan pengambilan data instan dari laporan terakhir (last analysis stats) yang sudah ada di database global, membuat waktu respons aplikasi terpangkas drastis dari 30 detik menjadi kurang dari 1 detik.',
        features: [
          'Instant Threat Detection: Menerjemahkan URL menjadi format Base64 di sisi backend untuk melakukan kueri langsung ke database VirusTotal tanpa waktu antrean.',
          'Dynamic UI State: Antarmuka beradaptasi otomatis dengan hasil pemindaian—menampilkan panel Hijau untuk tautan aman dan panel Merah jika terdeteksi ancaman.',
          'Premium Liquid Glass Design: Mengimplementasikan efek frosted glass ala iOS dengan pendaran cahaya (ambient glow) dinamis.',
          'Raw JSON Inspector: Menyediakan panel khusus bagi pengguna teknis untuk memeriksa struktur respons data mentah (JSON) dari API VirusTotal.',
        ],
      },
      gallery: [
        {
          src: '/projects/webguard/home.png',
          caption: 'Halaman Utama & Input Pencarian URL Scanner',
        },
        {
          src: '/projects/webguard/safe.png',
          caption: 'Indikator Status Hijau: Tautan Terverifikasi Aman (0 Flagged)',
        },
        {
          src: '/projects/webguard/danger.png',
          caption: 'Indikator Status Merah: Peringatan Ancaman Malware Terdeteksi',
        },
        {
          src: '/projects/webguard/json-inspector.png',
          caption: 'Panel Raw JSON Inspector untuk Analisis Respons API',
        },
      ],
    },
    {
      id: 'cobain-ai-studio',
      number: '03',
      title: 'Cobain AI Studio — Virtual Try-On & Multimodal AI',
      category: 'AI & FULL-STACK WEB APP',
      year: '2026',
      thumbnail: '/projects/cobain-ai/studio.png',
      shortDesc:
        'Aplikasi web interaktif berbasis Next.js App Router yang mengintegrasikan teknologi Real-Time Video AI (Decart AI SDK) untuk virtual try-on pakaian instan via kamera, didukung asisten cerdas Google Gemini.',
      tags: ['Next.js', 'TypeScript', 'Decart AI SDK', 'Google Gemini API', 'Tailwind CSS'],
      githubUrl: 'https://github.com/EvanPrasetya',
      details: {
        problem:
          'Belanja pakaian secara online sering menimbulkan keraguan kecocokan visual di tubuh pengguna, sementara pembuatan konsep visual outfit membutuhkan waktu dan keahlian desain khusus.',
        solution:
          'Membangun studio virtual berbasis Next.js dengan integrasi WebRTC, Cloudflare Tunnel, dan Decart AI SDK untuk mencoba pakaian secara real-time lewat kamera, dilengkapi asisten multimodal Google Gemini dan generator gambar lookbook instan.',
        features: [
          'Real-Time Virtual Try-On Studio: Mencoba berbagai koleksi pakaian dan aksesoris (kaos, hoodie, crewneck Stone Island, topi, hingga kacamata) secara langsung melalui kamera web dengan dukungan WebRTC dan Cloudflare Tunneling.',
          'Layering & Custom Upload System: Menumpuk beberapa item sekaligus (layering) atau mengunggah foto pakaian pribadi beserta detail warna untuk langsung dicoba di studio virtual.',
          'Multimodal AI Assistant & Chatbot: Asisten cerdas terintegrasi untuk menjawab pertanyaan umum, memberikan rekomendasi styling outfit, hingga membantu eksplorasi fashion.',
          'AI Image Generation & Studio Control: Generator gambar berbasis teks untuk menciptakan konsep visual baru serta pengaturan pencahayaan virtual (Ring Light/Flash) untuk mengoptimalkan tangkapan kamera.',
        ],
      },
      gallery: [
        {
          src: '/projects/cobain-ai/studio.png',
          caption: 'Tampilan Utama Studio & Katalog Koleksi Pakaian',
        },
        {
          src: '/projects/cobain-ai/upload.png',
          caption: 'Modal Upload Pakaian Sendiri dengan Deskripsi Detail Warna',
        },
        {
          src: '/projects/cobain-ai/tryon-result.png',
          caption: 'Hasil Real-Time Virtual Try-On di Kamera (Longsleeve Stussy)',
        },
        {
          src: '/projects/cobain-ai/assistant.png',
          caption: 'Panel Cobain AI Assistant (Mode Obrolan Pintar)',
        },
        {
          src: '/projects/cobain-ai/image-gen.png',
          caption: 'Fitur AI Image Generation untuk Pembuatan Visual Instan',
        },
      ],
    },
    {
      id: 'cleanride',
      number: '04',
      title: 'CleanRide – Car Wash Booking System & API',
      category: 'FULL-STACK & BACKEND API',
      year: '2026',
      thumbnail: '/projects/cleanride/landing.png',
      shortDesc:
        'Sistem reservasi layanan cuci kendaraan terintegrasi dengan alur pemesanan bertahap (multi-step booking), kalkulasi paket layanan, dan backend RESTful API Laravel.',
      tags: ['Laravel', 'PHP', 'MySQL', 'Postman', 'Tailwind CSS'],
      githubUrl: 'https://github.com/EvanPrasetya/CleanRide',
      details: {
        problem:
          'Pengelolaan antrean dan jadwal reservasi cuci kendaraan sering mengalami tumpang tindih akibat pencatatan manual dan ketiadaan validasi slot waktu.',
        solution:
          'Merancang antarmuka reservasi bertahap (multi-step modal) yang terhubung dengan backend Laravel RESTful API untuk memvalidasi pesanan, menghasilkan kode booking unik, dan mencatat status pembayaran.',
        features: [
          'Multi-Step Booking Flow: Antarmuka pemesanan 4 langkah terstruktur mulai dari pilih layanan, jadwal, data diri, hingga pembayaran.',
          'RESTful API & Validasi Backend: Penanganan transaksi melalui endpoint API Laravel dengan pengamanan Mass Assignment ($fillable).',
          'Kode Booking & Status Transaksi: Pembuatan kode reservasi otomatis serta halaman konfirmasi status pemesanan pelanggan.',
        ],
      },
      gallery: [
        { src: '/projects/cleanride/landing.png', caption: 'Landing Page Utama & Informasi Layanan CleanRide' },
        { src: '/projects/cleanride/step-1.png', caption: 'Tahap 1: Pemilihan Paket Layanan & Kategori Ukuran Kendaraan' },
        { src: '/projects/cleanride/step-2.png', caption: 'Tahap 2: Pengisian Data Pelanggan & Detail Nomor Polisi' },
        { src: '/projects/cleanride/step-3.png', caption: 'Tahap 3: Penjadwalan Tanggal Kedatangan & Slot Jam Pencucian' },
        { src: '/projects/cleanride/step-4.png', caption: 'Tahap 4: Ringkasan Total Biaya & Pemilihan Metode Pembayaran' },
        {
          src: '/projects/cleanride/confirmation.png',
          caption: 'Halaman Konfirmasi Pesanan Berhasil & Status Menunggu Pembayaran',
        },
      ],
    },
    {
      id: 'suaraweb',
      number: '05',
      title: 'SuaraWeb — Smart Inclusive Web Accessibility Assistant',
      category: 'SOCIAL TECH & FRONTEND WEB DEVELOPMENT',
      year: '2026',
      thumbnail: '/projects/suaraweb/1-tunanetra.png',
      shortDesc:
        'SuaraWeb adalah aplikasi web asisten aksesibilitas adaptif yang dirancang untuk membantu penyandang disabilitas netra (tunanetra/low-vision) dan teman tuli (tunarungu) dalam mengakses informasi digital serta berkomunikasi sehari-hari. Memadukan sintesis suara alami (Text-to-Speech), transkripsi ucapan waktu nyata (Speech-to-Text), dan antarmuka adaptif berstandar WCAG AAA.',
      tags: ['React.js', 'Vite', 'Tailwind CSS', 'Web Speech API', 'WCAG AAA'],
      githubUrl: 'https://github.com/EvanPrasetya/smart-inclusive-access',
      details: {
        problem:
          'Banyak platform web modern memiliki tingkat kontras warna yang rendah, ukuran huruf yang kaku, serta minim dukungan navigasi suara. Hal ini menyulitkan penyandang low-vision maupun tunanetra saat membaca artikel digital, serta menciptakan hambatan komunikasi tatap muka bagi teman tuli.',
        solution:
          'Merancang antarmuka web inklusif yang memisahkan kebutuhan pengguna menjadi dua mode utama: mode Audio-First dengan kontrol perintah suara bebas genggam untuk tunanetra, serta mode Visual-First dengan transkripsi percakapan langsung ke layar berukuran besar untuk teman tuli.',
        features: [
          'Mode Tunanetra & Perintah Suara Bebas Genggam (Hands-Free): Dilengkapi pemicu tombol Spasi di keyboard untuk mengaktifkan perintah suara ("Baca teks", "Ringkas", "Kontras tinggi", atau "Perbesar huruf"), serta fitur peringkas poin inti artikel yang langsung dibacakan menggunakan sintesis suara bahasa Indonesia.',
          'Dynamic High-Contrast & Dyslexia Mode: Toolbar pengaturan instan di bagian atas layar untuk mengubah tema menjadi latar hitam murni dengan teks kuning cerah (High-Contrast Mode), pengaturan skala huruf (A-, Normal, A+), serta mode spasi huruf lega untuk pembaca disleksia.',
          'Mode Tunarungu & Live Transcriber: Mengubah ucapan lawan bicara melalui mikrofon secara langsung (real-time) menjadi teks berukuran besar di layar, lengkap dengan tombol salin teks serta opsi input ketik/dikte manual.',
          'Accessible Touch Targets & Papan Komunikasi Cepat: Seluruh tombol kontrol dirancang berukuran besar dengan fokus navigasi keyboard yang jelas, disertai Papan Komunikasi Cepat berbasis kartu frasa layar penuh untuk memudahkan interaksi tatap muka.',
        ],
      },
      gallery: [
        {
          src: '/projects/suaraweb/1-tunanetra.png',
          caption: 'Mode Tunanetra & Low-Vision: Perintah Suara (Spasi) & Teks Ringkasan Pintar',
        },
        {
          src: '/projects/suaraweb/2-kontras.png',
          caption: 'Dynamic High-Contrast & Dyslexia Mode: Tema Hitam Murni & Teks Kuning Cerah',
        },
        {
          src: '/projects/suaraweb/3-transcriber.png',
          caption: 'Mode Tunarungu & Teman Tuli: Transkripsi Percakapan Real-Time (Live Transcriber)',
        },
        {
          src: '/projects/suaraweb/4-komunikasi.png',
          caption: 'Papan Komunikasi Cepat: Kartu Frasa Instan Layar Penuh untuk Interaksi Tatap Muka',
        },
      ],
    },
    {
      id: 'standchilla',
      number: '06',
      title: 'Stand Chilla — E-Catalog & WhatsApp Commerce',
      category: 'FULL-STACK WEB DEVELOPMENT',
      year: '2026',
      thumbnail: '/projects/standchilla/hero.png',
      shortDesc:
        'Platform katalog digital dan sistem pemesanan suvenir terintegrasi WhatsApp untuk toko ritel di kawasan wisata Klenteng Sam Poo Kong, Semarang.',
      tags: ['Laravel 11', 'MySQL', 'Vanilla JS', 'REST API'],
      githubUrl: 'https://github.com/EvanPrasetya',
      details: {
        problem:
          'Pemilik toko suvenir di area wisata kesulitan membagikan daftar harga terbaru dan ketersediaan stok kepada pelanggan jarak jauh maupun pengunjung saat toko sedang ramai.',
        solution:
          'Membangun aplikasi web katalog responsif dengan arsitektur decoupled (Laravel RESTful API + Frontend modern) dan fitur Floating Cart yang otomatis menyusun format pesanan ke WhatsApp.',
        features: [
          'RESTful API & Admin CRUD (Laravel 11 & MySQL): Memungkinkan pemilik toko memperbarui harga, menambah produk, dan mengatur status stok secara real-time.',
          'Dynamic Cart & WA Checkout: Kalkulasi subtotal belanja otomatis dengan konversi pesan pesanan siap kirim ke WhatsApp Business.',
          'Resilient Architecture & UX: Dilengkapi mekanisme local fallback data, integrasi rute lokasi toko, serta animasi scroll reveal.',
        ],
      },
      gallery: [
        {
          src: '/projects/standchilla/hero.png',
          caption: 'Tampilan Hero Katalog Stand Chilla (Mode Layar Penuh)',
        },
        {
          src: '/projects/standchilla/catalog.png',
          caption: 'Tata Letak Tipografi & Navigasi Katalog Produk Suvenir',
        },
        {
          src: '/projects/standchilla/cart.png',
          caption: 'Drawer Keranjang Suvenir Dinamis & Kalkulasi Estimasi Harga',
        },
        {
          src: '/projects/standchilla/admin.png',
          caption: 'Dashboard Admin Laravel untuk Input & Manajemen Stok Suvenir',
        },
      ],
    },
  ];

  // 3 Sertifikat Asli HIMMATISI
  const credentialsList = [
    {
      id: 'sertif-tisi-insight-2026',
      code: '1348/USM.H4.FTIK/I/2026',
      title: 'Anggota Divisi Media — TISI INSIGHT 2026',
      role: 'Anggota Divisi Media (Kepanitiaan Seminar)',
      organization: 'HIMMATISI · FTIK Universitas Semarang',
      date: '29 September 2026',
      year: '2026',
      category: 'SERTIFIKAT KEPANITIAAN ORGANISASI',
      previewImage: '/certificates/sertif-tisi-insight-2026.png',
      description:
        'Diberikan kepada Alfarell Nabil Evan Prasetya sebagai bentuk penghargaan atas dedikasi, tanggung jawab, dan peran aktifnya sebagai Anggota Divisi Media dalam mendukung kelancaran dan keberhasilan kegiatan seminar TISI INSIGHT 2026 yang diselenggarakan oleh Himpunan Mahasiswa Teknologi Informasi (HIMMATISI) FTIK Universitas Semarang.',
    },
    {
      id: 'sertif-solidarity-2026',
      code: '349/USM.H4.FTIK/I/2026',
      title: 'HIMMATISI One Night Solidarity — CTRL+S',
      role: 'Peserta Kegiatan Organisasi HIMMATISI',
      organization: 'HIMMATISI · FTIK Universitas Semarang',
      date: '12–13 Januari 2026',
      year: '2026',
      category: 'SERTIFIKAT APRESIASI ORGANISASI',
      previewImage: '/certificates/sertif-himmatisi-solidarity-2026.jpg',
      description:
        'Sertifikat Apresiasi diberikan kepada Alfarell Nabil Evan Prasetya sebagai peserta kegiatan HIMMATISI One Night Solidarity dengan tema "CTRL+S : Save the Moment and Solidarity" pada 12–13 Januari 2026 di Promas Greenland.',
    },
    {
      id: 'sertif-kuliah-umum-2024',
      code: '1039/USM.H4.FTIK/I/2024',
      title: 'Kuliah Umum & Sarasehan Teknologi Informasi',
      role: 'Peserta Kegiatan Akademik & Himpunan',
      organization: 'HIMMATISI · FTIK Universitas Semarang',
      date: '12 Oktober 2024',
      year: '2024',
      category: 'SERTIFIKAT KEGIATAN HIMPUNAN',
      previewImage: '/certificates/sertif-kuliah-umum-2024.jpg',
      description:
        'Sertifikat diberikan kepada Alfarell Nabil Evan Prasetya sebagai Peserta dalam kegiatan Kuliah Umum dan Sarasehan yang diselenggarakan oleh Himpunan Mahasiswa Jurusan Teknologi Informasi (HIMMATISI) Fakultas Teknologi Informasi dan Komunikasi Universitas Semarang pada 12 Oktober 2024.',
    },
  ];

  // Daftar Tech Stack untuk Tab "Tech Stack" di Portfolio Showcase
  const techStackGrid = [
    { name: 'Laravel 11', category: 'Backend Framework', badge: 'PHP / MVC / REST API' },
    { name: 'React.js', category: 'Frontend Library', badge: 'Component UI / Hooks' },
    { name: 'Next.js', category: 'Full-Stack Framework', badge: 'App Router / SSR' },
    { name: 'TypeScript', category: 'Typed JavaScript', badge: 'Type-Safe Architecture' },
    { name: 'Tailwind CSS', category: 'Styling Engine', badge: 'Modern Utility UI' },
    { name: 'MySQL', category: 'Relational Database', badge: 'ERD & Query Design' },
    { name: 'Google Gemini API', category: 'Multimodal AI', badge: 'AI Assistant & Prompting' },
    { name: 'Decart AI SDK', category: 'Real-Time Video AI', badge: 'WebRTC Virtual Try-On' },
    { name: 'VirusTotal API', category: 'Cybersecurity API', badge: 'URL Threat Intelligence' },
    { name: 'Figma', category: 'UI/UX Design', badge: 'Wireframing & Prototyping' },
    { name: 'Postman', category: 'API Testing', badge: 'Endpoint Validation' },
    { name: 'Git & GitHub', category: 'Version Control', badge: 'Collaborative Workflow' },
  ];

  return (
    <div className="min-h-screen bg-[#0A1424] text-[#F1F5F9] font-sans antialiased selection:bg-[#3B82F6] selection:text-white relative overflow-x-hidden">
      {/* 01. HEADER & STICKY NAVIGATION */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A1424]/95 backdrop-blur-md border-b border-[#263B59]/80 transition-colors">
        {/* Top Smooth Scroll Progress Indicator Bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#101E33] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#3B82F6] to-[#38BDF8] transition-transform duration-150 ease-out origin-left"
            style={{ transform: `scaleX(${scrollProgress / 100})` }}
          />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:pl-16 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
          {/* Left: EVAN PRASETYA Logo */}
          <a
            href="#profile"
            className="group flex items-center gap-2 focus:outline-none select-none"
          >
            <span className="font-display font-extrabold text-[17px] sm:text-[21px] tracking-[-0.03em] text-[#F1F5F9] flex items-center">
              <span>EVAN</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] inline-block mx-1.5 shadow-[0_0_10px_#3B82F6]" />
              <span className="text-[#60A5FA]">PRASETYA</span>
            </span>
          </a>

          {/* Center: Numbered Editorial Navigation */}
          <nav
            aria-label="Navigasi Utama"
            className="hidden md:flex items-center divide-x divide-[#263B59]/60 border border-[#263B59]/70 bg-[#101E33]/80"
          >
            {navItems.map((item) => {
              const isActive =
                activeNav === item.id ||
                (activeNav === 'selected' &&
                  item.id === 'credentials' &&
                  portfolioTab === 'certificates') ||
                (activeNav === 'selected' &&
                  item.id === 'selected' &&
                  portfolioTab !== 'certificates');
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => {
                    setActiveNav(item.id);
                    if (item.tab) setPortfolioTab(item.tab);
                  }}
                  className={`relative px-3 lg:px-4 xl:px-5 py-2 font-mono text-[10px] lg:text-[11px] font-semibold tracking-[0.15em] transition-colors duration-200 ${isActive
                    ? 'text-[#F1F5F9] bg-[#152640]'
                    : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#152640]/50'
                    }`}
                >
                  <span className="tracking-[0.16em]">{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#3B82F6] shadow-[0_0_10px_#3B82F6]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right: Availability Indicator & Mobile Trigger */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-[#263B59] bg-[#101E33]/80">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38BDF8] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38BDF8]" />
              </span>
              <span className="font-mono text-[9px] lg:text-[10px] font-bold tracking-[0.14em] uppercase text-[#F1F5F9]">
                TERSEDIA MAGANG
              </span>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 border border-[#263B59] bg-[#101E33] text-[#F1F5F9] hover:border-[#3B82F6] transition-colors cursor-pointer"
              aria-label="Buka Menu Navigasi"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#263B59] bg-[#0A1424]/98 backdrop-blur-lg px-5 py-4 space-y-3 shadow-2xl">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#263B59]/60">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
                <span className="font-mono text-[10px] font-bold tracking-[0.16em] uppercase text-[#38BDF8]">
                  TERSEDIA UNTUK MAGANG &amp; PROYEK
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 divide-y divide-[#263B59]/40">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => {
                    setActiveNav(item.id);
                    if (item.tab) setPortfolioTab(item.tab);
                    setMobileMenuOpen(false);
                  }}
                  className="py-3 font-mono text-xs font-bold tracking-[0.18em] text-[#F1F5F9] active:text-[#38BDF8] flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#94A3B8]" />
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* =====================================================================
          SOCIAL RAIL & QUICK ACCESS BAR:
          - Desktop & Tablet (md+): ALWAYS VISIBLE on the left side
          - Android / Mobile (< md): ALWAYS VISIBLE as a sleek bottom dock
         ===================================================================== */}
      <aside
        aria-label="Tautan Cepat Sosial & CV"
        className="fixed left-2.5 sm:left-3.5 lg:left-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3.5 select-none"
      >
        <div className="w-px h-10 bg-[#263B59]" />
        <a
          href="https://github.com/EvanPrasetya"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub — EvanPrasetya"
          className="w-9 h-9 border border-[#263B59] bg-[#101E33]/95 backdrop-blur-sm hover:bg-[#3B82F6] hover:border-[#60A5FA] text-[#94A3B8] hover:text-white flex items-center justify-center transition-all duration-200 shadow-lg hover:-translate-y-0.5"
        >
          <GithubIcon className="w-4 h-4" />
        </a>
        <a
          href="https://instagram.com/evnsss__"
          target="_blank"
          rel="noopener noreferrer"
          title="Instagram — @evnsss__"
          className="w-9 h-9 border border-[#263B59] bg-[#101E33]/95 backdrop-blur-sm hover:bg-[#3B82F6] hover:border-[#60A5FA] text-[#94A3B8] hover:text-white flex items-center justify-center transition-all duration-200 shadow-lg hover:-translate-y-0.5"
        >
          <InstagramIcon className="w-4 h-4" />
        </a>
        <a
          href="mailto:evansprasetyaa@gmail.com"
          title="Email — evansprasetyaa@gmail.com"
          className="w-9 h-9 border border-[#263B59] bg-[#101E33]/95 backdrop-blur-sm hover:bg-[#3B82F6] hover:border-[#60A5FA] text-[#94A3B8] hover:text-white flex items-center justify-center transition-all duration-200 shadow-lg hover:-translate-y-0.5"
        >
          <Mail className="w-4 h-4" />
        </a>
        <button
          type="button"
          onClick={() => setShowCVModal(true)}
          title="Preview CV"
          className="w-9 h-9 border border-[#263B59] bg-[#101E33]/95 backdrop-blur-sm hover:bg-[#3B82F6] hover:border-[#60A5FA] text-[#94A3B8] hover:text-white flex items-center justify-center transition-all duration-200 shadow-lg hover:-translate-y-0.5 cursor-pointer"
        >
          <FileText className="w-4 h-4" />
        </button>
        <div className="w-px h-10 bg-[#263B59]" />
      </aside>

      {/* Android & Mobile Floating Quick-Access Dock */}
      <aside
        aria-label="Menu Cepat Mobile & Android"
        className="md:hidden fixed bottom-4 inset-x-0 z-40 flex justify-center px-4 pointer-events-none"
      >
        <div className="pointer-events-auto flex items-center gap-1.5 px-3 py-2 bg-[#0A1424]/95 backdrop-blur-md border border-[#263B59] shadow-[0_12px_32px_rgba(0,0,0,0.75)]">
          <a
            href="https://github.com/EvanPrasetya"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-9 h-9 border border-[#263B59] bg-[#101E33] active:bg-[#3B82F6] text-[#F1F5F9] flex items-center justify-center"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://instagram.com/evnsss__"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-9 h-9 border border-[#263B59] bg-[#101E33] active:bg-[#3B82F6] text-[#F1F5F9] flex items-center justify-center"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>
          <a
            href="mailto:evansprasetyaa@gmail.com"
            aria-label="Email"
            className="w-9 h-9 border border-[#263B59] bg-[#101E33] active:bg-[#3B82F6] text-[#F1F5F9] flex items-center justify-center"
          >
            <Mail className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={() => setShowCVModal(true)}
            className="h-9 px-3 border border-[#3B82F6] bg-[#152640] active:bg-[#3B82F6] text-[#F1F5F9] font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>CV</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="relative z-10 pt-16 sm:pt-20 pb-20 md:pb-0">
        {/* =====================================================================
            01. HERO — PROFIL (DENGAN 3D INTERACTIVE HANGING ID CARD)
           ===================================================================== */}
        <section
          id="profile"
          aria-label="Bagian Hero Profil"
          className="relative w-full bg-[#0A1424] border-b border-[#263B59] editorial-grid-bg overflow-hidden"
        >
          {/* Subtle Static Ambient Blue Lighting */}
          <div
            className="pointer-events-none absolute top-1/4 right-[10%] w-[320px] sm:w-[520px] h-[320px] sm:h-[520px] rounded-full opacity-60"
            style={{
              background:
                'radial-gradient(circle, rgba(59, 130, 246, 0.22) 0%, rgba(56, 189, 248, 0.06) 50%, transparent 75%)',
            }}
          />

          {/* Giant Editorial Background Watermark Typography */}
          <div
            aria-hidden="true"
            className="pointer-events-none select-none absolute top-[12%] sm:top-[14%] inset-x-0 flex justify-center overflow-hidden z-0"
          >
            <span className="font-display font-black uppercase tracking-[-0.04em] leading-none whitespace-nowrap text-[46px] sm:text-[96px] md:text-[130px] lg:text-[175px] text-blue-glow-shine">
              EVAN PRASETYA
            </span>
          </div>

          <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 md:pl-16 lg:pl-20 lg:pr-16 pt-4 sm:pt-6 pb-10 sm:pb-14 lg:pb-16">
            {/* Main Editorial Hero Grid: Left Typography + Right 3D Hanging ID Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
              {/* Left Column (7 Cols) */}
              <div className="lg:col-span-7 space-y-6 sm:space-y-8 order-2 lg:order-1">
                <ScrollReveal delay={80}>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="inline-flex flex-wrap items-center gap-2 font-mono text-[10px] sm:text-[12px] font-bold tracking-[0.18em] uppercase text-[#60A5FA]">
                      <span>Mahasiswa Sistem Informasi</span>
                      <span className="text-[#263B59]">/</span>
                      <span className="text-[#94A3B8]">Full-Stack Web Developer · UI/UX</span>
                    </div>

                    <h1 className="font-display font-black text-[36px] sm:text-[56px] lg:text-[74px] leading-[0.95] tracking-[-0.03em] uppercase text-[#F1F5F9]">
                      EVAN{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F1F5F9] via-[#60A5FA] to-[#3B82F6]">
                        PRASETYA
                      </span>
                    </h1>
                  </div>
                </ScrollReveal>

                {/* Main Editorial Statement */}
                <ScrollReveal delay={150}>
                  <div className="border-l-2 border-[#3B82F6] pl-4 sm:pl-6 py-1">
                    <p className="font-display font-bold text-[20px] sm:text-[28px] lg:text-[34px] leading-[1.18] tracking-[-0.02em] text-[#F1F5F9]">
                      &ldquo;Dari ide menjadi{' '}
                      <span className="italic font-normal text-[#38BDF8]">solusi digital.</span>
                      &rdquo;
                    </p>
                  </div>
                </ScrollReveal>

                {/* Description */}
                <ScrollReveal delay={220}>
                  <p className="text-[14px] sm:text-[16px] leading-[1.75] text-[#94A3B8] max-w-[640px]">
                    Saya Alfarell Nabil Evan Prasetya, mahasiswa Sistem Informasi Universitas
                    Semarang yang berfokus pada pengembangan aplikasi web Full-Stack (Laravel,
                    React, &amp; Next.js), perancangan UI/UX interaktif, pengelolaan basis data
                    MySQL, serta analisis sistem yang terstruktur.
                  </p>
                </ScrollReveal>

                {/* Primary Hero Actions */}
                <ScrollReveal delay={280}>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                    <a
                      href="#selected"
                      onClick={() => setPortfolioTab('projects')}
                      className="inline-flex items-center justify-center gap-3 bg-[#3B82F6] hover:bg-[#60A5FA] text-[#0A1424] font-mono text-[11px] font-bold tracking-[0.18em] uppercase px-6 sm:px-7 py-3.5 sm:py-4 transition-colors duration-200"
                    >
                      <span>LIHAT PORTFOLIO</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>

                    <button
                      type="button"
                      onClick={() => setShowCVModal(true)}
                      className="inline-flex items-center justify-center gap-3 border border-[#263B59] bg-[#101E33] hover:border-[#60A5FA] hover:bg-[#152640] text-[#F1F5F9] font-mono text-[11px] font-bold tracking-[0.18em] uppercase px-6 sm:px-7 py-3.5 sm:py-4 transition-colors duration-200 cursor-pointer"
                    >
                      <Eye className="w-4 h-4 text-[#38BDF8]" />
                      <span>PREVIEW CV</span>
                    </button>
                  </div>
                </ScrollReveal>

                {/* Three Highlight Metrics */}
                <ScrollReveal delay={340}>
                  <div className="pt-5 border-t border-[#263B59] grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div className="border border-[#263B59] bg-[#101E33]/90 p-4 hover:border-[#3B82F6] transition-colors">
                      <div className="font-display font-bold text-[14px] sm:text-[15px] text-[#F1F5F9]">
                        Mahasiswa Sistem Informasi
                      </div>
                      <div className="font-mono text-[10px] text-[#94A3B8] uppercase tracking-wider mt-1">
                        UNIVERSITAS SEMARANG (IPK 3.75)
                      </div>
                    </div>

                    <div className="border border-[#263B59] bg-[#101E33]/90 p-4 hover:border-[#3B82F6] transition-colors">
                      <div className="font-display font-bold text-[14px] sm:text-[15px] text-[#F1F5F9]">
                        Full-Stack &amp; UI/UX
                      </div>
                      <div className="font-mono text-[10px] text-[#94A3B8] uppercase tracking-wider mt-1">
                        LARAVEL · REACT · NEXT.JS
                      </div>
                    </div>

                    <div className="border border-[#263B59] bg-[#101E33]/90 p-4 hover:border-[#3B82F6] transition-colors">
                      <div className="font-display font-bold text-[14px] sm:text-[15px] text-[#F1F5F9]">
                        Siap Magang &amp; Kolaborasi
                      </div>
                      <div className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider mt-1">
                        TERSEDIA SAAT INI ●
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right Column (5 Cols): 3D INTERACTIVE HANGING ID CARD (LANYARD) */}
              <div className="lg:col-span-5 order-1 lg:order-2 flex items-center justify-center">
                <HangingIdCard />
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            01B. TENTANG SAYA & SPESIALISASI KEAHLIAN
           ===================================================================== */}
        <section
          id="about"
          aria-labelledby="about-heading"
          className="relative w-full bg-[#101E33] border-b border-[#263B59] py-16 sm:py-24 lg:py-32 overflow-hidden"
        >
          {/* Large Background Editorial Watermark */}
          <div
            aria-hidden="true"
            className="pointer-events-none select-none absolute top-6 right-4 sm:right-10 font-display font-black text-[clamp(4rem,15vw,18rem)] uppercase tracking-tighter text-[#F1F5F9]/[0.025] leading-none z-0"
          >
            PROFIL
          </div>

          <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 md:pl-16 lg:pl-20 lg:pr-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* Left Column (5 Cols): Section Label, Heading, Structured Metadata, Download CV */}
              <div className="lg:col-span-5 flex flex-col">
                <ScrollReveal>
                  <div className="font-mono text-[11px] font-bold tracking-[0.25em] text-[#38BDF8] uppercase mb-3">
                    [ 01 . PROFIL ]
                  </div>
                  <h2
                    id="about-heading"
                    className="font-display font-black text-[36px] sm:text-[50px] lg:text-[62px] leading-[0.95] tracking-tight uppercase text-[#F1F5F9] mb-8 sm:mb-10"
                  >
                    TENTANG <span className="italic font-normal text-[#60A5FA]">SAYA</span>
                  </h2>
                </ScrollReveal>

                {/* Editorial Profile Metadata Grid */}
                <ScrollReveal delay={100}>
                  <div className="space-y-5 sm:space-y-6 border-l-2 border-[#3B82F6] pl-4 sm:pl-6 mb-8 sm:mb-10">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#94A3B8] mb-1">
                        NAMA LENGKAP
                      </p>
                      <p className="font-mono text-[13px] sm:text-[14px] font-bold text-[#F1F5F9] tracking-wide">
                        Alfarell Nabil Evan Prasetya
                      </p>
                    </div>

                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#94A3B8] mb-1">
                        PENDIDIKAN
                      </p>
                      <p className="font-mono text-[13px] sm:text-[14px] font-bold text-[#F1F5F9] tracking-wide">
                        Universitas Semarang (IPK 3.75 / 4.00)
                      </p>
                    </div>

                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#94A3B8] mb-1">
                        FOKUS &amp; SPESIALISASI
                      </p>
                      <p className="font-mono text-[13px] sm:text-[14px] font-bold text-[#38BDF8] tracking-wide">
                        SISTEM INFORMASI · FULL-STACK WEB DEVELOPER
                      </p>
                    </div>

                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#94A3B8] mb-1">
                        STATUS SAAT INI
                      </p>
                      <p className="font-mono text-[13px] sm:text-[14px] font-bold text-[#F1F5F9] tracking-wide flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block shrink-0" />
                        <span>TERSEDIA UNTUK MAGANG &amp; KOLABORASI</span>
                      </p>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Download CV & Preview CV Buttons */}
                <ScrollReveal delay={180}>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <a
                      href={cvFileUrl}
                      download="CV - Alfarell Nabil Evan Prasetya.pdf"
                      className="inline-flex items-center justify-center gap-3 bg-[#3B82F6] hover:bg-[#60A5FA] text-[#0A1424] transition-colors duration-200 font-mono text-[11px] font-bold tracking-[0.18em] uppercase px-6 sm:px-7 py-3.5 sm:py-4"
                    >
                      <span>UNDUH CV</span>
                      <Download className="w-4 h-4" />
                    </a>

                    <button
                      type="button"
                      onClick={() => setShowCVModal(true)}
                      className="inline-flex items-center justify-center gap-2.5 border border-[#263B59] bg-[#0A1424] hover:border-[#60A5FA] text-[#F1F5F9] transition-colors duration-200 font-mono text-[11px] font-bold tracking-[0.18em] uppercase px-6 py-3.5 sm:py-4 cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-[#38BDF8]" />
                      <span>LIHAT PDF CV</span>
                    </button>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right Column (7 Cols): Description & 3 Specialization Blocks */}
              <div className="lg:col-span-7 flex flex-col gap-8 sm:gap-10">
                <ScrollReveal delay={120}>
                  <div className="border-b border-[#263B59] pb-6 sm:pb-8">
                    <p className="text-[15px] sm:text-[19px] leading-[1.75] text-[#F1F5F9] font-normal">
                      &ldquo;Saat ini saya menempuh pendidikan S1 Sistem Informasi di Universitas
                      Semarang (USM). Saya berpengalaman merancang arsitektur backend RESTful API
                      menggunakan Laravel, membangun antarmuka web modern dan aplikatif dengan
                      React.js, Next.js, serta Tailwind CSS, mengelola basis data relasional MySQL,
                      hingga merancang prototipe UI/UX di Figma.&rdquo;
                    </p>
                  </div>
                </ScrollReveal>

                {/* Three Specialization Blocks (01, 02, 03) */}
                <div className="space-y-5">
                  <ScrollReveal delay={180}>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#94A3B8]">
                        KEAHLIAN TEKNIS &amp; TEKNOLOGI UTAMA
                      </span>
                      <span className="font-mono text-[11px] text-[#38BDF8]">01 — 03</span>
                    </div>
                  </ScrollReveal>

                  <div className="divide-y divide-[#263B59] border-t border-b border-[#263B59]">
                    {specializations.map((spec, sIdx) => (
                      <ScrollReveal key={spec.num} delay={200 + sIdx * 90}>
                        <div className="py-6 sm:py-7 group transition-colors">
                          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2.5">
                            <div className="flex items-baseline gap-2.5">
                              <span className="font-mono text-[12px] font-bold text-[#38BDF8] tracking-widest shrink-0">
                                {spec.num} —
                              </span>
                              <h3 className="font-display font-extrabold text-[17px] sm:text-[21px] tracking-tight uppercase text-[#F1F5F9] group-hover:text-[#60A5FA] transition-colors">
                                {spec.title}
                              </h3>
                            </div>
                          </div>

                          <p className="text-[13px] sm:text-[14px] text-[#94A3B8] leading-relaxed mb-4 max-w-2xl">
                            {spec.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-y-2">
                            {spec.skills.map((skill, idx) => (
                              <React.Fragment key={skill}>
                                <span className="font-mono text-[11px] sm:text-[13px] font-semibold tracking-wider text-[#F1F5F9] group-hover:text-[#38BDF8] transition-colors">
                                  {skill}
                                </span>
                                {idx < spec.skills.length - 1 && (
                                  <span className="mx-2.5 sm:mx-3 text-[#263B59] font-mono">/</span>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EDITORIAL TYPOGRAPHY MARQUEE STRIP */}
        <section
          aria-label="Marquee Teknologi"
          className="relative w-full overflow-hidden bg-[#0A1424] border-b border-[#263B59] py-6 sm:py-9 select-none"
        >
          <div className="animate-editorial-marquee">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex items-center shrink-0">
                {[
                  'LARAVEL 11',
                  'REACT.JS',
                  'NEXT.JS',
                  'TAILWIND CSS',
                  'MYSQL DATABASE',
                  'RESTFUL API',
                  'TYPESCRIPT',
                  'FIGMA UI/UX',
                ].map((item, idx) => (
                  <span key={`${dup}-${idx}`} className="flex items-center shrink-0">
                    <span className="font-display font-black text-[clamp(1.75rem,5vw,4.25rem)] uppercase leading-none tracking-tight text-[#F1F5F9]/15 hover:text-[#F1F5F9] transition-colors duration-200">
                      {item}
                    </span>
                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#3B82F6] mx-5 sm:mx-9 inline-block shadow-[0_0_10px_#3B82F6]" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================================
            02 & 03. PORTFOLIO SHOWCASE (LAYOUT SESUAI REFERENSI: CENTERED "Portfolio"
            + 4 PILL TABS: Projects | Certificates | Achievements | Tech Stack
            + 3-COLUMN CARDS DENGAN 3D MOUSE TILT)
           ===================================================================== */}
        <section
          id="selected"
          aria-labelledby="portfolio-heading"
          className="relative w-full bg-[#070E1A] border-b border-[#263B59] py-20 sm:py-28 lg:py-32 overflow-hidden"
        >
          {/* Ambient Starry / Blue Radial Glow Backdrop */}
          <div
            className="pointer-events-none absolute top-16 left-1/2 -translate-x-1/2 w-[580px] h-[300px] rounded-full opacity-55 blur-3xl"
            style={{
              background:
                'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, rgba(56, 189, 248, 0.08) 55%, transparent 75%)',
            }}
          />

          <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-8 md:pl-16 lg:pl-20 lg:pr-12">
            {/* Centered Title "Portfolio" + Pill Tab Switcher (Matches Reference Screenshot 3!) */}
            <ScrollReveal>
              <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
                <span className="font-mono text-[11px] font-bold tracking-[0.25em] text-[#38BDF8] uppercase mb-2">
                  [ 02 . SHOWCASE ]
                </span>
                <h2
                  id="portfolio-heading"
                  className="font-display font-extrabold text-[42px] sm:text-[56px] lg:text-[64px] tracking-tight text-white leading-none mb-8"
                >
                  Portfolio
                </h2>

                {/* Rounded Pill Tab Container: Projects | Certificates | Achievements | Tech Stack */}
                <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-2xl bg-[#0D1627]/95 border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.65)]">
                  {[
                    {
                      id: 'projects',
                      label: 'Projects',
                      icon: Code2,
                      count: selectedProjects.length,
                    },
                    {
                      id: 'certificates',
                      label: 'Certificates',
                      icon: Award,
                      count: credentialsList.length,
                    },
                    {
                      id: 'achievements',
                      label: 'Achievements',
                      icon: Trophy,
                      count: 3,
                    },
                    {
                      id: 'techstack',
                      label: 'Tech Stack',
                      icon: Cpu,
                      count: techStackGrid.length,
                    },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = portfolioTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setPortfolioTab(tab.id)}
                        className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-display font-bold text-xs sm:text-sm transition-all duration-250 cursor-pointer ${isActive
                          ? 'bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white shadow-[0_6px_22px_rgba(37,99,235,0.5)]'
                          : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.04]'
                          }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>

            {/* TAB 1: PROJECTS (3-Column Rounded Dark Blue Cards matching Reference Image!) */}
            {portfolioTab === 'projects' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                {selectedProjects.map((project, idx) => (
                  <ScrollReveal key={project.id} delay={idx * 90}>
                    <Interactive3DCard
                      onClick={() => setSelectedProject(project)}
                      className="group h-full rounded-[20px] p-4 sm:p-5 bg-[#0D1627]/95 border border-white/15 hover:border-[#3B82F6]/80 shadow-[0_14px_40px_rgba(0,0,0,0.65)] flex flex-col justify-between cursor-pointer overflow-hidden"
                    >
                      {/* Top Glowing Rim Accent */}
                      <div className="pointer-events-none absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/35 to-transparent" />

                      <div>
                        {/* Framed Project Screenshot Inside Card */}
                        <div className="relative aspect-[16/10] w-full rounded-[13px] overflow-hidden bg-[#060B14] border border-white/10 mb-5">
                          <img
                            src={project.thumbnail}
                            alt={project.title}
                            loading="lazy"
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1627]/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                            <span className="px-2.5 py-1 rounded-md bg-[#0A1424]/90 border border-[#38BDF8]/40 font-mono text-[10px] font-bold text-[#38BDF8]">
                              {project.gallery.length} Dokumentasi Foto
                            </span>
                          </div>
                        </div>

                        {/* Project Title & Description (Matches Reference Layout) */}
                        <div className="px-1 space-y-2.5">
                          <div className="flex items-center justify-between text-[10px] font-mono text-[#38BDF8] uppercase tracking-wider">
                            <span>{project.category}</span>
                            <span className="text-[#94A3B8]">{project.year}</span>
                          </div>

                          <h3 className="font-display font-extrabold text-[19px] sm:text-[21px] text-white group-hover:text-[#60A5FA] transition-colors leading-snug">
                            {project.title}
                          </h3>

                          <p className="text-[13px] sm:text-[14px] text-[#94A3B8] leading-relaxed line-clamp-3">
                            {project.shortDesc}
                          </p>
                        </div>
                      </div>

                      {/* Tech Stack Tags & Detail Trigger Footer */}
                      <div className="px-1 pt-5 mt-5 border-t border-white/10 flex flex-col gap-3.5">
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[#15243D] border border-white/10 text-[#E2E8F0]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="font-display font-bold text-xs text-[#38BDF8] group-hover:text-white transition-colors inline-flex items-center gap-1.5">
                            <span>Lihat Detail &amp; Studi Kasus</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                          <div className="flex items-center gap-2">
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                title="Buka Live Website"
                                className="px-2.5 py-1.5 rounded-lg bg-[#3B82F6]/20 hover:bg-[#3B82F6] border border-[#3B82F6]/40 text-[#38BDF8] hover:text-white font-mono text-[10px] font-bold transition-colors inline-flex items-center gap-1"
                              >
                                <span>Live</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                title="Lihat Repositori GitHub"
                                className="p-2 rounded-lg bg-white/5 hover:bg-[#3B82F6] border border-white/10 text-[#94A3B8] hover:text-white transition-colors"
                              >
                                <GithubIcon className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </Interactive3DCard>
                  </ScrollReveal>
                ))}
              </div>
            )}

            {/* TAB 2: CERTIFICATES (3-Column 3D Interactive Certificate Cards) */}
            {portfolioTab === 'certificates' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                {credentialsList.map((cred, index) => (
                  <ScrollReveal key={cred.id} delay={index * 90}>
                    <Interactive3DCard
                      onClick={() => setSelectedCertificate(cred)}
                      className="group h-full rounded-[20px] p-4 sm:p-5 bg-[#0D1627]/95 border border-white/15 hover:border-[#38BDF8]/80 shadow-[0_14px_40px_rgba(0,0,0,0.65)] flex flex-col justify-between cursor-pointer overflow-hidden"
                    >
                      <div className="pointer-events-none absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#38BDF8]/45 to-transparent" />

                      <div>
                        {/* Framed Certificate Preview */}
                        <div className="relative aspect-[4/3] w-full rounded-[13px] overflow-hidden bg-[#060B14] border border-white/10 mb-5">
                          <img
                            src={cred.previewImage}
                            alt={cred.title}
                            loading="lazy"
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#060C17]/75 via-[#060C17]/25 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                            <span className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.45)] scale-90 group-hover:scale-100 transition-transform duration-300">
                              <ZoomIn className="w-5 h-5 text-[#38BDF8]" />
                            </span>
                          </div>
                        </div>

                        <div className="px-1 space-y-2">
                          <div className="flex items-center justify-between text-[10px] font-mono text-[#38BDF8] uppercase tracking-wider">
                            <span>{cred.organization}</span>
                            <span className="text-[#94A3B8]">{cred.year}</span>
                          </div>

                          <h3 className="font-display font-extrabold text-[18px] sm:text-[20px] text-white group-hover:text-[#38BDF8] transition-colors leading-snug">
                            {cred.title}
                          </h3>

                          <p className="text-xs sm:text-[13px] text-[#94A3B8] leading-relaxed line-clamp-2">
                            {cred.description}
                          </p>
                        </div>
                      </div>

                      <div className="px-1 pt-4 mt-5 border-t border-white/10 flex items-center justify-between">
                        <span className="font-mono text-[10px] text-[#94A3B8]">
                          No: {cred.code}
                        </span>
                        <span className="font-mono text-[10px] text-emerald-400 font-bold">
                          TERVERIFIKASI ✓
                        </span>
                      </div>
                    </Interactive3DCard>
                  </ScrollReveal>
                ))}
              </div>
            )}

            {/* TAB 3: ACHIEVEMENTS & HIGHLIGHTS */}
            {portfolioTab === 'achievements' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
                {[
                  {
                    badge: 'CAPAIAN AKADEMIK',
                    title: 'IPK Akademik 3.75 / 4.00',
                    org: 'S1 Sistem Informasi — Universitas Semarang',
                    desc: 'Mempertahankan capaian akademik tinggi pada Program Studi S1 Sistem Informasi FTIK Universitas Semarang sembari aktif membangun berbagai proyek rekayasa perangkat lunak.',
                  },
                  {
                    badge: 'KEPANITIAAN & ORGANISASI',
                    title: 'Anggota Divisi Media — TISI INSIGHT 2026',
                    org: 'HIMMATISI FTIK Universitas Semarang',
                    desc: 'Dipercaya menjadi Anggota Divisi Media dalam mendukung publikasi, dokumentasi visual, dan kelancaran kegiatan seminar teknologi informasi TISI INSIGHT 2026.',
                  },
                  {
                    badge: 'PRODUK & REKAYASA SISTEM',
                    title: '4+ Aplikasi Web Full-Stack & AI',
                    org: 'WebGuard · Cobain AI Studio · Stand Chilla · CleanRide',
                    desc: 'Merancang dan mengimplementasikan sistem terintegrasi mulai dari pemindai keamanan URL real-time, studio Virtual Try-On berbasis WebRTC & AI, hingga katalog e-commerce.',
                  },
                ].map((ach, idx) => (
                  <ScrollReveal key={ach.title} delay={idx * 90}>
                    <Interactive3DCard className="h-full rounded-[20px] p-6 sm:p-7 bg-[#0D1627]/95 border border-white/15 hover:border-[#3B82F6] shadow-[0_14px_40px_rgba(0,0,0,0.65)] flex flex-col justify-between space-y-5">
                      <div className="space-y-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#2563EB]/20 border border-[#3B82F6]/40 font-mono text-[10px] font-bold text-[#38BDF8]">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{ach.badge}</span>
                        </span>
                        <h3 className="font-display font-extrabold text-xl text-white">
                          {ach.title}
                        </h3>
                        <p className="font-mono text-xs text-[#60A5FA]">{ach.org}</p>
                        <p className="text-sm text-[#94A3B8] leading-relaxed">{ach.desc}</p>
                      </div>
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-[#38BDF8]">
                        <span>EVAN PRASETYA</span>
                        <span>[0{idx + 1}]</span>
                      </div>
                    </Interactive3DCard>
                  </ScrollReveal>
                ))}
              </div>
            )}

            {/* TAB 4: TECH STACK */}
            {portfolioTab === 'techstack' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {techStackGrid.map((tech, idx) => (
                  <ScrollReveal key={tech.name} delay={idx * 45}>
                    <Interactive3DCard className="rounded-[18px] p-5 bg-[#0D1627]/95 border border-white/15 hover:border-[#38BDF8] shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#38BDF8]">
                          {tech.category}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-[#3B82F6] shadow-[0_0_10px_#3B82F6]" />
                      </div>
                      <h3 className="font-display font-extrabold text-lg text-white">
                        {tech.name}
                      </h3>
                      <span className="font-mono text-[11px] text-[#94A3B8] pt-2 border-t border-white/10">
                        {tech.badge}
                      </span>
                    </Interactive3DCard>
                  </ScrollReveal>
                ))}
              </div>
            )}

            {/* =================================================================
                DEDICATED 3D CERTIFICATE SHOWCASE ROW (ALWAYS VISIBLE BELOW PROJECTS
                OR WHEN BROWSING SO CERTIFICATES ARE PROMINENT WITH 3D TILT)
               ================================================================= */}
            {portfolioTab === 'projects' && (
              <div id="credentials" className="mt-24 pt-16 border-t border-[#263B59]/80">
                <ScrollReveal>
                  <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div>
                      <div className="font-mono text-[11px] font-bold tracking-[0.25em] text-[#38BDF8] uppercase mb-2">
                        [ 03 . SERTIFIKASI &amp; APRESIASI ]
                      </div>
                      <h3 className="font-display font-extrabold text-[28px] sm:text-[38px] text-white tracking-tight">
                        Sertifikat Organisasi &amp; Kepanitiaan
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-[#94A3B8] max-w-md">

                    </p>
                  </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
                  {credentialsList.map((cred, index) => (
                    <ScrollReveal key={cred.id} delay={index * 100}>
                      <Interactive3DCard
                        onClick={() => setSelectedCertificate(cred)}
                        className="group h-full rounded-[20px] p-4 sm:p-5 bg-[#0D1627]/95 border border-white/15 hover:border-[#38BDF8]/80 shadow-[0_14px_40px_rgba(0,0,0,0.65)] flex flex-col justify-between cursor-pointer overflow-hidden"
                      >
                        <div className="pointer-events-none absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#38BDF8]/45 to-transparent" />

                        <div>
                          <div className="relative aspect-[4/3] w-full rounded-[13px] overflow-hidden bg-[#060B14] border border-white/10 mb-4">
                            <img
                              src={cred.previewImage}
                              alt={cred.title}
                              loading="lazy"
                              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1627]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                              <span className="px-2.5 py-1 rounded-md bg-[#0A1424]/90 border border-[#38BDF8] font-mono text-[10px] font-bold text-white">
                                Klik untuk Memperbesar
                              </span>
                            </div>
                          </div>

                          <div className="px-1 space-y-2">
                            <div className="flex items-center justify-between text-[10px] font-mono text-[#38BDF8] uppercase tracking-wider">
                              <span>{cred.organization}</span>
                              <span className="text-[#94A3B8]">{cred.year}</span>
                            </div>

                            <h4 className="font-display font-extrabold text-[17px] sm:text-[19px] text-white group-hover:text-[#38BDF8] transition-colors leading-snug">
                              {cred.title}
                            </h4>

                            <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-2">
                              {cred.description}
                            </p>
                          </div>
                        </div>

                        <div className="px-1 pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                          <span className="font-mono text-[10px] text-[#94A3B8]">
                            No: {cred.code}
                          </span>
                          <span className="font-mono text-[10px] text-emerald-400 font-bold">
                            TERVERIFIKASI ✓
                          </span>
                        </div>
                      </Interactive3DCard>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* =====================================================================
            04. PENDIDIKAN & PENGALAMAN ORGANISASI (TERMASUK SERTIFIKAT HIMMATISI)
           ===================================================================== */}
        <section
          id="career"
          aria-labelledby="career-heading"
          className="relative w-full bg-[#0A1424] border-b border-[#263B59] py-16 sm:py-24 lg:py-32 overflow-hidden"
        >
          {/* Watermark */}
          <div
            aria-hidden="true"
            className="pointer-events-none select-none absolute top-8 right-4 sm:right-10 font-display font-black text-[clamp(3.5rem,13vw,16rem)] uppercase tracking-tighter text-[#F1F5F9]/[0.02] leading-none z-0"
          >
            PENDIDIKAN
          </div>

          <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 md:pl-16 lg:pl-20 lg:pr-12">
            {/* Section Header */}
            <ScrollReveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 lg:mb-20 gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-[#263B59]">
                <div>
                  <div className="font-mono text-[11px] font-bold tracking-[0.25em] text-[#38BDF8] uppercase mb-2.5">
                    [ 04 . REKAM JEJAK ]
                  </div>
                  <h2
                    id="career-heading"
                    className="font-display font-black text-[34px] sm:text-[50px] lg:text-[64px] leading-[0.95] tracking-tight uppercase text-[#F1F5F9]"
                  >
                    PENDIDIKAN &amp;{' '}
                    <span className="italic font-normal text-[#60A5FA]">ORGANISASI</span>
                  </h2>
                </div>
                <p className="text-[13px] sm:text-[15px] leading-[1.7] text-[#94A3B8] max-w-[440px]">
                  Latar belakang akademik Program Studi S1 Sistem Informasi serta keterlibatan aktif
                  dan dokumentasi sertifikat di organisasi HIMMATISI Universitas Semarang.
                </p>
              </div>
            </ScrollReveal>

            {/* Editorial Timeline Grid: Academic Background & Organizational Experience */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14">
              {/* Left Column (5 Cols): LATAR BELAKANG AKADEMIK */}
              <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-6">
                <ScrollReveal delay={80}>
                  <div className="pb-3 border-b border-[#263B59] flex items-center justify-between">
                    <h3 className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#38BDF8] flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 shrink-0" />
                      <span>LATAR BELAKANG PENDIDIKAN</span>
                    </h3>
                    <span className="font-mono text-[10px] sm:text-[11px] text-[#94A3B8]">
                      2024 — SEKARANG
                    </span>
                  </div>

                  <div className="mt-4 border border-[#263B59] bg-[#101E33] p-5 sm:p-8 hover:border-[#3B82F6] transition-colors space-y-5 sm:space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#38BDF8] px-3 py-1 bg-[#152640] border border-[#263B59]">
                        2024 — SEKARANG
                      </span>
                      <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-emerald-400">
                        MAHASISWA AKTIF
                      </span>
                    </div>

                    <div>
                      <h4 className="font-display font-black text-[22px] sm:text-[28px] uppercase text-[#F1F5F9] tracking-tight">
                        UNIVERSITAS SEMARANG (USM)
                      </h4>
                      <p className="font-mono text-[12px] sm:text-[13px] font-bold text-[#60A5FA] uppercase tracking-wider mt-1">
                        S1 Sistem Informasi · Fakultas Teknologi Informasi dan Komunikasi
                      </p>
                      <p className="text-[13px] text-[#94A3B8] mt-2 leading-relaxed">
                        Mempelajari pengembangan aplikasi web Full-Stack, perancangan basis data
                        relasional, rekayasa sistem informasi, analisis kebutuhan sistem, serta
                        perancangan antarmuka UI/UX.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#263B59] grid grid-cols-2 gap-4">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8] block">
                          IPK AKADEMIK
                        </span>
                        <span className="font-display font-extrabold text-xl sm:text-2xl text-[#F1F5F9]">
                          3.75 <span className="text-xs font-mono text-[#38BDF8]">/ 4.00</span>
                        </span>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8] block">
                          PENDIDIKAN SEBELUMNYA
                        </span>
                        <span className="font-display font-bold text-xs sm:text-sm text-[#F1F5F9] mt-1 block">
                          SMAN 06 Semarang
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right Column (7 Cols): PENGALAMAN ORGANISASI HIMMATISI + GALERI SERTIFIKAT */}
              <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
                <ScrollReveal delay={160}>
                  <div className="pb-3 border-b border-[#263B59] flex items-center justify-between">
                    <h3 className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#38BDF8] flex items-center gap-2">
                      <Users className="w-4 h-4 shrink-0" />
                      <span>PENGALAMAN ORGANISASI</span>
                    </h3>
                    <span className="font-mono text-[10px] sm:text-[11px] text-[#94A3B8]">
                      UNIVERSITAS SEMARANG
                    </span>
                  </div>

                  <div className="mt-4 border border-[#263B59] bg-[#101E33] p-5 sm:p-8 hover:border-[#3B82F6] transition-colors space-y-5 sm:space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-[#263B59]">
                      <div>
                        <h4 className="font-display font-black text-[22px] sm:text-[30px] uppercase text-[#F1F5F9] tracking-tight">
                          HIMMATISI USM
                        </h4>
                        <p className="font-mono text-[11px] sm:text-[12px] font-bold uppercase tracking-wider text-[#60A5FA] mt-0.5">
                          Himpunan Mahasiswa Teknologi Informasi dan Sistem Informasi
                        </p>
                      </div>
                      <span className="font-mono text-[10px] sm:text-[11px] text-[#38BDF8] tracking-widest uppercase shrink-0">
                        FTIK · USM
                      </span>
                    </div>

                    {/* Jabatan & Periode */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 bg-[#0A1424]/70 border border-[#263B59] p-4">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#94A3B8] block mb-1">
                          DIVISI &amp; PERAN
                        </span>
                        <span className="font-mono text-[12px] sm:text-[13px] font-bold text-[#F1F5F9]">
                          Anggota Divisi Komunikasi &amp; Informasi (Kominfo) / Media
                        </span>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#94A3B8] block mb-1">
                          PERIODE AKTIF
                        </span>
                        <span className="font-mono text-[12px] sm:text-[13px] font-bold text-[#38BDF8]">
                          2024 — SEKARANG
                        </span>
                      </div>
                    </div>

                    {/* Tanggung Jawab & Kontribusi */}
                    <div className="space-y-3">
                      <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#94A3B8]">
                        TANGGUNG JAWAB &amp; KONTRIBUSI
                      </div>
                      <div className="space-y-2.5">
                        {[
                          'Mengelola publikasi informasi, dokumentasi kegiatan, dan konten media sosial resmi untuk menjangkau mahasiswa jurusan.',
                          'Berperan aktif sebagai Anggota Divisi Media dalam menyukseskan kegiatan seminar TISI INSIGHT 2026.',
                          'Merancang aset visual dan desain grafis untuk kebutuhan publikasi program kerja serta acara departemen.',
                          'Berkolaborasi dengan tim lintas divisi dalam menyukseskan agenda tahunan, Kuliah Umum & Sarasehan, serta HIMMATISI One Night Solidarity.',
                        ].map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-3 text-[13px] sm:text-[14px] text-[#94A3B8]"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] mt-2 shrink-0" />
                            <span className="leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Lampiran Sertifikat Organisasi HIMMATISI Langsung di Dalam Kartu HIMMATISI */}
                    <div className="pt-5 border-t border-[#263B59] space-y-3.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#38BDF8] flex items-center gap-2">
                          <Award className="w-3.5 h-3.5 shrink-0" />
                          <span>DOKUMENTASI SERTIFIKAT HIMMATISI (3 SERTIFIKAT)</span>
                        </span>
                        <span className="font-mono text-[10px] text-[#94A3B8]">
                          KLIK UNTUK MEMPERBESAR
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                        {credentialsList.map((cert) => (
                          <Interactive3DCard
                            key={cert.id}
                            onClick={() => setSelectedCertificate(cert)}
                            className="group/cert rounded-xl border border-[#263B59] bg-[#0A1424] hover:border-[#38BDF8] transition-colors cursor-pointer overflow-hidden flex flex-col justify-between"
                          >
                            <div className="aspect-[4/3] w-full overflow-hidden bg-[#070E1A] relative">
                              <img
                                src={cert.previewImage}
                                alt={cert.title}
                                loading="lazy"
                                className="w-full h-full object-cover group-hover/cert:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="p-2.5 border-t border-[#263B59]">
                              <p className="font-mono text-[9px] text-[#38BDF8] uppercase truncate">
                                {cert.date}
                              </p>
                              <p className="font-display font-bold text-[11px] text-[#F1F5F9] leading-snug line-clamp-2 mt-0.5 group-hover/cert:text-[#60A5FA]">
                                {cert.title}
                              </p>
                            </div>
                          </Interactive3DCard>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            05. KONTAK & KOLABORASI
           ===================================================================== */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="relative w-full bg-[#0A1424] border-b border-[#263B59] pt-16 sm:pt-24 lg:pt-36 pb-16 sm:pb-24 overflow-hidden"
        >
          {/* Watermark */}
          <div
            aria-hidden="true"
            className="pointer-events-none select-none absolute top-8 right-4 sm:right-10 font-display font-black text-[clamp(4rem,15vw,18rem)] uppercase tracking-tighter text-[#F1F5F9]/[0.02] leading-none z-0"
          >
            KONTAK
          </div>

          <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 md:pl-16 lg:pl-20 lg:pr-12">
            <ScrollReveal>
              <div className="font-mono text-[11px] font-bold tracking-[0.25em] text-[#38BDF8] uppercase mb-4 sm:mb-6">
                [ 05 . HUBUNGI SAYA ]
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-end mb-12 sm:mb-16 lg:mb-24">
                <div className="lg:col-span-8">
                  <h2
                    id="contact-heading"
                    className="font-display font-black text-[36px] sm:text-[62px] lg:text-[88px] leading-[0.95] tracking-[-0.03em] uppercase text-[#F1F5F9]"
                  >
                    MARI BERDISKUSI <br />
                    <span className="italic font-normal text-[#60A5FA]">&amp; BERKOLABORASI.</span>
                  </h2>
                </div>
                <div className="lg:col-span-4">
                  <p className="text-[14px] sm:text-[16px] leading-[1.75] text-[#94A3B8]">
                    Tertarik dengan cara saya membangun arsitektur aplikasi atau ingin berkolaborasi
                    dalam sebuah proyek maupun program magang? Jangan ragu untuk menghubungi saya.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Minimal Contact Information Grid (Balanced 2-Column Layout without Local Time) */}
            <ScrollReveal delay={120}>
              <div className="border-t border-[#263B59] pt-10 sm:pt-12 lg:pt-16 grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-start">
                {/* Column 1 (6 Cols): Social Links */}
                <div className="md:col-span-6 flex flex-col">
                  <h3 className="font-mono text-[11px] font-bold tracking-[0.22em] text-[#38BDF8] uppercase mb-4 sm:mb-6">
                    MEDIA SOSIAL &amp; REPOSITORI
                  </h3>
                  <div className="flex flex-col divide-y divide-[#263B59]/60 border-t border-b border-[#263B59]/60">
                    <a
                      href="https://github.com/EvanPrasetya"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display font-bold text-[14px] sm:text-[16px] uppercase tracking-wider text-[#94A3B8] hover:text-[#F1F5F9] py-3.5 flex items-center justify-between group transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <GithubIcon className="w-4 h-4 text-[#60A5FA]" />
                        <span>GITHUB</span>
                      </span>
                      <span className="font-mono text-xs text-[#94A3B8] group-hover:text-[#38BDF8]">
                        github.com/EvanPrasetya ↗
                      </span>
                    </a>

                    <a
                      href="https://instagram.com/evnsss__"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display font-bold text-[14px] sm:text-[16px] uppercase tracking-wider text-[#94A3B8] hover:text-[#F1F5F9] py-3.5 flex items-center justify-between group transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <InstagramIcon className="w-4 h-4 text-[#60A5FA]" />
                        <span>INSTAGRAM</span>
                      </span>
                      <span className="font-mono text-xs text-[#94A3B8] group-hover:text-[#38BDF8]">
                        @evnsss__ ↗
                      </span>
                    </a>

                    <a
                      href="mailto:evansprasetyaa@gmail.com"
                      className="font-display font-bold text-[14px] sm:text-[16px] uppercase tracking-wider text-[#94A3B8] hover:text-[#F1F5F9] py-3.5 flex items-center justify-between group transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-[#60A5FA]" />
                        <span>EMAIL</span>
                      </span>
                      <span className="font-mono text-xs text-[#94A3B8] group-hover:text-[#38BDF8]">
                        evansprasetyaa@gmail.com ↗
                      </span>
                    </a>
                  </div>
                </div>

                {/* Column 2 (6 Cols): Contact Details & Availability */}
                <div className="md:col-span-6 flex flex-col">
                  <h3 className="font-mono text-[11px] font-bold tracking-[0.22em] text-[#38BDF8] uppercase mb-4 sm:mb-6">
                    INFORMASI KONTAK LANGSUNG
                  </h3>
                  <div className="p-6 sm:p-7 rounded-2xl border border-[#263B59] bg-[#101E33]/75 space-y-6">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#94A3B8] block mb-1.5">
                        EMAIL LANGSUNG
                      </span>
                      <a
                        href="mailto:evansprasetyaa@gmail.com?subject=Diskusi%20Proyek%20%2F%20Tawaran%20Kolaborasi%20-%20Portfolio%20Evan"
                        className="font-display font-extrabold text-[18px] sm:text-[24px] text-[#F1F5F9] hover:text-[#38BDF8] transition-colors tracking-tight block break-all"
                      >
                        evansprasetyaa@gmail.com
                      </a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-[#263B59]/70">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#94A3B8] block mb-1.5">
                          KETERSEDIAAN
                        </span>
                        <p className="font-mono text-[12px] font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span>TERBUKA UNTUK MAGANG</span>
                        </p>
                      </div>

                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#94A3B8] block mb-1.5">
                          DOMISILI
                        </span>
                        <p className="font-mono text-[12px] sm:text-[13px] font-bold text-[#F1F5F9] tracking-wider flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
                          <span>SEMARANG, INDONESIA</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      {/* =====================================================================
          06. FOOTER
         ===================================================================== */}
      <footer className="w-full bg-[#0A1424] text-[#F1F5F9] border-t border-[#263B59]/80 relative z-20 pb-20 md:pb-0">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:pl-16 lg:pl-20 lg:pr-12 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4">
            <span className="font-display font-extrabold text-sm tracking-tight text-[#F1F5F9]">
              EVAN <span className="text-[#60A5FA]">PRASETYA</span>
            </span>
            <span className="text-[#263B59] hidden sm:inline">|</span>
            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#94A3B8]">
              © 2026 Alfarell Nabil Evan Prasetya. Hak Cipta Dilindungi.
            </p>
          </div>
          <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#94A3B8]">
            SISTEM INFORMASI · UNIVERSITAS SEMARANG
          </p>
        </div>
      </footer>

      {/* =====================================================================
          MODAL 1: DETAIL PROYEK & GALERI DOKUMENTASI ASLI
         ===================================================================== */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-[70] bg-[#060C17]/85 backdrop-blur-md overflow-y-auto p-3 sm:p-8 flex items-start justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl rounded-2xl border border-[#263B59] bg-[#101E33] my-auto overflow-hidden shadow-2xl"
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-20 bg-[#0A1424] border-b border-[#263B59] px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] text-[#38BDF8] uppercase tracking-widest truncate">
                  <span>[PROYEK {selectedProject.number}]</span>
                  <span>·</span>
                  <span className="truncate">{selectedProject.category}</span>
                </div>
                <h3 className="font-display font-black text-base sm:text-2xl text-[#F1F5F9] mt-0.5 truncate">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="px-3 sm:px-4 py-2 rounded-lg border border-[#263B59] bg-[#101E33] hover:border-[#3B82F6] text-[#F1F5F9] font-mono text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1.5 shrink-0"
                aria-label="Tutup Modal"
              >
                <span className="hidden sm:inline">TUTUP</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-8 space-y-8 sm:space-y-10">
              {/* Tech Stack Strip & GitHub Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#263B59]">
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-[#263B59] bg-[#0A1424] font-mono text-[11px] sm:text-xs font-semibold text-[#38BDF8]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#3B82F6] hover:bg-[#60A5FA] text-[#0A1424] font-mono text-xs font-bold uppercase tracking-wider px-5 py-2.5 transition-colors"
                    >
                      <span>BUKA LIVE WEBSITE</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-[#263B59] bg-[#0A1424] hover:border-[#3B82F6] text-[#F1F5F9] font-mono text-xs font-bold uppercase tracking-wider px-5 py-2.5 transition-colors"
                    >
                      <GithubIcon className="w-4 h-4 text-[#38BDF8]" />
                      <span>SOURCE CODE GITHUB</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Tantangan (Problem), Solusi (Solution), & Fitur Utama */}
              {selectedProject.details && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="rounded-xl border border-[#263B59] bg-[#0A1424]/70 p-4 sm:p-5 space-y-2">
                      <h4 className="font-mono text-xs font-bold text-[#38BDF8] uppercase tracking-wider">
                        TANTANGAN (PROBLEM)
                      </h4>
                      <p className="text-[#94A3B8] text-xs sm:text-sm leading-relaxed">
                        {selectedProject.details.problem}
                      </p>
                    </div>
                    <div className="rounded-xl border border-[#263B59] bg-[#0A1424]/70 p-4 sm:p-5 space-y-2">
                      <h4 className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        SOLUSI (SOLUTION)
                      </h4>
                      <p className="text-[#F1F5F9] text-xs sm:text-sm leading-relaxed">
                        {selectedProject.details.solution}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <h4 className="font-mono text-xs font-bold text-[#F1F5F9] uppercase tracking-wider border-b border-[#263B59] pb-2">
                      FITUR UTAMA &amp; ARSITEKTUR
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                      {selectedProject.details.features.map((feat, idx) => {
                        const parts = feat.split(': ');
                        return (
                          <div
                            key={idx}
                            className="rounded-xl border border-[#263B59] bg-[#0A1424]/50 p-4 space-y-1.5"
                          >
                            <div className="flex items-center gap-2 text-white text-xs sm:text-sm font-bold">
                              <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                              <span>{parts[0]}</span>
                            </div>
                            <p className="text-[#94A3B8] text-xs leading-relaxed pl-6">
                              {parts[1] || parts[0]}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Galeri Dokumentasi Sistem */}
              {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                <div className="space-y-4 sm:space-y-5 pt-4 border-t border-[#263B59]">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#F1F5F9]">
                      DOKUMENTASI SISTEM ({selectedProject.gallery.length} TANGKAPAN LAYAR)
                    </h4>
                    <span className="font-mono text-[10px] sm:text-[11px] text-[#94A3B8]">
                      Klik gambar untuk memperbesar
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {selectedProject.gallery.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => setZoomedImage(img)}
                        className="group rounded-xl border border-[#263B59] bg-[#0A1424] hover:border-[#3B82F6] transition-colors cursor-pointer overflow-hidden flex flex-col justify-between"
                      >
                        <div className="aspect-video w-full overflow-hidden bg-[#050A14] relative">
                          <img
                            src={img.src}
                            alt={img.caption}
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#060C17]/75 via-[#060C17]/25 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white font-display text-xs font-semibold shadow-[0_8px_24px_rgba(0,0,0,0.5)] scale-90 group-hover:scale-100 transition-transform duration-300">
                              <ZoomIn className="w-4 h-4 text-[#38BDF8]" />
                              <span>Lihat Layar Penuh</span>
                            </span>
                          </div>
                        </div>
                        <div className="p-3 sm:p-3.5 border-t border-[#263B59] flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-[#38BDF8] shrink-0">
                            [0{idx + 1}]
                          </span>
                          <p className="text-xs sm:text-sm font-medium text-[#F1F5F9] leading-snug">
                            {img.caption}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 2: PREVIEW SERTIFIKAT HIMMATISI (DENGAN GAMBAR SERTIFIKAT ASLI)
         ===================================================================== */}
      {selectedCertificate && (
        <div
          onClick={() => setSelectedCertificate(null)}
          className="fixed inset-0 z-[75] bg-[#060C17]/90 backdrop-blur-md p-3 sm:p-8 overflow-y-auto flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl rounded-2xl border border-[#3B82F6] bg-[#101E33] overflow-hidden shadow-2xl my-auto"
          >
            <div className="px-4 sm:px-6 py-4 bg-[#0A1424] border-b border-[#263B59] flex items-center justify-between gap-3">
              <div className="min-w-0">
                <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] text-[#38BDF8] block truncate">
                  {selectedCertificate.category} · {selectedCertificate.date}
                </span>
                <h3 className="font-display font-black text-base sm:text-xl text-[#F1F5F9] mt-0.5 truncate">
                  {selectedCertificate.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCertificate(null)}
                className="px-3 py-1.5 rounded-lg border border-[#263B59] bg-[#101E33] text-[#F1F5F9] hover:border-[#3B82F6] font-mono text-xs font-bold cursor-pointer flex items-center gap-1.5 shrink-0"
              >
                <span className="hidden sm:inline">TUTUP</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 sm:p-8 space-y-5 sm:space-y-6">
              {/* Gambar Sertifikat Asli */}
              <div className="rounded-xl border border-[#263B59] bg-[#070E1A] overflow-hidden flex items-center justify-center max-h-[65vh]">
                <img
                  src={selectedCertificate.previewImage}
                  alt={selectedCertificate.title}
                  className="w-full h-auto max-h-[63vh] object-contain"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 rounded-xl bg-[#0A1424] border border-[#263B59] p-4 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-[#94A3B8] block">PENYELENGGARA</span>
                  <span className="text-[#F1F5F9] font-bold">
                    {selectedCertificate.organization}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#94A3B8] block">NOMOR SERTIFIKAT</span>
                  <span className="text-[#38BDF8] font-bold">{selectedCertificate.code}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#94A3B8] block">TANGGAL PELAKSANAAN</span>
                  <span className="text-[#F1F5F9] font-bold">{selectedCertificate.date}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                {selectedCertificate.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 3: LIGHTBOX ZOOM GAMBAR PENUH
         ===================================================================== */}
      {zoomedImage && (
        <div
          onClick={() => setZoomedImage(null)}
          className="fixed inset-0 z-[80] bg-[#060C17]/95 backdrop-blur-md p-3 sm:p-8 flex items-center justify-center"
        >
          <div onClick={(e) => e.stopPropagation()} className="max-w-5xl w-full space-y-3">
            <div className="flex items-center justify-between gap-2">
              <p className="font-mono text-xs sm:text-sm font-bold text-[#F1F5F9] truncate">
                {zoomedImage.caption}
              </p>
              <button
                type="button"
                onClick={() => setZoomedImage(null)}
                className="px-3 sm:px-4 py-1.5 rounded-lg border border-[#263B59] bg-[#101E33] font-mono text-xs text-[#F1F5F9] cursor-pointer shrink-0"
              >
                TUTUP [ESC]
              </button>
            </div>
            <div className="rounded-xl border border-[#263B59] bg-[#0A1424] max-h-[82vh] overflow-hidden flex items-center justify-center">
              <img
                src={zoomedImage.src}
                alt={zoomedImage.caption}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 4: PREVIEW CV PDF INTERAKTIF
         ===================================================================== */}
      {showCVModal && (
        <div
          onClick={() => setShowCVModal(false)}
          className="fixed inset-0 z-[75] bg-[#060C17]/85 backdrop-blur-md p-3 sm:p-6 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl h-[88vh] rounded-2xl border border-[#263B59] bg-[#101E33] flex flex-col overflow-hidden shadow-2xl"
          >
            <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#263B59] bg-[#0A1424] flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] text-[#38BDF8] block">
                  PREVIEW CURRICULUM VITAE // EVAN PRASETYA
                </span>
                <h3 className="font-display font-bold text-sm sm:text-lg text-[#F1F5F9] truncate">
                  CV - Alfarell Nabil Evan Prasetya.pdf
                </h3>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <a
                  href={cvFileUrl}
                  download="CV - Alfarell Nabil Evan Prasetya.pdf"
                  className="px-3 sm:px-4 py-2 rounded-lg bg-[#3B82F6] hover:bg-[#60A5FA] text-[#0A1424] font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>UNDUH PDF</span>
                </a>
                <a
                  href={cvFileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:flex px-4 py-2 rounded-lg border border-[#263B59] bg-[#101E33] hover:border-[#60A5FA] text-[#F1F5F9] font-mono text-[11px] uppercase tracking-wider items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>TAB BARU</span>
                </a>
                <button
                  type="button"
                  onClick={() => setShowCVModal(false)}
                  className="p-2 rounded-lg border border-[#263B59] bg-[#101E33] text-[#F1F5F9] hover:border-[#3B82F6] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-[#0A1424] w-full h-full">
              <iframe
                src={cvFileUrl}
                title="CV Alfarell Nabil Evan Prasetya"
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
