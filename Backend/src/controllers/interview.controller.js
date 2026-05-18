const pdfParse = require("pdf-parse-new")
const {generateInterviewReport} = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model")
const puppeteer = require('puppeteer-core')
const chromium = require('@sparticuz/chromium')
const Groq = require('groq-sdk')

const groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY })

const generateInterviewReportController = async (req, res) => {

    console.log("File received:", req.file)  // 👈 add this
    console.log("Body received:", req.body)
    const { selfDescription, jobDescription } = req.body  

    if (!req.file && !selfDescription) {
        return res.status(400).json({
            message: "Provide either resume or self description"
        })
    }

    try {
        // ✅ Only parse PDF if file was uploaded
        let resumeText = ""
        if (req.file) {
            const resumeContent = await pdfParse(req.file.buffer)
            resumeText = resumeContent.text
        }

        const interViewReportByAi = await generateInterviewReport({
            resume: resumeText,
            selfDescription,
            jobDescription
        })

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resumeText: resumeText,
            selfDescription,
            jobDescription,
            ...interViewReportByAi
        })

        res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport  // ✅ frontend expects this
        })

    } catch (error) {
        console.error("Controller error:", error.message)
        res.status(500).json({ message: "Internal server error" })
    }

}

const getInterviewReportByIdController = async (req, res) => {

    const { interviewId } = req.params

    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport
    })
}

//Controller to get all interview reports of logged in user.
const getAllInterviewReportsController = async (req, res) => {

    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })

}

const downloadResumeController = async (req, res) => {

    const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
    })

    const { interviewId } = req.params

    const report = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

    if (!report) {
        return res.status(404).json({ message: "Report not found" })
    }

    const prompt = `
        You are a professional resume writer. Create a polished ATS-friendly resume in HTML using EXACTLY these CSS classes.

        CANDIDATE INFORMATION:
        Resume: ${report.resumeText || 'Not provided'}
        Self Description: ${report.selfDescription || 'Not provided'}
        Job applying for: ${report.title}
        Job Description: ${report.jobDescription}

        Use EXACTLY this HTML structure:

        <div class="header">
            <h1>[Candidate Name]</h1>
            <div class="contact">
                <span>[Location]</span>
                <span>[Phone]</span>
                <span>[Email]</span>
                <span>[LinkedIn]</span>
                <span>[GitHub]</span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Summary</div>
            <p>[2-3 sentence professional summary tailored to job]</p>
        </div>

        <div class="section">
            <div class="section-title">Technical Skills</div>
            <div class="skills-grid">
                <span class="skill-item">[skill]</span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Experience</div>
            <div class="entry">
                <div class="entry-header">
                    <div>
                        <div class="entry-title">[Job Title]</div>
                        <div class="entry-company">[Company]</div>
                    </div>
                    <div class="entry-date">[Date Range]</div>
                </div>
                <ul><li>[achievement]</li></ul>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Projects</div>
            <div class="entry">
                <div class="entry-header">
                    <div class="entry-title">[Project Name] | [Tech Stack]</div>
                    <div class="entry-date">[Date]</div>
                </div>
                <ul><li>[description]</li></ul>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Education</div>
            <div class="edu-header">
                <div>
                    <div class="edu-degree">[Degree]</div>
                    <div class="edu-school">[University, Location]</div>
                </div>
                <div class="entry-date">[Year Range]</div>
            </div>
        </div>

        Rules:
        - Extract ALL real details from the candidate's resume
        - Tailor summary and skills to match the job description
        - Make LinkedIn and GitHub clickable using <a href="[url]" style="color: #6c63ff; text-decoration: none;">[url]</a>
        - If no date is available, leave the date field completely empty — never write "No specific date" or similar
        - Return ONLY the HTML body content, no markdown, no backticks
    `

    const response = await groqClient.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }]
    })

    const resumeBody = response.choices[0].message.content

    const html = `
        <html>
        <head>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: 'Arial', sans-serif; padding: 50px; color: #1a1a1a; font-size: 13px; line-height: 1.5; }
                
                /* Header */
                .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #2d2d2d; padding-bottom: 15px; }
                .header h1 { font-size: 28px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #1a1a1a; }
                .header .contact { font-size: 12px; color: #444; margin-top: 6px; display: flex; justify-content: center; flex-wrap: wrap; gap: 8px; }
                .header .contact span { display: flex; align-items: center; gap: 4px; }
                .header .contact span::before { content: '•'; color: #6c63ff; }
                .header .contact span:first-child::before { display: none; }

                /* Section */
                .section { margin-bottom: 18px; }
                .section-title { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; color: #6c63ff; border-bottom: 1px solid #6c63ff; padding-bottom: 3px; margin-bottom: 10px; }

                /* Experience & Projects */
                .entry { margin-bottom: 12px; }
                .entry-header { display: flex; justify-content: space-between; align-items: flex-start; }
                .entry-title { font-weight: 700; font-size: 13px; color: #1a1a1a; }
                .entry-company { font-size: 12px; color: #555; font-style: italic; }
                .entry-date { font-size: 11px; color: #777; white-space: nowrap; }
                ul { padding-left: 16px; margin-top: 5px; }
                li { margin-bottom: 3px; font-size: 12.5px; color: #333; }

                /* Skills */
                .skills-grid { display: flex; flex-wrap: wrap; gap: 6px; }
                .skill-item { background: #f3f0ff; color: #6c63ff; padding: 3px 10px; border-radius: 3px; font-size: 11.5px; font-weight: 500; border: 1px solid #d4ceff; }

                /* Education */
                .edu-header { display: flex; justify-content: space-between; }
                .edu-degree { font-weight: 700; }
                .edu-school { color: #555; font-size: 12px; }
            </style>
        </head>
        <body>
            ${resumeBody}
        </body>
        </html>
        `

    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'networkidle0' })
    const pdf = await page.pdf({ 
        format: 'A4', 
        margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' } 
    })
    await browser.close()

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="resume.pdf"`)
    res.send(pdf)

    
}

module.exports = { generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportsController, downloadResumeController }