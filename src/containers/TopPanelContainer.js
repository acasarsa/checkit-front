import React, { useContext} from 'react'
import LoginPage from '../components/LoginPage'
import { UserContext } from '../UserContext'
import TopPanel from '../components/TopPanel'

const TopPanelContainer = () => {
    const [currentUser] = useContext(UserContext)

    return (
        <>
            {!currentUser ? <LoginPage /> :
                
                    <div>
                        <TopPanel /> 
                    </div>
                
                }
        </>
    )
}

export default TopPanelContainer
