import React from "react";
import {SearchPanel} from './search-panel';
import {List} from './list';
import {cleanObject, useDebounce, useDocumentTitle, useMount} from '../../utils/index'
import { useState, useEffect } from "react";
import { useHttp } from "../../utils/http";
import styled from '@emotion/styled'
import { Typography } from "antd";
import { useAsync } from "../../utils/use-async";
import { Project } from "../../types/project";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { useUrlQueryParam } from "../../utils/url";

export  const ProjectListScreen = () => {
    const [, setParam] = useState({
        name: '',
        personId: '',
    });
    const [keys] = useState<('name'|'personId')[]>(['name', 'personId'])
    const [param] = useUrlQueryParam(keys);
    const debounceParam = useDebounce(param, 200);
    const { isLoading, error, data: list } = useProjects(debounceParam);
    const { data:users } = useUsers()

    useDocumentTitle('项目列表');
    return <Container>
        <h1>项目列表</h1>
        <SearchPanel users={users || []} param={param} setParam={setParam}/>
        {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}
        <List loading={isLoading} users={users || []} dataSource={list || []}/>
    </Container>
}

export const Container = styled.div`
width: 100%;
padding: 3.2rem;
`;
