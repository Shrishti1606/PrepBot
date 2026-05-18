import React, { useState, useEffect } from 'react'
import '../style/interview.scss'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate, useParams } from 'react-router'
import { useauth } from '../../auth/hooks/useauth'

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>) },
    { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>) },
    { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>) },
]

const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false)
    return (
        <div className='q-card'>
            <div className='q-card__header' onClick={() => setOpen(o => !o)}>
                <span className='q-card__index'>Q{index + 1}</span>
                <p className='q-card__question'>{item.question}</p>
                <span className={`q-card__chevron ${open ? 'q-card__chevron--open' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                </span>
            </div>
            {open && (
                <div className='q-card__body'>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--intention'>Intention</span>
                        <p>{item.intention}</p>
                    </div>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--answer'>Model Answer</span>
                        <p>{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className='roadmap-day'>
        <div className='roadmap-day__header'>
            <span className='roadmap-day__badge'>Day {day.day}</span>
            <h3 className='roadmap-day__focus'>{day.focus}</h3>
        </div>
        <ul className='roadmap-day__tasks'>
            {day.tasks.map((task, i) => (
                <li key={i}><span className='roadmap-day__bullet'/>{task}</li>
            ))}
        </ul>
    </div>
)

const Interview = () => {
    const [activeNav, setActiveNav] = useState('technical')
    const { report, getReportById, loading, getResumePdf } = useInterview()
    const { user } = useauth()
    const { interviewId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (interviewId) getReportById(interviewId)
    }, [interviewId])

    if (loading || !report) {
        return (
            <main className='loading-screen'>
                <div className='loader'>
                    <div className='loader__ring'></div>
                    <div className='loader__ring'></div>
                    <div className='loader__ring'></div>
                    <p className='loader__text'>Preparing your interview plan...</p>
                </div>
            </main>
        )
    }

    const sparkles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 8}s`,
        duration: `${4 + Math.random() * 6}s`,
        size: `${1 + Math.random() * 2}px`,
        opacity: 0.4 + Math.random() * 0.6,
    }))

    const scoreColor = report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'

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

            {/* ── Left Sidebar ── */}
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
                        <div className='dashboard-sidebar__nav-label'>Sections</div>
                        {NAV_ITEMS.map(item => (
                            <button
                                key={item.id}
                                className={`dashboard-sidebar__nav-item ${activeNav === item.id ? 'dashboard-sidebar__nav-item--active' : ''}`}
                                onClick={() => setActiveNav(item.id)}
                            >
                                <span>{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* ✅ Bottom buttons */}
                <div className='dashboard-sidebar__bottom'>
                    <div className='dashboard-sidebar__divider'/>
                    <button onClick={() => getResumePdf(interviewId)} className='dashboard-sidebar__download'>
                        <svg height="0.8rem" style={{ marginRight: "0.5rem" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"/></svg>
                        Download Resume
                    </button>
                    <div className='download-note'>
                        <p>⚠️ Resume takes ~30s to generate</p>
                        <p>📝 AI-tailored but may need manual edits</p>
                    </div>
                    <button onClick={() => navigate('/home')} className='dashboard-sidebar__nav-item'>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        Back to Home
                    </button>
                </div>
            </aside>

            {/* ── Main Content ── */}
            <div className='interview-main'>

                {/* Header */}
                <div className='interview-header'>
                    <div>
                        <h1 className='interview-header__title'>{report.title}</h1>
                        <p className='interview-header__sub'>Your personalized interview preparation plan</p>
                    </div>
                </div>

                {/* Body */}
                <div className='interview-body'>

                    {/* Center Content */}
                    <main className='interview-content'>
                        {activeNav === 'technical' && (
                            <section>
                                <div className='content-header'>
                                    <h2>Technical Questions</h2>
                                    <span className='content-header__count'>{report.technicalQuestions.length} questions</span>
                                </div>
                                <div className='q-list'>
                                    {report.technicalQuestions.map((q, i) => <QuestionCard key={i} item={q} index={i}/>)}
                                </div>
                            </section>
                        )}
                        {activeNav === 'behavioral' && (
                            <section>
                                <div className='content-header'>
                                    <h2>Behavioral Questions</h2>
                                    <span className='content-header__count'>{report.behavioralQuestions.length} questions</span>
                                </div>
                                <div className='q-list'>
                                    {report.behavioralQuestions.map((q, i) => <QuestionCard key={i} item={q} index={i}/>)}
                                </div>
                            </section>
                        )}
                        {activeNav === 'roadmap' && (
                            <section>
                                <div className='content-header'>
                                    <h2>Preparation Road Map</h2>
                                    <span className='content-header__count'>{report.preparationPlan.length}-day plan</span>
                                </div>
                                <div className='roadmap-list'>
                                    {report.preparationPlan.map((day) => <RoadMapDay key={day.day} day={day}/>)}
                                </div>
                            </section>
                        )}
                    </main>

                    {/* ── Right Sidebar ── */}
                    <aside className='interview-sidebar'>

                        {/* ✅ New match score card */}
                        <div className='match-score-card'>
                            <span className='match-score-card__label'>Match Score</span>
                            <div className={`match-score__ring ${scoreColor}`}>
                                <span className='match-score__value'>{report.matchScore}</span>
                                <span className='match-score__pct'>%</span>
                            </div>
                            <span className='match-score-card__sub'>
                                {report.matchScore >= 80 ? 'Strong match!' : report.matchScore >= 60 ? 'Good match' : 'Needs work'}
                            </span>
                        </div>

                        <div className='sidebar-divider'/>

                        {/* Skill Gaps */}
                        <div className='skill-gaps'>
                            <p className='skill-gaps__label'>Skill Gaps</p>
                            <div className='skill-gaps__list'>
                                {report.skillGaps?.filter(Boolean).map((gap, i) => (
                                    <span key={i} className={`skill-tag skill-tag--${gap.severity}`}>{gap.skill}</span>
                                ))}
                            </div>
                        </div>

                    </aside>
                </div>
            </div>
        </div>
    )
}

export default Interview