import React, { useState } from 'react'
import '../au.form.scss'
import { useNavigate, Link } from 'react-router'
import { useauth } from "../hooks/useauth"
import { useEffect, useRef } from 'react'
import gsap from 'gsap'


const Login = () => {

    const { handleLogin } = useauth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setIsSubmitting(true)
        const data = await handleLogin({ email, password })
        setIsSubmitting(false)
        if (data) {
            navigate('/')
        } else {
            setError("Invalid email or password")
        }
    }


    // cursor component
    const cursorRef = useRef(null)

    useEffect(() => {
        const cursor = cursorRef.current

        const handleMouseMove = (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
                ease: 'power2.out'
            })

            //checks position of the mouse
            if (e.clientX < window.innerWidth / 2) {
                gsap.to(cursor, { background: '#fff', duration: 0.3 }) //on left (pur) side -> white cursor
            } else {
                gsap.to(cursor, { background: '#8b2252', duration: 0.3 }) //on reight (white) side -> purple cursor
            }
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])


    return (
        
        <main className="auth-page">
            <div className="auth-left">
                <div className="bubbles-container">
                    <div className="bubble bubble--1"></div>
                    <div className="bubble bubble--2"></div>
                    <div className="bubble bubble--3"></div>
                    <div className="bubble bubble--4"></div>
                    <div className="bubble bubble--5"></div>
                    <div className="bubble bubble--6"></div>
                    <div className="bubble bubble--7"></div>
                    <div className="bubble bubble--8"></div>
                </div>
                <div className="auth-left__content">
                    <div className="robot-wrapper">
                        <svg width="160" height="180" viewBox="0 0 100 110" className="robot-svg">
                            <rect x="30" y="8" width="40" height="32" rx="8" fill="#f0c4d4" stroke="#8b2252" strokeWidth="1.5"/>
                            <rect x="38" y="16" width="10" height="8" rx="3" fill="#8b2252" className="robot-eye"/>
                            <rect x="52" y="16" width="10" height="8" rx="3" fill="#8b2252" className="robot-eye"/>
                            <rect x="40" y="28" width="20" height="4" rx="2" fill="#8b2252" opacity="0.5"/>
                            <rect x="47" y="4" width="6" height="8" rx="3" fill="#8b2252"/>
                            <rect x="20" y="42" width="60" height="36" rx="8" fill="#f4b8cc" stroke="#8b2252" strokeWidth="1.5"/>
                            <rect x="28" y="50" width="18" height="3" rx="1.5" fill="#8b2252" opacity="0.4"/>
                            <rect x="28" y="57" width="12" height="3" rx="1.5" fill="#8b2252" opacity="0.3"/>
                            <rect x="54" y="48" width="16" height="18" rx="4" fill="#8b2252" opacity="0.15" stroke="#8b2252" strokeWidth="1"/>
                            <rect x="57" y="51" width="10" height="2" rx="1" fill="#8b2252" opacity="0.4"/>
                            <rect x="57" y="55" width="8" height="2" rx="1" fill="#8b2252" opacity="0.3"/>
                            <rect x="57" y="59" width="10" height="2" rx="1" fill="#8b2252" opacity="0.4"/>
                            <rect x="8" y="44" width="12" height="28" rx="6" fill="#f0c4d4" stroke="#8b2252" strokeWidth="1.5"/>
                            <rect x="80" y="44" width="12" height="28" rx="6" fill="#f0c4d4" stroke="#8b2252" strokeWidth="1.5"/>
                            <rect x="30" y="78" width="14" height="28" rx="6" fill="#f0c4d4" stroke="#8b2252" strokeWidth="1.5"/>
                            <rect x="56" y="78" width="14" height="28" rx="6" fill="#f0c4d4" stroke="#8b2252" strokeWidth="1.5"/>
                        </svg>
                    </div>
                    <h2 className="auth-left__title">Ace your next interview</h2>
                    <p className="auth-left__subtitle">AI-powered prep plans tailored just for you</p>
                    <div className="auth-left__stats">
                        <div className="stat-badge">
                            <span className="stat-badge__value">5+</span>
                            <span className="stat-badge__label">Questions</span>
                        </div>
                        <div className="stat-badge">
                            <span className="stat-badge__value">AI</span>
                            <span className="stat-badge__label">Powered</span>
                        </div>
                        <div className="stat-badge">
                            <span className="stat-badge__value">PDF</span>
                            <span className="stat-badge__label">Resume</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="auth-right">
                <div className="auth-right__inner">
                    <div className="auth-logo">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M12 2L15 8H21L16.5 12L18.5 18L12 14.5L5.5 18L7.5 12L3 8H9Z"/></svg>
                    </div>
                    <h1 className="auth-right__title">Welcome back</h1>
                    <p className="auth-right__subtitle">Login to your PrepBot account</p>

                    {error && <p className='error-message'>{error}</p>}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <div className="input-wrapper">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
                                <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" placeholder="Enter email address" />
                            </div>
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-wrapper">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" placeholder="Enter your password" />
                            </div>
                        </div>
                        <button className="auth-btn" disabled={isSubmitting}>
                            {isSubmitting ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <p className="auth-switch">Don't have an account? <Link to="/register">Register</Link></p>
                </div>
            </div>
            <div ref={cursorRef} className="custom-cursor"></div>
        </main>
    )
}

export default Login