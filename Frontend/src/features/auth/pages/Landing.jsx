import React, { useEffect, useRef } from 'react'
import '../style/landing.scss'
import { useNavigate } from 'react-router'
import gsap from 'gsap'

const RobotSVG = () => (
    <svg width="260" height="300" viewBox="0 0 680 420" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.35"/>
                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="visor-glow" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.6"/>
            </radialGradient>
            <linearGradient id="body-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2d1558"/>
                <stop offset="100%" stopColor="#1a1035"/>
            </linearGradient>
            <linearGradient id="face-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b1f6e"/>
                <stop offset="100%" stopColor="#1e1245"/>
            </linearGradient>
            <clipPath id="visor-clip">
                <rect x="262" y="144" width="156" height="82" rx="18"/>
            </clipPath>
            <style>{`
                @keyframes robotFloat {
                    0%,100% { transform: translateY(0px); }
                    50% { transform: translateY(-14px); }
                }
                @keyframes robotBlink {
                    0%,92%,100% { transform: scaleY(1); }
                    96% { transform: scaleY(0.08); }
                }
                @keyframes robotPulse {
                    0%,100% { opacity: 0.5; }
                    50% { opacity: 1; }
                }
                @keyframes robotScan {
                    0% { transform: translateY(-22px); opacity: 0; }
                    20% { opacity: 0.8; }
                    80% { opacity: 0.8; }
                    100% { transform: translateY(22px); opacity: 0; }
                }
                @keyframes robotEarPulse {
                    0%,100% { opacity: 0.4; }
                    50% { opacity: 1; }
                }
                .robot-group { animation: robotFloat 3.5s ease-in-out infinite; transform-origin: 340px 280px; }
                .robot-eye-l { animation: robotBlink 5s ease-in-out infinite; transform-origin: 308px 196px; }
                .robot-eye-r { animation: robotBlink 5s ease-in-out infinite; transform-origin: 372px 196px; }
                .robot-dot-1 { animation: robotPulse 2s ease-in-out infinite; }
                .robot-dot-2 { animation: robotPulse 2s ease-in-out infinite 0.4s; }
                .robot-dot-3 { animation: robotPulse 2s ease-in-out infinite 0.8s; }
                .robot-scan { animation: robotScan 2.8s ease-in-out infinite; }
                .robot-ear-l { animation: robotEarPulse 2.2s ease-in-out infinite; }
                .robot-ear-r { animation: robotEarPulse 2.2s ease-in-out infinite 1.1s; }
            `}</style>
        </defs>

        <ellipse cx="340" cy="320" rx="180" ry="60" fill="url(#glow)"/>

        <g className="robot-group">
            <ellipse cx="340" cy="390" rx="90" ry="12" fill="#7c3aed" opacity="0.15"/>

            {/* Antenna */}
            <rect x="334" y="98" width="12" height="28" rx="4" fill="#4c1d95"/>
            <circle cx="340" cy="94" r="10" fill="#a78bfa"/>
            <circle cx="340" cy="94" r="6" fill="#c4b5fd"/>
            <circle className="robot-dot-1" cx="340" cy="94" r="6" fill="#fff" opacity="0.6"/>

            {/* Ears */}
            <rect x="218" y="168" width="22" height="36" rx="8" fill="#2d1558" stroke="#a78bfa" strokeWidth="1.5"/>
            <circle className="robot-ear-l" cx="229" cy="186" r="6" fill="#a78bfa"/>
            <rect x="440" y="168" width="22" height="36" rx="8" fill="#2d1558" stroke="#a78bfa" strokeWidth="1.5"/>
            <circle className="robot-ear-r" cx="451" cy="186" r="6" fill="#a78bfa"/>

            {/* Head */}
            <rect x="240" y="120" width="200" height="150" rx="32" fill="url(#body-grad)" stroke="#a78bfa" strokeWidth="1.5"/>

            {/* Visor */}
            <rect x="262" y="144" width="156" height="82" rx="18" fill="url(#face-grad)" stroke="#7c3aed" strokeWidth="1"/>
            <rect x="270" y="152" width="140" height="66" rx="12" fill="url(#visor-glow)" opacity="0.18"/>
            <rect className="robot-scan" x="270" y="185" width="140" height="2" rx="1" fill="#a78bfa" opacity="0.7" clipPath="url(#visor-clip)"/>

            {/* Eyes */}
            <g className="robot-eye-l">
                <rect x="288" y="176" width="40" height="40" rx="12" fill="#1a1035" stroke="#7c3aed" strokeWidth="1"/>
                <circle cx="308" cy="196" r="12" fill="#a78bfa" opacity="0.9"/>
                <circle cx="308" cy="196" r="7" fill="#c4b5fd"/>
                <circle cx="311" cy="193" r="3" fill="#fff"/>
            </g>
            <g className="robot-eye-r">
                <rect x="352" y="176" width="40" height="40" rx="12" fill="#1a1035" stroke="#7c3aed" strokeWidth="1"/>
                <circle cx="372" cy="196" r="12" fill="#a78bfa" opacity="0.9"/>
                <circle cx="372" cy="196" r="7" fill="#c4b5fd"/>
                <circle cx="375" cy="193" r="3" fill="#fff"/>
            </g>

            {/* Mouth */}
            <rect x="306" y="232" width="68" height="14" rx="7" fill="#1a1035" stroke="#7c3aed" strokeWidth="1"/>
            <circle className="robot-dot-1" cx="322" cy="239" r="4" fill="#34d399"/>
            <circle className="robot-dot-2" cx="340" cy="239" r="4" fill="#a78bfa"/>
            <circle className="robot-dot-3" cx="358" cy="239" r="4" fill="#34d399"/>

            {/* Neck */}
            <rect x="318" y="270" width="44" height="18" rx="6" fill="#2d1558" stroke="#7c3aed" strokeWidth="1"/>

            {/* Body */}
            <rect x="246" y="288" width="188" height="108" rx="24" fill="url(#body-grad)" stroke="#a78bfa" strokeWidth="1.5"/>
            <rect x="274" y="306" width="132" height="72" rx="14" fill="#1e1245" stroke="#7c3aed" strokeWidth="1"/>

            {/* Chest dots */}
            <circle className="robot-dot-1" cx="305" cy="330" r="8" fill="#7c3aed"/>
            <circle cx="305" cy="330" r="4" fill="#a78bfa"/>
            <circle className="robot-dot-2" cx="340" cy="330" r="8" fill="#7c3aed"/>
            <circle cx="340" cy="330" r="4" fill="#c4b5fd"/>
            <circle className="robot-dot-3" cx="375" cy="330" r="8" fill="#7c3aed"/>
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

const Landing = () => {
    const navigate = useNavigate()
    const cursorRef = useRef(null)
    const cursorRingRef = useRef(null)

    useEffect(() => {
        const cursor = cursorRef.current
        const ring = cursorRingRef.current
        const handleMouseMove = (e) => {
            gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' })
            gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.4, ease: 'power2.out' })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <div className="land">
            <div ref={cursorRef} className="custom-cursor"></div>
            <div ref={cursorRingRef} className="custom-cursor-ring"></div>

            {/* Navbar */}
            <nav className="land-nav">
                <div className="land-nav__logo">
                    <div className="land-nav__logo-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M12 2L15 8H21L16.5 12L18.5 18L12 14.5L5.5 18L7.5 12L3 8H9Z"/></svg>
                    </div>
                    PrepBot
                </div>
                <div className="land-nav__links">
                    <button onClick={() => navigate('/login')} className="land-nav__btn land-nav__btn--ghost">Login</button>
                    <button onClick={() => navigate('/register')} className="land-nav__btn land-nav__btn--fill">Get Started</button>
                </div>
            </nav>

            {/* Hero */}
            <section className="land-hero">
                <div className="land-bubbles">
                    <div className="land-bub land-bub--1"></div>
                    <div className="land-bub land-bub--2"></div>
                    <div className="land-bub land-bub--3"></div>
                    <div className="land-bub land-bub--4"></div>
                    <div className="land-bub land-bub--5"></div>
                    <div className="land-bub land-bub--6"></div>
                </div>

                <div className="land-hero__left">
                    <span className="land-hero__tag">✨ AI-Powered Interview Prep</span>
                    <h1 className="land-hero__title">Prepare smarter,<br /><span>interview better.</span></h1>
                    <p className="land-hero__sub">Upload your resume, paste the job description, and let PrepBot generate a personalized interview plan with questions, skill gaps, and a day-by-day roadmap.</p>
                    <div className="land-hero__btns">
                        <button onClick={() => navigate('/register')} className="land-btn-primary">Get Started Free →</button>
                        <div className="land-tooltip-wrapper">
                            <button className="land-btn-secondary">See How It Works</button>
                            <span className="land-tooltip">🚧 Coming soon!</span>
                        </div>
                    </div>
                    <div className="land-hero__stats">
                        <div className="land-hero__stat"><span className="land-hero__stat-val">AI</span><span className="land-hero__stat-label">Powered Analysis</span></div>
                        <div className="land-hero__stat"><span className="land-hero__stat-val">5+</span><span className="land-hero__stat-label">Questions Generated</span></div>
                        <div className="land-hero__stat"><span className="land-hero__stat-val">PDF</span><span className="land-hero__stat-label">Resume Download</span></div>
                    </div>
                </div>

                <div className="land-hero__right">
                    <div className="land-hero__circle"></div>
                    <div className="land-hero__card">
                        <div className="land-hero__card-header">
                            <div className="land-hero__card-avatar">
                                <RobotSVG />
                            </div>
                            <div>
                                <div className="land-hero__card-name">Interview Report</div>
                                <div className="land-hero__card-role">Backend Developer Role</div>
                            </div>
                        </div>
                        <div className="land-hero__card-score">
                            <span className="land-hero__card-score-label">Match Score</span>
                            <span className="land-hero__card-score-val">85%</span>
                        </div>
                        <div className="land-hero__card-tags">
                            <div className="land-hero__card-tags-label">Skill Gaps</div>
                            <span className="land-tag land-tag--high">Docker</span>
                            <span className="land-tag land-tag--med">TypeScript</span>
                            <span className="land-tag land-tag--low">REST APIs</span>
                        </div>
                        <div className="land-hero__card-footer">
                            5 Technical · 5 Behavioral Questions
                        </div>

                        {/* floating robot bottom right */}
                        <div className="land-hero__card-robot">
                            <RobotSVG />
                        </div>

                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="land-features">
                <h2 className="land-section-title">Everything you need to <span>ace it</span></h2>
                <p className="land-section-sub">One tool. Complete interview preparation.</p>
                <div className="land-features__grid">
                    {[
                        { icon: <path d="M21 21l-4.35-4.35M11 19A8 8 0 1 0 11 3a8 8 0 0 0 0 16z"/>, title: "Smart Analysis", desc: "AI analyzes your resume against the job description to find gaps and strengths." },
                        { icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>, title: "Interview Questions", desc: "Get tailored technical and behavioral questions with model answers and intentions." },
                        { icon: <polygon points="3 11 22 2 13 21 11 13 3 11"/>, title: "Prep Roadmap", desc: "Day-by-day preparation plan so you always know what to study next." },
                        { icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></>, title: "Resume Download", desc: "Download a tailored resume built from your profile and job requirements." },
                        { icon: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>, title: "Match Score", desc: "See exactly how well your profile matches the job before you apply." },
                        { icon: <><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>, title: "Report History", desc: "Access all your past interview plans anytime from your dashboard." },
                    ].map((f, i) => (
                        <div key={i} className="land-feature-card">
                            <div className="land-feature-card__icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">{f.icon}</svg>
                            </div>
                            <div className="land-feature-card__title">{f.title}</div>
                            <p className="land-feature-card__desc">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How it works */}
            <section className="land-steps">
                <h2 className="land-section-title">How it <span>works</span></h2>
                <p className="land-section-sub">Three simple steps to be interview-ready</p>
                <div className="land-steps__row">
                    <div className="land-step">
                        <div className="land-step__num">1</div>
                        <div className="land-step__title">Upload & Describe</div>
                        <p className="land-step__desc">Upload your resume PDF and paste the job description you're targeting.</p>
                    </div>
                    <div className="land-steps__arrow">→</div>
                    <div className="land-step">
                        <div className="land-step__num">2</div>
                        <div className="land-step__title">AI Analyzes</div>
                        <p className="land-step__desc">Our AI generates your match score, questions, skill gaps, and prep plan.</p>
                    </div>
                    <div className="land-steps__arrow">→</div>
                    <div className="land-step">
                        <div className="land-step__num">3</div>
                        <div className="land-step__title">Prepare & Ace</div>
                        <p className="land-step__desc">Follow your personalized roadmap and walk into the interview confident.</p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="land-cta">
                <h2 className="land-cta__title">Ready to ace your next interview?</h2>
                <p className="land-cta__sub">Join PrepBot and start preparing smarter today — it's completely free.</p>
                <button onClick={() => navigate('/register')} className="land-cta__btn">Get Started Free →</button>
            </section>

            {/* Footer */}
            <footer className="land-footer">
                <div className="land-footer__logo">⭐ PrepBot</div>
                <div className="land-footer__links">
                    <a className="land-footer__link" href="#">Privacy Policy</a>
                    <a className="land-footer__link" href="#">Terms of Service</a>
                    <a className="land-footer__link" href="#">GitHub</a>
                </div>
            </footer>
        </div>
    )
}

export default Landing