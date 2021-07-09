import React from 'react'
import { useAuth } from './context/auth-context'
import {ProjectListScreen} from './screens/project-list'
import { Button } from 'antd'
export const AuthenticatedApp = () => {
    const {logout} = useAuth()
    return <div>
        <Button onClick={logout} type={"primary"}>登出</Button>
        <ProjectListScreen/>
    </div>
}