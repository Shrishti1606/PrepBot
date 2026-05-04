import axios from "axios";


const api = axios.create({
    baseURL: ("http://localhost:3000"),
    withCredentials: true,
})

//Service to generate interview report based on user self description, resume and job description.
export const generateInterviewReport = async ({ jobDescription, selfDescription, resumeFile }) => {

    const formData = new FormData()
    formData.append("jobDescription", jobDescription)
    formData.append("selfDescription", selfDescription)
    formData.append("resume", resumeFile)

    const response = await api.post("/api/interview/", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    return response.data

}


//Service to get interview report by interviewId.
export const getInterviewReportById = async (interviewId) => {
    const response = await api.get(`/api/interview/report/${interviewId}`)

    return response.data
}


//Service to get all interview reports of logged in user.
export const getAllInterviewReports = async () => {
    const response = await api.get("/api/interview/")

    return response.data
}

export const downloadResumePdf = async (interviewId) => {
    const response = await api.get(`/api/interview/resume/${interviewId}`, {
        responseType: 'blob'
    })
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'resume.pdf')
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
}


