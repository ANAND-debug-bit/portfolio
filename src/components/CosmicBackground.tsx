import { useEffect, useRef, useState } from 'react';

const IMAGE_SRC = '/black-hole.jpg';
// Event horizon in the source image (x, y in 0–1, origin top-left).
const HOLE = { x: 0.467, y: 0.303 };
const IMAGE_ASPECT = 1774 / 887;

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
varying vec2 v_uv;
uniform sampler2D u_tex;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_hole;
uniform float u_aspect;

vec2 coverUv(vec2 uv) {
  float canvasAspect = u_res.x / max(u_res.y, 1.0);
  vec2 scale = canvasAspect > u_aspect
    ? vec2(1.0, u_aspect / canvasAspect)
    : vec2(canvasAspect / u_aspect, 1.0);
  return (uv - 0.5) * scale + 0.5;
}

void main() {
  // Canvas uv has y = 0 at the bottom; the photo is stored top-first.
  vec2 uv = vec2(v_uv.x, 1.0 - v_uv.y);
  vec2 baseUv = coverUv(uv);

  vec2 delta = baseUv - u_hole;
  vec2 phys = vec2(delta.x * u_aspect, delta.y);
  float radius = length(phys);
  float angle = atan(phys.y, phys.x);

  // Inner disk orbits. The outer starfield barely moves, so the frame stays planted.
  float proximity = smoothstep(0.62, 0.04, radius);
  float spin = u_time * (0.025 + 0.28 * proximity);
  float spun = angle - spin;
  vec2 phys2 = vec2(cos(spun), sin(spun)) * radius;
  vec2 spunUv = u_hole + vec2(phys2.x / u_aspect, phys2.y);

  float inside =
    step(0.0, spunUv.x) * step(spunUv.x, 1.0) *
    step(0.0, spunUv.y) * step(spunUv.y, 1.0);
  vec2 sampleUv = mix(baseUv, spunUv, inside);

  // Texture y=0 is the bottom of the photo.
  vec2 texUv = vec2(sampleUv.x, 1.0 - sampleUv.y);
  vec3 color = texture2D(u_tex, clamp(texUv, 0.001, 0.999)).rgb;
  gl_FragColor = vec4(color, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

type CosmicBackgroundProps = {
  className?: string;
};

export default function CosmicBackground({ className = '' }: CosmicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
    });
    if (!gl) return;

    const vert = compile(gl, gl.VERTEX_SHADER, VERT);
    const frag = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vert || !frag) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const pos = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    gl.useProgram(program);

    const uRes = gl.getUniformLocation(program, 'u_res');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uHole = gl.getUniformLocation(program, 'u_hole');
    const uAspect = gl.getUniformLocation(program, 'u_aspect');
    gl.uniform2f(uHole, HOLE.x, HOLE.y);
    gl.uniform1f(uAspect, IMAGE_ASPECT);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    // 1x1 placeholder until the photo arrives.
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 0, 0]),
    );

    let hasImage = false;
    const image = new Image();
    image.decoding = 'async';
    image.src = IMAGE_SRC;
    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      hasImage = true;
    };

    let frame = 0;
    let running = true;
    let alive = true;
    let announced = false;
    const started = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const draw = (now: number) => {
      if (!running) return;
      frame = window.requestAnimationFrame(draw);
      resize();
      if (!hasImage) return;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (now - started) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (!announced && alive) {
        announced = true;
        setReady(true);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry?.isIntersecting ?? true;
        if (visible && !frame) {
          running = true;
          frame = window.requestAnimationFrame(draw);
        } else if (!visible) {
          running = false;
          if (frame) window.cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { threshold: 0.01 },
    );
    observer.observe(canvas);
    frame = window.requestAnimationFrame(draw);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        if (frame) window.cancelAnimationFrame(frame);
        frame = 0;
      } else if (!frame) {
        running = true;
        frame = window.requestAnimationFrame(draw);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      alive = false;
      running = false;
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
    };
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <img
        src={IMAGE_SRC}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full ${ready ? '' : 'opacity-0'}`}
      />
    </div>
  );
}
