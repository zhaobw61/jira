import React from "react";
import {cleanObject} from '../utils/index';
export const List = ({users, list}) => {
    return <table>
        <thead>
            <tr>
                <th>名称</th>
                <th>负责人</th>
            </tr>
        </thead>
        <tbody>
            {
                list.map(project => {
                    return <tr key={project.personId + Math.random()}>
                        <td>{project.name}</td>
                        <td>{users.find(user => user.id === project.personId)?.name || '未知'}</td>
                    </tr>
                })
            }
        </tbody>
    </table>
}