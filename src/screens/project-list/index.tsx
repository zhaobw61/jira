import React from "react";
import {SearchPanel} from './search-panel';
import {List} from './list';
import {cleanObject, useDebounce} from '../../utils/index'
import { useState, useEffect } from "react";
import { useHttp } from "../../utils/http";
import styled from '@emotion/styled'
import { Typography } from "antd";

export  const ProjectListScreen = () => {
    const [users, setUser] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<null | Error>(null)
    const [param, setParam] = useState({
        name: '',
        personId: '',
    })
    const debounceParam = useDebounce(param, 200);
    const [list, setList] = useState([]);
    const client = useHttp();

    useEffect(() => {
        setIsLoading(true)
        client('projects', {data: cleanObject(param)})
        .then(setList)
        .catch(error => {
            setList([])
            setError(error)
        })
        .finally(() => setIsLoading(false));
        // eslint-disable-next-line
    }, [debounceParam])

    useEffect(() => {
        client('users').then(setUser)
    }, [])

    return <Container>
        <h1>项目列表</h1>
        <SearchPanel users={users} param={param} setParam={setParam}/>
        {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}
        <List loading={isLoading} users={users} dataSource={list}/>
    </Container>
}

export const Container = styled.div`
width: 100%;
padding: 3.2rem;
`;
