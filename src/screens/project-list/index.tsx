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
import { useProjectsSearchParams } from "./util";

export  const ProjectListScreen = () => {
    useDocumentTitle('项目列表', false);

    const [param, setParam] = useProjectsSearchParams();
    const { isLoading, error, data: list } = useProjects(useDebounce(param, 200));
    const { data:users } = useUsers()

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
