import React from 'react'
import { useAuth } from './context/auth-context'
import {ProjectListScreen} from './screens/project-list'
import { Button } from 'antd'
import styled from '@emotion/styled'
import { Row } from './components/lib'
export const AuthenticatedApp = () => {
    const {logout} = useAuth()
    return (
        <Container>
            <Header between={true}>
                <HeaderLeft gap={true}>
                    <h2>Logo</h2>
                    <h2>Logo1</h2>
                    <h2>Logo2</h2>
                </HeaderLeft>
                <HeaderRight>
                    <Button onClick={logout}>登出</Button>
                </HeaderRight>
            </Header>
            <Main>
                <ProjectListScreen/>
            </Main>
        </Container>
    )
}

const Container = styled.div`
display: grid;
grid-template-rows: 6rem 1fr;
height: 100vh;
`;

const Header = styled(Row)``

const HeaderLeft = styled(Row)`
`
const HeaderRight = styled.div``;

const Main = styled.main`
display: flex;
overflow: hidden;
`;