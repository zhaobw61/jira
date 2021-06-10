import React from "react";
import { useState, useEffect } from "react";

export interface User {
    id: number;
    name: string;
    email: string;
    title: string;
    organization: string;
    token: string;
}
interface SearchPanelProps {
    users: User[], // 数组类型的声明
    param: {
        name: string;
        personId: string;
    },
    setParam:(param: SearchPanelProps['param']) => void;
}

export const SearchPanel = ({users, param, setParam}:SearchPanelProps) => {
    return <form>
        <div>
            <input type="text" value={param.name} onChange={evt => setParam({
                ...param,
                name: evt.target.value
            })}/>
            <select value={param.personId} onChange={evt => {
                setParam({
                    ...param,
                    personId: evt.target.value
                })
            }}>
                <option value={""}>负责人</option>
                {
                    users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)
                }
            </select>
        </div>
    </form>
}