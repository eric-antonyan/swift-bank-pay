import React, { useState } from 'react'

const Loading = () => {
    const [loadingDots, setLoadingDots] = useState('.')

    useState(() => {
        const addDot = () => {
            setLoadingDots(prev => prev.length <= 2 ? prev + '.' : '.');
        };

        const intervalId = setInterval(addDot, 600)

        return () => clearInterval(intervalId)
    }, [])
    return (
        <div className='h-[100vh] w-[100%] flex justify-center items-center gap-3'>
            <i className="fa-solid fa-gear fa-spin text-[#235697] fa-2xl"></i>
            <h1 className='text-[#235697] text-[1.5rem] font-bold'>Fetching Data{loadingDots}</h1>
        </div>
    )
}

export default Loading
