import React, { useState, useRef } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import { useauth } from '../../auth/hooks/useauth'

const Home = () => {
    const { loading, generateReport, reports } = useInterview()
    const { user, handleLogout } = useauth()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const [jobDescLength, setJobDescLength] = useState(0)
    const [resumeFile, setResumeFile] = useState(null)
    const resumeInputRef = useRef()
    const navigate = useNavigate()

    const onLogout = async () => {
        await handleLogout()
        navigate("/login")
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) setResumeFile(file)
    }

    const handleGenerateReport = async () => {
        try {
            const data = await generateReport({ jobDescription, selfDescription, resumeFile })
            if (!data?._id) { alert("Report generation failed"); return }
            navigate(`/interview/${data._id}`)
        } catch (error) {
            console.error("Generate Report Error:", error)
        }
    }

    const sparkles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 8}s`,
        duration: `${4 + Math.random() * 6}s`,
        size: `${1 + Math.random() * 2}px`,
        opacity: 0.4 + Math.random() * 0.6,
    }))

    return (
        <div className='dashboard'>

            <div className='sparkle-container'>
                {sparkles.map(s => (
                    <div key={s.id} className='sparkle' style={{
                        left: s.left,
                        width: s.size,
                        height: s.size,
                        animationDelay: s.delay,
                        animationDuration: s.duration,
                        opacity: s.opacity,
                    }} />
                ))}
            </div>

            <aside className='dashboard-sidebar'>
                <div className='dashboard-sidebar__top'>
                    <div className='dashboard-sidebar__logo'>
                        <div className='dashboard-sidebar__logo-icon'>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M12 2L15 8H21L16.5 12L18.5 18L12 14.5L5.5 18L7.5 12L3 8H9Z"/></svg>
                        </div>
                        <span>PrepBot</span>
                    </div>

                    <div className='dashboard-sidebar__user'>
                        <div className='dashboard-sidebar__avatar'>
                            {user?.username?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <div className='dashboard-sidebar__username'>{user?.username}</div>
                            <div className='dashboard-sidebar__role'>Candidate</div>
                        </div>
                    </div>

                    <nav className='dashboard-sidebar__nav'>
                        <div className='dashboard-sidebar__nav-label'>Menu</div>
                        <button className='dashboard-sidebar__nav-item dashboard-sidebar__nav-item--active'>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                            Dashboard
                        </button>
                        <button className='dashboard-sidebar__nav-item'>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                            New Report
                        </button>
                        <button className='dashboard-sidebar__nav-item'>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                            Profile
                        </button>
                    </nav>
                </div>

                <button className='dashboard-sidebar__logout' onClick={onLogout}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    Log out
                </button>
            </aside>

            <div className='dashboard-main'>

                <div className='dashboard-header'>
                    <h1 className='dashboard-header__title'>Hello, {user?.username}! ✨</h1>
                    <p className='dashboard-header__sub'>Generate your personalized interview plan with AI</p>
                </div>

                <div className='dashboard-grid' style={{ alignItems: 'stretch' }}>

                    {/* LEFT — Job Description stretches full height */}
                    <div className='dash-card dash-card--left'>
                        <div className='dash-card__header'>
                            <div className='dash-card__icon'>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                            </div>
                            <span className='dash-card__title'>Target Job Description</span>
                            <span className='dash-card__badge'>Required</span>
                        </div>
                        <textarea
                            onChange={(e) => { setJobDescription(e.target.value); setJobDescLength(e.target.value.length) }}
                            className='dash-textarea'
                            placeholder="Paste the full job description here..."
                            maxLength={5000}
                        />
                        <div className='char-counter'>{jobDescLength} / 5000 chars</div>
                    </div>

                    {/* RIGHT — stacked column */}
                    <div className='dashboard-right-col'>

                        {/* Upload Resume */}
                        <div className='dash-card'>
                            <div className='dash-card__header'>
                                <div className='dash-card__icon'>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                                </div>
                                <span className='dash-card__title'>Upload Resume</span>
                                <span className='dash-card__badge'>Best Results</span>
                            </div>
                            <label className={`dropzone ${resumeFile ? 'dropzone--attached' : ''}`} htmlFor='resume'>
                                {resumeFile ? (
                                    <>
                                        <span className='dropzone__icon' style={{ color: '#34d399' }}>
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                                        </span>
                                        <p className='dropzone__title' style={{ color: '#34d399' }}>✅ {resumeFile.name}</p>
                                        <p className='dropzone__subtitle'>{(resumeFile.size / 1024).toFixed(1)} KB — Click to change</p>
                                    </>
                                ) : (
                                    <>
                                        <span className='dropzone__icon'>
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>
                                        </span>
                                        <p className='dropzone__title'>Click to upload or drag & drop</p>
                                        <p className='dropzone__subtitle'>PDF or DOCX (Max 5MB)</p>
                                    </>
                                )}
                                <input ref={resumeInputRef} hidden type='file' id='resume' name='resume' accept='.pdf,.docx' onChange={handleFileChange}/>
                            </label>
                        </div>

                        {/* Self Description */}
                        <div className='dash-card'>
                            <div className='dash-card__header'>
                                <div className='dash-card__icon'>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                </div>
                                <span className='dash-card__title'>Quick Self-Description</span>
                                <span className='dash-card__badge'>Optional</span>
                            </div>
                            <textarea
                                onChange={(e) => setSelfDescription(e.target.value)}
                                className='dash-textarea dash-textarea--short'
                                placeholder="Briefly describe your experience, key skills, and years of experience..."
                            />
                            <div className='info-box'>
                                <span className='info-box__icon'>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#a78bfa"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12" stroke="#1a1035" strokeWidth="2"/><line x1="12" y1="16" x2="12.01" y2="16" stroke="#1a1035" strokeWidth="2"/></svg>
                                </span>
                                <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required.</p>
                            </div>
                        </div>

                        {/* Generate button — sits at bottom of right column */}
                        <div className='dash-generate-row'>
                            <span className='footer-info'>AI-Powered Strategy Generation • Approx 30s</span>
                            <button onClick={handleGenerateReport} className='generate-btn' disabled={loading}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                                {loading ? 'Generating...' : 'Generate My Interview Strategy'}
                            </button>
                        </div>

                    </div>
                </div>

                {/* Recent Plans — full width below */}
                {reports.length > 0 && (
                    <div className='dashboard-plans'>
                        <div className='dash-card'>
                            <div className='dash-card__header'>
                                <div className='dash-card__icon'>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
                                </div>
                                <span className='dash-card__title'>Recent Plans</span>
                            </div>
                            <div className='reports-grid'>
                                {reports.map(report => (
                                    <div key={report._id} className='report-item' onClick={() => navigate(`/interview/${report._id}`)}>
                                        <h3>{report.title || 'Untitled Position'}</h3>
                                        <p className='report-meta'>{new Date(report.createdAt).toLocaleDateString()}</p>
                                        <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>
                                            Match Score: {report.matchScore}%
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <footer className='page-footer'>
                    <a href='#'>Privacy Policy</a>
                    <a href='#'>Terms of Service</a>
                    <a href='#'>Help Center</a>
                </footer>

            </div>
        </div>
    )
}

export default Home