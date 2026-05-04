import React, { useState } from 'react'
import '../auth.form.scss'
import { useNavigate, Link } from 'react-router'
import { useauth } from "../hooks/useauth"

const Login = () => {

    const { loading, handleLogin } = useauth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = await handleLogin({ email, password })
        if (data) {  
            navigate('/')
        }
    }

    if(loading){
        return (<main> <h1>Loading.....</h1></main>)
    }

    return (
        
        <main>
            <div className="form-container">
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="Email">Email</label>
                        <input 
                        onChange={(e)=>{setEmail(e.target.value)}}
                        type="email" id="email" name="email" placeholder='Enter email address' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="Password">Password</label>
                        <input 
                        onChange={(e)=>{setPassword(e.target.value)}}
                        type="password" id="password" name="password" placeholder='Enter your password' />
                    </div>

                    <button className='button button-primary'>Login</button>

                </form>
                
                <p>Don't have an accout? <Link to={"/register"}>Register</Link></p>
                
            </div>
        </main>
    )
}

export default Login