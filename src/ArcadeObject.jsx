import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const physical = (color, metalness = .25) => new THREE.MeshPhysicalMaterial({ color, metalness, roughness: .24, clearcoat: 1, clearcoatRoughness: .15 });
const glow = color => new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 1.3, roughness: .35 });
function canvasTexture(draw, w = 512, h = 512) { const canvas = document.createElement('canvas'); canvas.width = w; canvas.height = h; draw(canvas.getContext('2d'), w, h); const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; return texture; }
function makeModel(type, color) {
    const group = new THREE.Group(); const materials = new Map();
    const material = (c, m = .25) => { const key = `${c}-${m}`; if (!materials.has(key)) materials.set(key, physical(c, m)); return materials.get(key); };
    const add = (geometry, mat, x = 0, y = 0, z = 0) => { const mesh = new THREE.Mesh(geometry, mat); mesh.position.set(x, y, z); group.add(mesh); return mesh; };
    const box = (w, h, d, x, y, z, c, r = .08) => add(new RoundedBoxGeometry(w, h, d, 3, Math.min(r, w / 4, h / 4, d / 4)), material(c), x, y, z);
    const sphere = (radius, x, y, z, c) => add(new THREE.SphereGeometry(radius, 48, 32), material(c), x, y, z);
    const cylinder = (radius, height, x, y, z, c) => add(new THREE.CylinderGeometry(radius, radius, height, 64), material(c, .45), x, y, z);
    if (type === 'cabinet') {
        // A bevelled physical cabinet, recessed CRT, control deck, coin door, and neon rails.
        box(2.25, 2.42, 1.5, 0, -.96, 0, '#11131b', .12); box(2.25, 1.93, 1.35, 0, 1.12, -.16, '#11131b', .12); box(2.44, .56, 1.6, 0, 2.24, -.04, '#22232e', .08);
        box(2.18, 1.72, .1, 0, 1.11, .56, '#070a10'); box(1.95, 1.48, .09, 0, 1.1, .62, '#282333');
        const screenTexture = canvasTexture((ctx, w, h) => {
            ctx.fillStyle = '#05151b'; ctx.fillRect(0, 0, w, h); ctx.strokeStyle = '#2acad3'; ctx.shadowColor = '#2acad3'; ctx.shadowBlur = 10; ctx.lineWidth = 5;
            ctx.strokeRect(35, 50, 442, 418); for (let i = 0; i < 4; i++) { ctx.strokeRect(55 + i * 110, 80, 65, 100); ctx.strokeRect(55 + i * 110, 330, 65, 108); } ctx.strokeRect(58, 215, 125, 70); ctx.strokeRect(310, 215, 140, 70); ctx.fillStyle = '#d4f77c'; ctx.beginPath(); ctx.moveTo(244, 250); ctx.arc(244, 250, 28, .65, Math.PI * 2 - .65); ctx.fill();
            ctx.fillStyle = '#fc68c6'; ctx.fillRect(349, 231, 25, 25); ctx.shadowBlur = 0; ctx.fillStyle = '#eeece2'; ctx.font = 'bold 14px monospace'; ctx.fillText('1UP  02480', 35, 30); for (let i = 0; i < 12; i++)ctx.fillRect(55 + i * 35, 308, 5, 5);
            for (let y = 0; y < h; y += 5) { ctx.fillStyle = '#00000026'; ctx.fillRect(0, y, w, 1); }
        }); const screen = add(new THREE.PlaneGeometry(1.8, 1.33), new THREE.MeshBasicMaterial({ map: screenTexture }), 0, 1.12, .68);
        const title = canvasTexture((ctx, w, h) => { ctx.fillStyle = '#080b13'; ctx.fillRect(0, 0, w, h); ctx.shadowBlur = 15; ctx.shadowColor = '#f667c5'; ctx.fillStyle = '#f667c5'; ctx.font = 'bold 86px monospace'; ctx.textAlign = 'center'; ctx.fillText('ARCADE', w / 2, 112); }, 512, 160);
        add(new THREE.PlaneGeometry(2.16, .41), new THREE.MeshBasicMaterial({ map: title }), 0, 2.24, .79);
        const deck = box(2.5, .23, 1.76, 0, .0, .3, '#2d2839', .065); deck.rotation.x = .09; for (const x of [-1.13, 1.13]) { add(new RoundedBoxGeometry(.047, 4.73, .06, 2, .012), glow('#f667c5'), x, -.03, .77); add(new RoundedBoxGeometry(.035, 1.75, .04, 2, .009), glow('#85e3ed'), x, 1.1, .65); }
        cylinder(.055, .4, -.63, .35, .75, '#c4c9cb'); sphere(.18, -.63, .58, .75, '#85e3ed'); for (let i = 0; i < 3; i++) { cylinder(.14, .1, .24 + i * .33, .16, .89, i === 1 ? '#d4f77c' : '#f667c5'); }
        box(.53, .74, .04, 0, -.95, .78, '#040609', .03); box(.27, .04, .025, 0, -.8, .81, '#a7a8af', .004); box(.19, .16, .035, 0, -1.13, .81, '#31323c'); box(.4, .16, .03, 0, -1.73, .79, '#85e3ed', .012);
        for (const x of [-.9, .9]) box(.16, .2, .6, x, -2.28, -.1, '#070a11', .03);
        // Collectible tokens emphasize the scene's actual depth.
        const coin = cylinder(.32, .08, 1.9, -.8, .1, '#e6c366'); coin.rotation.set(Math.PI / 2, .5, .4); sphere(.13, -1.7, 1.25, .2, '#d4f77c');
        group.rotation.set(.06, -.38, -.05);
    } else if (type === 'pacman') {
        const shape = new THREE.Shape(); shape.moveTo(0, 0); shape.absarc(0, 0, 1.3, .52, Math.PI * 2 - .52, false); shape.lineTo(0, 0);
        add(new THREE.ExtrudeGeometry(shape, { depth: .52, bevelEnabled: true, bevelSegments: 6, bevelSize: .11, bevelThickness: .11, curveSegments: 64 }), material(color), 0, 0, -.26);
        sphere(.095, .24, .8, .39, '#142519'); sphere(.14, 1.55, -.04, .04, '#c5e89b'); sphere(.1, 2, -.04, .04, '#c5e89b'); group.position.x = -.15; group.rotation.set(.08, -.4, -.16);
    } else if (type === 'ghost') {
        const shape = new THREE.Shape(); shape.moveTo(-1.15, -1.0); shape.lineTo(-1.15, .1); shape.bezierCurveTo(-1.15, 1.65, 1.15, 1.65, 1.15, .1); shape.lineTo(1.15, -1); shape.lineTo(.77, -.7); shape.lineTo(.39, -1.05); shape.lineTo(0, -.7); shape.lineTo(-.38, -1.05); shape.lineTo(-.76, -.7); shape.closePath();
        add(new THREE.ExtrudeGeometry(shape, { depth: .6, bevelEnabled: true, bevelSegments: 8, bevelSize: .16, bevelThickness: .16, curveSegments: 48 }), material(color), 0, 0, -.3);
        for (const x of [-.43, .43]) { const eye = sphere(.27, x, .34, .42, '#fff9ed'); eye.scale.set(.85, 1.2, .5); const pupil = sphere(.11, x + .065, .34, .56, '#2d1439'); pupil.scale.z = .45; }
        group.rotation.set(.05, -.38, -.12);
    } else if (type === 'joystick') {
        box(2.85, .49, 1.8, 0, -.92, 0, '#112f3e', .13); box(2.65, .05, 1.59, 0, -.65, 0, '#4596ad', .018); cylinder(.065, 1.25, -.6, 0, -.06, '#cbd2d9'); sphere(.46, -.6, .63, -.06, color);
        for (const [x, z, c] of [[.43, .32, '#f667c5'], [1, .32, '#d4f77c'], [.72, -.22, '#85e3ed']]) { cylinder(.22, .12, x, -.56, z, c); }
        for (const x of [-1.04, 1.04]) for (const z of [-.56, .56]) { cylinder(.045, .012, x, -.612, z, '#dee4e7'); }
        group.rotation.set(.22, -.45, -.13);
    } else if (type === 'coin') {
        const coin = cylinder(1.28, .3, 0, 0, 0, color); coin.rotation.x = Math.PI / 2;
        for (const z of [-.165, .165]) { const ring = add(new THREE.TorusGeometry(1.06, .04, 12, 80), material('#fff0aa', .65), 0, 0, z); }
        for (let i = 0; i < 64; i++) { const angle = i * Math.PI / 32; const edge = box(.033, .1, .29, Math.sin(angle) * 1.265, Math.cos(angle) * 1.265, 0, '#bc7d2e', .007); edge.rotation.z = -angle; }
        box(.15, 1.23, .05, .05, 0, .18, '#fff0aa', .018); box(.61, .13, .05, .05, -.57, .18, '#fff0aa', .018); const cap = box(.4, .13, .05, -.06, .57, .18, '#fff0aa', .018); cap.rotation.z = .3; group.rotation.set(.12, -.4, .2);
    }
    const base = group.rotation.clone(); return { group, base };
}
function disposeScene(scene) { const geometries = new Set(), materials = new Set(), textures = new Set(); scene.traverse(obj => { if (obj.geometry) geometries.add(obj.geometry); if (obj.material) { for (const m of Array.isArray(obj.material) ? obj.material : [obj.material]) { materials.add(m); if (m.map) textures.add(m.map); } } }); geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); textures.forEach(t => t.dispose()); }
export default function ArcadeObject({ type = 'pacman', color = '#d4f77c', hero = false }) {
    const hostRef = useRef();
    useEffect(() => {
        const host = hostRef.current; let renderer, scene, camera, model, environment, frame = 0, deadline = 0, visible = false, disposed = false, lastSize = '', pointer = { x: 0, y: 0 };
        const reduced = matchMedia('(prefers-reduced-motion: reduce)');
        function initialize() {
            if (renderer || disposed) return; try {
                renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' }); renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6)); renderer.setClearColor(0x000000, 0); renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = hero ? 1.1 : 1.0; host.appendChild(renderer.domElement);
                scene = new THREE.Scene(); camera = new THREE.PerspectiveCamera(hero ? 33 : 36, 1, .1, 50); camera.position.set(0, hero ? .5 : .15, hero ? 10.5 : 7.7); camera.lookAt(0, 0, 0);
                const pmrem = new THREE.PMREMGenerator(renderer), room = new RoomEnvironment(); environment = pmrem.fromScene(room, .04); scene.environment = environment.texture; pmrem.dispose(); room.dispose();
                scene.add(new THREE.HemisphereLight(0xffffff, 0x292342, 1.2)); const key = new THREE.DirectionalLight(0xffffff, 2.5); key.position.set(-3, 5, 5); scene.add(key); const rim = new THREE.DirectionalLight(hero ? 0xf667c5 : 0xffffff, hero ? 4 : 1.5); rim.position.set(3, 2, -3); scene.add(rim); const cyan = new THREE.PointLight(0x85e3ed, hero ? 18 : 6); cyan.position.set(-3, 0, 3); scene.add(cyan);
                model = makeModel(type, color); scene.add(model.group); host.dataset.ready = 'true';
            } catch (error) { console.warn('3D unavailable; displaying artwork fallback.', error); destroy(); }
        }
        function draw() {
            frame = 0; if (!visible || !renderer || disposed) return; const r = host.getBoundingClientRect(); if (r.width <= 0 || r.height <= 0) return; const size = `${Math.round(r.width)}x${Math.round(r.height)}`; if (size !== lastSize) { lastSize = size; renderer.setSize(r.width, r.height); camera.aspect = r.width / r.height; camera.updateProjectionMatrix(); }
            // Normal scrolling rotates the actual geometry; pointer input adds a subtle look-around.
            const section = host.closest(hero ? '.hero' : '.lineup-shell') || host.closest('dialog') || host;
            const sectionRect = section.getBoundingClientRect(); const scrollPhase = hero ? THREE.MathUtils.clamp(-sectionRect.top / sectionRect.height, 0, 1) : THREE.MathUtils.clamp((innerWidth / 2 - r.left - r.width / 2) / innerWidth, -1, 1);
            const tilt = reduced.matches ? 0 : scrollPhase;
            model.group.rotation.set(model.base.x + (!reduced.matches ? pointer.y * .13 : 0), model.base.y + tilt * (hero ? 1.3 : .7) + (!reduced.matches ? pointer.x * .28 : 0), model.base.z + (hero ? tilt * .07 : 0));
            model.group.position.y = hero ? -tilt * .15 : 0; renderer.render(scene, camera); if (performance.now() < deadline) frame = requestAnimationFrame(draw);
        }
        function request() { if (!visible || disposed) return; deadline = performance.now() + (reduced.matches ? 0 : 1100); if (!frame) frame = requestAnimationFrame(draw); }
        function destroy() { cancelAnimationFrame(frame); frame = 0; if (scene) disposeScene(scene); environment?.dispose(); renderer?.dispose(); renderer?.forceContextLoss(); renderer = scene = model = environment = null; lastSize = ''; host.removeAttribute('data-ready'); host.replaceChildren(); }
        const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; if (visible) { initialize(); request(); } else destroy(); }, { rootMargin: '60px' }); observer.observe(host);
        const resize = new ResizeObserver(request); resize.observe(host);
        const pointerMove = e => { if (reduced.matches) return; const r = host.getBoundingClientRect(); if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) { pointer.x = (e.clientX - r.left) / r.width - .5; pointer.y = (e.clientY - r.top) / r.height - .5; request(); } else if (pointer.x || pointer.y) { pointer = { x: 0, y: 0 }; request(); } };
        window.addEventListener('scroll', request, { capture: true, passive: true }); window.addEventListener('pointermove', pointerMove, { passive: true }); window.addEventListener('resize', request); reduced.addEventListener('change', request);
        // IntersectionObserver may run before fonts and pinned sections finish their layout.
        document.fonts.ready.then(() => { if (!disposed) request(); });
        return () => { disposed = true; observer.disconnect(); resize.disconnect(); window.removeEventListener('scroll', request, true); window.removeEventListener('pointermove', pointerMove); window.removeEventListener('resize', request); reduced.removeEventListener('change', request); destroy(); };
    }, [type, color, hero]);
    return <div ref={hostRef} className={`three-object ${hero ? 'three-hero' : ''}`} role="img" aria-label={`Interactive 3D ${type === 'cabinet' ? 'neon arcade cabinet' : type} object`} />;
}
