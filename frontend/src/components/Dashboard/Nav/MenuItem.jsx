import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const MenuItem = ({path, page}) => {
    const navigate = useNavigate()

    const location = useLocation()

    return(
        <li className={location.pathname === path ? 'active' : null}
            onClick={() => navigate(path)}
        >{page}</li>
    )
}

export default MenuItem