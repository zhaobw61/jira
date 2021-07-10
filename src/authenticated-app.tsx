import React from 'react'
import { useAuth } from './context/auth-context'
import {ProjectListScreen} from './screens/project-list'
import { Button, Dropdown, Menu} from 'antd'
import styled from '@emotion/styled'
import { Row } from './components/lib'
import { ReactComponent as SoftwareLogo } from './assets/software-logo.svg'
export const AuthenticatedApp = () => {
    const {logout, user} = useAuth()
    return (
        <Container>
            <Header between={true}>
                <HeaderLeft gap={true}>
                    <SoftwareLogo width={'18rem'} color={'rgb{38, 132,255}'}/>
                    <h2>Logo1</h2>
                    <h2>Logo2</h2>
                </HeaderLeft>
                <HeaderRight>
                    <Dropdown overlay={<Menu>
                            <Menu.Item key={'logout'}>
                                <a onClick={logout}>登出</a>
                            </Menu.Item>
                        </Menu>}>
                        <a onClick={ e => e.preventDefault()}>
                            Hi, {user?.name}
                        </a>
                    </Dropdown>
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

const Header = styled(Row)`
padding: 3.2rem;
box-shadow: 0 0 5px 0 rgba(0, 0 ,0, 0.1);
z-index: 1;
`

const HeaderLeft = styled(Row)`
padding: 3.2rem;
`
const HeaderRight = styled.div`

`;

const Main = styled.main`
display: flex;
overflow: hidden;
`;