import React from 'react'
import { NavLink } from "react-router-dom"

const NotFoundPage: React.FC = () => {
    return (
        <div className="not-found-section">
            <h1 className="not-found-404">404</h1>
            <div className="not-found-pr">Ooops!!! The page you are looking for is not found</div>
            <NavLink to={"/"} className="back-home-btn">Back to home</NavLink>
        </div>
    )
}
export default NotFoundPage