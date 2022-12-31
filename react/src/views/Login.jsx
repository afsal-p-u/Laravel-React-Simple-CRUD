import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';

export const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()

    const [errors, setErrors] = useState(null)
    const {setUser, setToken} = useStateContext()

    const onSubmit = (event) => {
        event.preventDefault()

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        axiosClient.post('/login', payload).then(({data}) => {
            setUser(data.user)
            setToken(data.token)
        }).catch(err => {
            const response = err.response
            if(response.status == 422){
            setErrors(response.data.errors)
            }
        })
    }

  return (
    <div className='login-signup-form animated fadeInDown'>
        <div className="form">
            <form onSubmit={onSubmit}>
                <h1 className='title'>Log into your account</h1>
                {errors && 
                  <div className='alert'>
                    {Object.keys(errors).map(key => (
                      <p key={key}>{errors[key][0]}</p>
                    ))}
                  </div>}
                  
                <input type="email" placeholder='Email' ref={emailRef} value="afsalpu@example.com" />
                <input type="password" placeholder='Password' ref={passwordRef} value="1234@Afsal" />
                <button className="btn btn-block">Login</button>
                <p className='message'>
                    Not Registered? <Link to='/signup'>Create an account</Link>
                </p>
            </form>
        </div>
    </div>
  )

}