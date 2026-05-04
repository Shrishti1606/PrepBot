import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useauth } from "../hooks/useauth"

const Register = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const { loading, handleRegister } = useauth();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        const data = await handleRegister({ username, email, password })
        console.log("Register data:", data)
        if (data) {  
            navigate('/')
        } else {
            setError("Account already exists with this username or email")  // ✅ show error
        }
    }

    if(loading){
        return (<main> <h1>Loading.....</h1></main>)
    }

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>

                {error && <p className='error-message'>{error}</p>}

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="Username">username</label>
                        <input 
                        onChange={(e)=>{setUsername(e.target.value)}}
                        type="text" id="username" name="username" placeholder='Enter username' />
                    </div>
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

                    <button className='button button-primary'>Register</button>

                </form>

                <p>Already have an account? <Link to={"/login"}>Login</Link></p>

            </div>
        </main>
    )
}

export default Register