import React from 'react';
import ArcadeObject from './ArcadeObject';
// Real WebGL collectibles, with vector fallbacks and lightweight directory thumbnails.
export default function Poster({event,compact=false}){
 const id=`art-${event.id}-${compact?'small':'large'}`;
 const palettes={pacman:['#caff61','#142519'],ghost:['#f36cda','#32183d'],joystick:['#85e3ed','#082f43'],coin:['#ffcc70','#48270f']};
 const [bg,ink]=palettes[event.iconType];
 return <div className={`poster-art ${event.iconType}`} style={{'--poster-bg':bg,'--poster-ink':ink}} aria-hidden="true">
 {!compact&&<ArcadeObject type={event.iconType} color={{pacman:'#b1e131',ghost:'#c62cac',joystick:'#35bfd4',coin:'#d99c2c'}[event.iconType]}/>}
 <svg className="poster-vector" viewBox="0 0 400 460" fill="none" xmlns="http://www.w3.org/2000/svg">
 <defs><linearGradient id={`${id}-metal`} x1="80" y1="60" x2="340" y2="370" gradientUnits="userSpaceOnUse"><stop stopColor="#fff8c6"/><stop offset=".35" stopColor={bg}/><stop offset=".75" stopColor={ink}/><stop offset="1" stopColor={bg}/></linearGradient><pattern id={`${id}-grid`} width="32" height="32" patternUnits="userSpaceOnUse"><path d="M 32 0 L 0 0 0 32" stroke={ink} opacity=".12"/></pattern><radialGradient id={`${id}-sphere`} cx=".3" cy=".2" r=".8"><stop stopColor="#f3feff"/><stop offset=".3" stopColor={bg}/><stop offset="1" stopColor={ink}/></radialGradient></defs>
 <rect width="400" height="460" fill={bg}/><rect width="400" height="460" fill={`url(#${id}-grid)`}/>
 <circle cx="200" cy="225" r="167" stroke={ink} strokeOpacity=".2"/><circle cx="200" cy="225" r="143" stroke={ink} strokeOpacity=".2"/>
 <path d="M18 35H45M31 22V48M354 419H381M367 406V432" stroke={ink} strokeWidth="2"/>
 {event.iconType==='pacman'&&<g transform="translate(15,0) rotate(-18 200 225)"><path d="M183 229L311 151A147 147 0 1 0 311 307Z" fill={ink}/><path d="M163 207L291 129A147 147 0 1 0 291 285Z" fill={`url(#${id}-sphere)`} stroke={ink} strokeWidth="2"/><circle cx="165" cy="112" r="10" fill={ink}/><circle cx="294" cy="207" r="12" fill={ink}/><circle cx="340" cy="207" r="8" fill={ink}/></g>}
 {event.iconType==='ghost'&&<g transform="rotate(-8 200 225)"><path d="M84 338V180L106 180V139H132V115H265V139H291V180H313V354L277 328L240 356L202 328L164 356L126 328Z" fill={ink}/><path d="M65 316V159H87V119H113V95H246V119H272V159H294V330L258 304L221 333L183 304L145 333L107 304Z" fill={`url(#${id}-sphere)`} stroke={ink} strokeWidth="2"/><path d="M117 161H163V223H117ZM204 161H250V223H204Z" fill="#f5f1df"/><path d="M141 177H163V210H141ZM228 177H250V210H228Z" fill={ink}/></g>}
 {event.iconType==='joystick'&&<g transform="rotate(-12 200 225)"><path d="M60 271L241 234L347 279V323L165 366L60 320Z" fill={ink}/><path d="M60 271L241 234L347 279L165 320Z" fill="#36798e" stroke={ink} strokeWidth="3"/><path d="M166 293V153" stroke={ink} strokeWidth="23"/><path d="M159 287V147" stroke="#e5f4e9" strokeWidth="12"/><circle cx="163" cy="127" r="58" fill={`url(#${id}-sphere)`} stroke={ink} strokeWidth="2"/><ellipse cx="245" cy="271" rx="22" ry="15" fill="#f34d9c" stroke={ink} strokeWidth="2"/><ellipse cx="297" cy="286" rx="20" ry="14" fill="#eff295" stroke={ink} strokeWidth="2"/></g>}
 {event.iconType==='coin'&&<g transform="rotate(22 200 225)"><ellipse cx="219" cy="229" rx="127" ry="155" fill={ink}/><ellipse cx="194" cy="220" rx="127" ry="155" fill={`url(#${id}-metal)`} stroke={ink} strokeWidth="3"/><ellipse cx="194" cy="220" rx="103" ry="131" stroke={ink} strokeWidth="3"/><path d="M174 140H201V296M153 296H224" stroke={ink} strokeWidth="20" strokeLinecap="square"/><path d="M99 139L289 302M88 160L274 321" stroke="#fff9d9" strokeOpacity=".4" strokeWidth="2"/></g>}
 <path d="M28 386H106M28 394H70M302 66H372M335 74H372" stroke={ink} strokeOpacity=".5"/>
 </svg><span className="poster-index">{String(event.id+1).padStart(2,'0')}</span><span className="poster-caption">INSERT GOOD TIMES</span>
 </div>;
}
