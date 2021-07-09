import React from 'react'
import loaderImg from '../../Assets/img/loader.gif'

const FullPageLoader =()=>
{
    return(<div className = "loader-container">
        <div className = "loader">
            <img src={loaderImg} alt="loading..." />
        </div>
    </div>)
}

export default FullPageLoader