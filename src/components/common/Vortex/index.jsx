import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useReducedMotion } from '../../../motionConfig';

/* ------------------------------------------------------------------ */
/* Compact 3D simplex noise (public-domain implementation).            */
/* Inlined here to avoid a new dependency. Used to drive the organic   */
/* flow field that moves each particle.                                */
/* ------------------------------------------------------------------ */
class SimplexNoise {
  constructor() {
    this.grad3 = [
      [1, 1, 0],
      [-1, 1, 0],
      [1, -1, 0],
      [-1, -1, 0],
      [1, 0, 1],
      [-1, 0, 1],
      [1, 0, -1],
      [-1, 0, -1],
      [0, 1, 1],
      [0, -1, 1],
      [0, 1, -1],
      [0, -1, -1],
    ];
    this.p = [];
    for (let i = 0; i < 256; i++) this.p[i] = Math.floor(Math.random() * 256);
    this.perm = [];
    for (let i = 0; i < 512; i++) this.perm[i] = this.p[i & 255];
  }

  dot3(g, x, y, z) {
    return g[0] * x + g[1] * y + g[2] * z;
  }

  noise3D(xin, yin, zin) {
    const F3 = 1 / 3;
    const G3 = 1 / 6;
    const s = (xin + yin + zin) * F3;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const k = Math.floor(zin + s);
    const t = (i + j + k) * G3;
    const X0 = i - t;
    const Y0 = j - t;
    const Z0 = k - t;
    const x0 = xin - X0;
    const y0 = yin - Y0;
    const z0 = zin - Z0;

    let i1;
    let j1;
    let k1;
    let i2;
    let j2;
    let k2;
    if (x0 >= y0) {
      if (y0 >= z0) {
        i1 = 1;
        j1 = 0;
        k1 = 0;
        i2 = 1;
        j2 = 1;
        k2 = 0;
      } else if (x0 >= z0) {
        i1 = 1;
        j1 = 0;
        k1 = 0;
        i2 = 1;
        j2 = 0;
        k2 = 1;
      } else {
        i1 = 0;
        j1 = 0;
        k1 = 1;
        i2 = 1;
        j2 = 0;
        k2 = 1;
      }
    } else if (y0 < z0) {
      i1 = 0;
      j1 = 0;
      k1 = 1;
      i2 = 0;
      j2 = 1;
      k2 = 1;
    } else if (x0 < z0) {
      i1 = 0;
      j1 = 1;
      k1 = 0;
      i2 = 0;
      j2 = 1;
      k2 = 1;
    } else {
      i1 = 0;
      j1 = 1;
      k1 = 0;
      i2 = 1;
      j2 = 1;
      k2 = 0;
    }

    const x1 = x0 - i1 + G3;
    const y1 = y0 - j1 + G3;
    const z1 = z0 - k1 + G3;
    const x2 = x0 - i2 + 2 * G3;
    const y2 = y0 - j2 + 2 * G3;
    const z2 = z0 - k2 + 2 * G3;
    const x3 = x0 - 1 + 3 * G3;
    const y3 = y0 - 1 + 3 * G3;
    const z3 = z0 - 1 + 3 * G3;

    const ii = i & 255;
    const jj = j & 255;
    const kk = k & 255;
    const gi0 = this.perm[ii + this.perm[jj + this.perm[kk]]] % 12;
    const gi1 = this.perm[ii + i1 + this.perm[jj + j1 + this.perm[kk + k1]]] % 12;
    const gi2 = this.perm[ii + i2 + this.perm[jj + j2 + this.perm[kk + k2]]] % 12;
    const gi3 = this.perm[ii + 1 + this.perm[jj + 1 + this.perm[kk + 1]]] % 12;

    let n0 = 0;
    let n1 = 0;
    let n2 = 0;
    let n3 = 0;

    let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
    if (t0 >= 0) {
      t0 *= t0;
      n0 = t0 * t0 * this.dot3(this.grad3[gi0], x0, y0, z0);
    }
    let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
    if (t1 >= 0) {
      t1 *= t1;
      n1 = t1 * t1 * this.dot3(this.grad3[gi1], x1, y1, z1);
    }
    let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
    if (t2 >= 0) {
      t2 *= t2;
      n2 = t2 * t2 * this.dot3(this.grad3[gi2], x2, y2, z2);
    }
    let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
    if (t3 >= 0) {
      t3 *= t3;
      n3 = t3 * t3 * this.dot3(this.grad3[gi3], x3, y3, z3);
    }

    return 32 * (n0 + n1 + n2 + n3);
  }
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
const TAU = Math.PI * 2;
const lerp = (a, b, t) => a + (b - a) * t;
const rand = n => n * Math.random();
const randRange = n => n - rand(2 * n);
const fadeInOut = (t, m) => {
  const hm = 0.5 * m;
  return Math.abs(((t + hm) % m) - hm) / hm;
};

/* ------------------------------------------------------------------ */
/* Styled wrapper                                                      */
/* ------------------------------------------------------------------ */
const Wrapper = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  opacity: ${({ $opacity }) => $opacity};
  transition: opacity 600ms ease;
`;

const Canvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
`;

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
const Vortex = ({
  children,
  backgroundColor = 'transparent',
  particleCount = 400,
  mobileParticleCount = 150,
  baseHue = 220,
  rangeHue = 100,
  baseSpeed = 0.1,
  rangeSpeed = 1.4,
  baseRadius = 1,
  rangeRadius = 3,
  baseTTL = 50,
  rangeTTL = 150,
  rangeY = 100,
  noiseSteps = 8,
  xOff = 0.00125,
  yOff = 0.00125,
  zOff = 0.0005,
  glowBlur = 6,
  opacity = 0.5,
  className,
}) => {
  const wrapperRef = useRef(null);
  const canvasARef = useRef(null);
  const canvasBRef = useRef(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvasA = canvasARef.current;
    const canvasB = canvasBRef.current;
    if (!wrapper || !canvasA || !canvasB) return undefined;

    const ctxA = canvasA.getContext('2d');
    const ctxB = canvasB.getContext('2d');
    if (!ctxA || !ctxB) return undefined;

    const isMobile =
      typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
    const count = isMobile ? mobileParticleCount : particleCount;
    const propsPerParticle = 9;
    const propsLength = count * propsPerParticle;

    const simplex = new SimplexNoise();
    let particleProps = new Float32Array(propsLength);
    let width = 0;
    let height = 0;
    const center = [0, 0];
    let tick = 0;
    let rafId = null;

    const initParticle = i => {
      const x = rand(width);
      const y = center[1] + randRange(rangeY);
      const vx = 0;
      const vy = 0;
      const life = 0;
      const ttl = baseTTL + rand(rangeTTL);
      const speed = baseSpeed + rand(rangeSpeed);
      const radius = baseRadius + rand(rangeRadius);
      const hue = baseHue + rand(rangeHue);
      particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
    };

    const initParticles = () => {
      tick = 0;
      particleProps = new Float32Array(propsLength);
      for (let i = 0; i < propsLength; i += propsPerParticle) {
        initParticle(i);
      }
    };

    // Returns true if dimensions actually changed. Prevents ResizeObserver
    // loops caused by re-assigning the same width/height.
    const createCanvas = () => {
      const newWidth = wrapper.clientWidth;
      const newHeight = wrapper.clientHeight;
      if (newWidth === width && newHeight === height) return false;
      width = newWidth;
      height = newHeight;
      canvasA.width = width;
      canvasA.height = height;
      canvasB.width = width;
      canvasB.height = height;
      center[0] = width / 2;
      center[1] = height / 2;
      return true;
    };

    const checkBounds = (x, y) => x > width || x < 0 || y > height || y < 0;

    const drawParticle = (x, y, x2, y2, life, ttl, radius, hue) => {
      ctxA.save();
      ctxA.lineCap = 'round';
      ctxA.lineWidth = radius;
      ctxA.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
      ctxA.beginPath();
      ctxA.moveTo(x, y);
      ctxA.lineTo(x2, y2);
      ctxA.stroke();
      ctxA.closePath();
      ctxA.restore();
    };

    const updateParticle = i => {
      const i2 = 1 + i;
      const i3 = 2 + i;
      const i4 = 3 + i;
      const i5 = 4 + i;
      const i6 = 5 + i;
      const i7 = 6 + i;
      const i8 = 7 + i;
      const i9 = 8 + i;

      const x = particleProps[i];
      const y = particleProps[i2];
      const n = simplex.noise3D(x * xOff, y * yOff, tick * zOff) * noiseSteps * TAU;
      const vx = lerp(particleProps[i3], Math.cos(n), 0.5);
      const vy = lerp(particleProps[i4], Math.sin(n), 0.5);
      const life = particleProps[i5];
      const ttl = particleProps[i6];
      const speed = particleProps[i7];
      const x2 = x + vx * speed;
      const y2 = y + vy * speed;
      const radius = particleProps[i8];
      const hue = particleProps[i9];

      drawParticle(x, y, x2, y2, life, ttl, radius, hue);

      const newLife = life + 1;
      particleProps[i] = x2;
      particleProps[i2] = y2;
      particleProps[i3] = vx;
      particleProps[i4] = vy;
      particleProps[i5] = newLife;

      if (checkBounds(x, y) || newLife > ttl) initParticle(i);
    };

    const drawParticles = () => {
      for (let i = 0; i < propsLength; i += propsPerParticle) {
        updateParticle(i);
      }
    };

    const renderGlow = () => {
      if (glowBlur <= 0) return;
      ctxB.save();
      ctxB.filter = `blur(${glowBlur}px) brightness(200%)`;
      ctxB.globalCompositeOperation = 'lighter';
      ctxB.drawImage(canvasA, 0, 0, width, height);
      ctxB.restore();

      ctxB.save();
      ctxB.filter = `blur(${glowBlur / 2}px) brightness(200%)`;
      ctxB.globalCompositeOperation = 'lighter';
      ctxB.drawImage(canvasA, 0, 0, width, height);
      ctxB.restore();
    };

    const renderToScreen = () => {
      ctxB.save();
      ctxB.globalCompositeOperation = 'lighter';
      ctxB.drawImage(canvasA, 0, 0, width, height);
      ctxB.restore();
    };

    const paintFrame = () => {
      ctxA.clearRect(0, 0, width, height);

      if (backgroundColor !== 'transparent') {
        ctxB.fillStyle = backgroundColor;
        ctxB.fillRect(0, 0, width, height);
      } else {
        ctxB.clearRect(0, 0, width, height);
      }

      drawParticles();
      renderGlow();
      renderToScreen();
    };

    const draw = () => {
      tick++;
      paintFrame();
      rafId = window.requestAnimationFrame(draw);
    };

    createCanvas();
    initParticles();

    if (prefersReduced) {
      // Single static frame; no RAF loop, no continuous work.
      paintFrame();
    } else {
      rafId = window.requestAnimationFrame(draw);
    }

    const resizeObserver = new ResizeObserver(() => {
      const changed = createCanvas();
      if (changed) initParticles();
    });
    resizeObserver.observe(wrapper);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      particleProps = null;
    };
  }, [
    backgroundColor,
    particleCount,
    mobileParticleCount,
    baseHue,
    rangeHue,
    baseSpeed,
    rangeSpeed,
    baseRadius,
    rangeRadius,
    baseTTL,
    rangeTTL,
    rangeY,
    noiseSteps,
    xOff,
    yOff,
    zOff,
    glowBlur,
    prefersReduced,
  ]);

  return (
    <Wrapper ref={wrapperRef} $opacity={opacity} className={className} aria-hidden="true">
      <Canvas ref={canvasARef} />
      <Canvas ref={canvasBRef} />
      {children}
    </Wrapper>
  );
};

Vortex.propTypes = {
  children: PropTypes.node,
  backgroundColor: PropTypes.string,
  particleCount: PropTypes.number,
  mobileParticleCount: PropTypes.number,
  baseHue: PropTypes.number,
  rangeHue: PropTypes.number,
  baseSpeed: PropTypes.number,
  rangeSpeed: PropTypes.number,
  baseRadius: PropTypes.number,
  rangeRadius: PropTypes.number,
  baseTTL: PropTypes.number,
  rangeTTL: PropTypes.number,
  rangeY: PropTypes.number,
  noiseSteps: PropTypes.number,
  xOff: PropTypes.number,
  yOff: PropTypes.number,
  zOff: PropTypes.number,
  glowBlur: PropTypes.number,
  opacity: PropTypes.number,
  className: PropTypes.string,
};

export default Vortex;
