import React, { useContext } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'

export const DefaultLayout = () => {

    const {user, token} = useStateContext()

    if(!token){
        return <Navigate to="/login" />
    }

    const onLogout = (event) => {
        event.preventDefault()
    }

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

