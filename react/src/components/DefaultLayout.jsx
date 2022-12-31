import React, { useContext } from 'react'
import { useEffect } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'

export const DefaultLayout = () => {

    const {user, token, setUser, setToken} = useStateContext()

    if(!token){
        return <Navigate to="/login" />
    }

    const onLogout = (event) => {
        event.preventDefault()

        axiosClient.post("/logout").then(() => {
            setUser({})
            setToken(null)
        })
    }

    useEffect(() => {
        axiosClient.get('/user').then(({data}) => {
            setUser(data)
        })
    }, [])


  return (
    <div id='defaultLayout'>
        <aside>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/users">Users</Link>
        </aside>
        <div className="content">
            <header>
                <div className="">
                    header
                </div>
                <div className="">
                    {user.name}
                    <a href="#" className='btn-logout' onClick={onLogout} >Logout</a>
                </div>
                <main>   
                    <Outlet />
                </main>
            </header>
        </div>
    </div>
  )
}

