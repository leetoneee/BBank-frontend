import React from 'react'
import { useNavigate } from 'react-router-dom'

function NoMatch() {
    const navigate = useNavigate();

    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-9xl'>Page not found</h1>
            <button className='bg-cyan-600 rounded-xl text-2xl px-10 py-4 '
                onClick={() => navigate('/login')}>
                Return to Login
            </button>
        </div>
    )
}

export default NoMatch