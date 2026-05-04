import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { InterviewContext } from "../../interview/interview.context";
import { login, register, logout, getMe } from "../services/auth.api";

export const useauth = () => {

    const context = useContext(AuthContext)
    const interviewContext = useContext(InterviewContext) 
    const { user, setUser, loading, setLoading } = context;
    const { setReports, setReport } = interviewContext 


    const handleLogin = async ({ email, password }) => {

        setLoading(true)

        try{
            const data = await login({ email, password })
            console.log("Login response:", data)
            setUser(data.user)
            return data;
        } catch(err) {
            console.log("Login error:", err)
            return null
        } finally {
            setLoading(false)
        }

    }

    const handleRegister = async ({ username, email, password }) => {

        setLoading(true)

        try{
            const data = await register({ username, email, password })
            if (data) {
                setUser(data.user)
                return data  
            } 
        } catch(err) {
            throw err 
        } finally {
            setLoading(false)
        }

    }

    const handleLogout = async () => {

        setLoading(true)

        try{
            const data = await logout()
            setUser(null)
            setReports([])   
            setReport(null) 
        } catch(err) {

        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {

        const getAndSetUser = async () => {
            try{
                const data = await getMe()
                setUser(data?.user || null)
            } catch(err){
                return null
            } finally{
                setLoading(false)
            }
        }
        getAndSetUser()
    }, [])

    return { user, loading, handleLogin, handleRegister, handleLogout }

}