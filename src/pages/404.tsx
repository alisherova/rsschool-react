import React from 'react'
import { useRouter } from 'next/router'

const NotFoundPage: React.FC = () => {

    const router = useRouter()

    return (
        <div className="not-found-section">
            <h1 className="not-found-404">404</h1>
            <div className="not-found-pr">Ooops!!! The page you are looking for is not found</div>
            <button onClick={() => router.push('/')} className="back-home-btn">Back to home</button>
        </div>
    )
}
export default NotFoundPage