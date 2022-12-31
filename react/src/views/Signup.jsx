import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'

const Signup = () => {
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmationRef = useRef()

  const [errors, setErrors] = useState(null)
  const {setUser, setToken} = useStateContext()

  const onSubmit = (event) => {
    event.preventDefault()
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value 
    }

    axiosClient.post('/signup', payload).then(({data}) => {
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
                <h1 className='title'>Signup for free</h1>
                {errors && 
                  <div className='alert'>
                    {Object.keys(errors).map(key => (
                      <p key={key}>{errors[key][0]}</p>
                    ))}
                  </div>}

                <input placeholder='Full Name' ref={nameRef} />
                <input type="email" placeholder='Email Address' ref={emailRef} />
                <input type="password" placeholder='Password' ref={passwordRef} value="1234@Afsal" />
                <input type="password" placeholder='Password Confirmation' ref={passwordConfirmationRef} value="1234@Afsal" />
                <button className="btn btn-block">Signup</button>
                <p className='message'>
                    Already Registered? <Link to='/login'>Sign in</Link>
                </p>
            </form>
        </div>
    </div>
  )
}

export default Signup