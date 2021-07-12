import { useAsync } from "./use-async";
import { Project } from "../types/project";
import { useState, useEffect } from "react";
import {cleanObject, useDebounce} from './index';
import { useHttp } from "./http";

export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp();
    const { run, ...result } = useAsync<Project[]>();

    useEffect(() => {
        run(client('projects', {data: cleanObject(param || {})}));
        // eslint-disable-next-line
    }, [param]);
    return result;
}