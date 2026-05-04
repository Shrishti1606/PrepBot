const Groq = require("groq-sdk")

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = `
        Analyze the following resume and job description and generate a structured interview report.
        
        Resume: ${resume}
        Self Description: ${selfDescription}
        Job Description: ${jobDescription}

        Rules:
        - Every field must be filled.
        - matchScore must be calculated based on how well the candidate matches the job description.
        - Generate at least 5 technical questions and 5 behavioral questions.
        - Generate at least 4 skill gaps.
        - Generate a 7 day preparation plan.
        - The "answer" field must contain a clear interview-ready answer (3-5 sentences).

        Return ONLY a valid JSON object with this structure, no markdown, no backticks:
        {
            "title": "actual job title from job description",
            "matchScore": <calculated 0-100>,
            "technicalQuestions": [{"question":"...","intention":"...","answer":"..."}],
            "behavioralQuestions": [{"question":"...","intention":"...","answer":"..."}],
            "skillGaps": [{"skill":"...","severity":"low|medium|high"}],
            "preparationPlan": [{"day":1,"focus":"...","tasks":["..."]}]
        }
    `

    try {
        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" }
        })

        const text = response.choices[0].message.content
        return JSON.parse(text)

    } catch (error) {
        console.error("AI Service Error:", error.message)
        throw error
    }
}

module.exports = { generateInterviewReport }

