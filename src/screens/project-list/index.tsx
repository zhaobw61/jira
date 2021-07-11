import React from "react";
import {SearchPanel} from './search-panel';
import {List} from './list';
import {cleanObject, useDebounce} from '../../utils/index'
import { useState, useEffect } from "react";
import { useHttp } from "../../utils/http";
import styled from '@emotion/styled'

export  const ProjectListScreen = () => {
    const [users, setUser] = useState([])
    const [param, setParam] = useState({
        name: '',
        personId: '',
    })
    const debounceParam = useDebounce(param, 200);
    const [list, setList] = useState([]);
    const client = useHttp();

    useEffect(() => {
        client('projects', {data: cleanObject(param)}).then(setList)
        // eslint-disable-next-line
    }, [debounceParam])

    useEffect(() => {
        client('users').then(setUser)
    }, [])

    return <Container>
        <h1>项目列表</h1>
        <SearchPanel users={users} param={param} setParam={setParam}/>
        <List users={users} list={list}/>
    </Container>
}

export const Container = styled.div`
width: 100%;
padding: 3.2rem;
`;
