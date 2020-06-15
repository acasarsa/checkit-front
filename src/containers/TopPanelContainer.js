import React, { useContext} from 'react'
import LoginPage from '../components/LoginPage'
import { UserContext } from '../UserContext'
import TopPanel from '../components/TopPanel'

const TopPanelContainer = ({notes}) => {
    const [currentUser] = useContext(UserContext)

    return (
        <>
            {!currentUser ? <LoginPage /> :
                
                    <div>
                    <TopPanel notes={notes}/> 
                    </div>
                
                }
        </>
    )
}

export default TopPanelContainer
