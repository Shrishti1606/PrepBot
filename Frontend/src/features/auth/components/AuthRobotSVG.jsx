const AuthRobotSVG = () => (
    <svg width="380" height="300" viewBox="0 0 680 420" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="auth-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.35"/>
                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="auth-visor-glow" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.6"/>
            </radialGradient>
            <linearGradient id="auth-body-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2d1558"/>
                <stop offset="100%" stopColor="#1a1035"/>
            </linearGradient>
            <linearGradient id="auth-face-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b1f6e"/>
                <stop offset="100%" stopColor="#1e1245"/>
            </linearGradient>
            <clipPath id="auth-visor-clip">
                <rect x="262" y="144" width="156" height="82" rx="18"/>
            </clipPath>
        </defs>

        <ellipse cx="340" cy="320" rx="180" ry="60" fill="url(#auth-glow)"/>

        <g className="robot-group-auth">
            <ellipse cx="340" cy="390" rx="90" ry="12" fill="#7c3aed" opacity="0.15"/>

            {/* Antenna */}
            <rect x="334" y="98" width="12" height="28" rx="4" fill="#4c1d95"/>
            <circle cx="340" cy="94" r="10" fill="#a78bfa"/>
            <circle cx="340" cy="94" r="6" fill="#c4b5fd"/>
            <circle className="robot-dot-1-auth" cx="340" cy="94" r="6" fill="#fff" opacity="0.6"/>

            {/* Ears */}
            <rect x="218" y="168" width="22" height="36" rx="8" fill="#2d1558" stroke="#a78bfa" strokeWidth="1.5"/>
            <circle className="robot-ear-l-auth" cx="229" cy="186" r="6" fill="#a78bfa"/>
            <rect x="440" y="168" width="22" height="36" rx="8" fill="#2d1558" stroke="#a78bfa" strokeWidth="1.5"/>
            <circle className="robot-ear-r-auth" cx="451" cy="186" r="6" fill="#a78bfa"/>

            {/* Head */}
            <rect x="240" y="120" width="200" height="150" rx="32" fill="url(#auth-body-grad)" stroke="#a78bfa" strokeWidth="1.5"/>

            {/* Visor */}
            <rect x="262" y="144" width="156" height="82" rx="18" fill="url(#auth-face-grad)" stroke="#7c3aed" strokeWidth="1"/>
            <rect x="270" y="152" width="140" height="66" rx="12" fill="url(#auth-visor-glow)" opacity="0.18"/>
            <rect className="robot-scan-auth" x="270" y="185" width="140" height="2" rx="1" fill="#a78bfa" opacity="0.7" clipPath="url(#auth-visor-clip)"/>

            {/* Eyes */}
            <g className="robot-eye-l-auth">
                <rect x="288" y="176" width="40" height="40" rx="12" fill="#1a1035" stroke="#7c3aed" strokeWidth="1"/>
                <circle cx="308" cy="196" r="12" fill="#a78bfa" opacity="0.9"/>
                <circle cx="308" cy="196" r="7" fill="#c4b5fd"/>
                <circle cx="311" cy="193" r="3" fill="#fff"/>
            </g>
            <g className="robot-eye-r-auth">
                <rect x="352" y="176" width="40" height="40" rx="12" fill="#1a1035" stroke="#7c3aed" strokeWidth="1"/>
                <circle cx="372" cy="196" r="12" fill="#a78bfa" opacity="0.9"/>
                <circle cx="372" cy="196" r="7" fill="#c4b5fd"/>
                <circle cx="375" cy="193" r="3" fill="#fff"/>
            </g>

            {/* Mouth */}
            <rect x="306" y="232" width="68" height="14" rx="7" fill="#1a1035" stroke="#7c3aed" strokeWidth="1"/>
            <circle className="robot-dot-1-auth" cx="322" cy="239" r="4" fill="#34d399"/>
            <circle className="robot-dot-2-auth" cx="340" cy="239" r="4" fill="#a78bfa"/>
            <circle className="robot-dot-3-auth" cx="358" cy="239" r="4" fill="#34d399"/>

            {/* Neck */}
            <rect x="318" y="270" width="44" height="18" rx="6" fill="#2d1558" stroke="#7c3aed" strokeWidth="1"/>

            {/* Body */}
            <rect x="246" y="288" width="188" height="108" rx="24" fill="url(#auth-body-grad)" stroke="#a78bfa" strokeWidth="1.5"/>
            <rect x="274" y="306" width="132" height="72" rx="14" fill="#1e1245" stroke="#7c3aed" strokeWidth="1"/>

            {/* Chest dots */}
            <circle className="robot-dot-1-auth" cx="305" cy="330" r="8" fill="#7c3aed"/>
            <circle cx="305" cy="330" r="4" fill="#a78bfa"/>
            <circle className="robot-dot-2-auth" cx="340" cy="330" r="8" fill="#7c3aed"/>
            <circle cx="340" cy="330" r="4" fill="#c4b5fd"/>
            <circle className="robot-dot-3-auth" cx="375" cy="330" r="8" fill="#7c3aed"/>
            <circle cx="375" cy="330" r="4" fill="#a78bfa"/>

            {/* Chest bar */}
            <rect x="290" y="352" width="100" height="8" rx="4" fill="#2d1558"/>
            <rect x="290" y="352" width="62" height="8" rx="4" fill="#a78bfa" opacity="0.7"/>

            {/* Arms */}
            <rect x="208" y="296" width="38" height="80" rx="16" fill="#2d1558" stroke="#a78bfa" strokeWidth="1.5"/>
            <rect x="214" y="368" width="26" height="18" rx="8" fill="#1a1035" stroke="#7c3aed" strokeWidth="1"/>
            <rect x="434" y="296" width="38" height="80" rx="16" fill="#2d1558" stroke="#a78bfa" strokeWidth="1.5"/>
            <rect x="440" y="368" width="26" height="18" rx="8" fill="#1a1035" stroke="#7c3aed" strokeWidth="1"/>

            {/* Legs */}
            <rect x="282" y="390" width="48" height="28" rx="10" fill="#2d1558" stroke="#a78bfa" strokeWidth="1.5"/>
            <rect x="350" y="390" width="48" height="28" rx="10" fill="#2d1558" stroke="#a78bfa" strokeWidth="1.5"/>
        </g>
    </svg>
)

export default AuthRobotSVG