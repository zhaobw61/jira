import React from "react";
import {SearchPanel} from './search-panel';
import {List} from './list';
import {cleanObject, useDebounce} from '../../utils/index'
import { useState, useEffect } from "react";
import * as qs from 'qs';
import { useHttp } from "../../utils/http";
import styled from '@emotion/styled'

const apiUrl = process.env.REACT_APP_API_URL

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
    }, [debounceParam])

    useEffect(() => {
        client('users').then(setUser)
    }, [])

    return <ScreenContainer>
        <SearchPanel users={users} param={param} setParam={setParam}/>
        <List users={users} list={list}/>
    </ScreenContainer>
}

export const ScreenContainer = styled.div`
width: 100%;
display: flex;
flex-direction: column;
`;