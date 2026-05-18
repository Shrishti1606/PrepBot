import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useauth } from "../hooks/useauth"
import '../auth.form.scss'
import { useEffect, useRef } from 'react'
import AuthRobotSVG from '../components/AuthRobotSVG'
import gsap from 'gsap'

const Register = () => {

    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { handleRegister } = useauth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        const data = await handleRegister({ username, email, password })
        setIsSubmitting(false)
        if (data) {
            navigate('/home')
        } else {
            alert("Account already exists with this username or email")
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
                gsap.to(cursor, { background: '#20153d', duration: 0.3 }) // left side → purple
            } else {
                gsap.to(cursor, { background: '#c4b5fd', duration: 0.3 }) // right side → light purple
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
                        <AuthRobotSVG />
                    </div>
                    <h2 className="auth-left__title">Start your journey</h2>
                    <p className="auth-left__subtitle">Join thousands preparing smarter with AI</p>
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
                    <h1 className="auth-right__title">Create account</h1>
                    <p className="auth-right__subtitle">Sign up to get started with PrepBot</p>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <div className="input-wrapper">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                                <input onChange={(e) => setUsername(e.target.value)} type="text" id="username" name="username" placeholder="Enter username" />
                            </div>
                        </div>
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
                            {isSubmitting ? "Registering..." : "Register"}
                        </button>
                    </form>

                    <p className="auth-switch">Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
            <div ref={cursorRef} className="custom-cursor"></div>
        </main>
    )
}

export default Register