import react from "react";
import {SearchPanel} from './search-panel';
import {List} from './list';
import { useState, useEffect } from "react";

const apiUrl = process.env.REACT_APP_API_URL

export  const ProjectListScreen = () => {
    const [users, setUser] = useState([])
    const [param, serParam] = useState({
        name: '',
        personId: '',
    })
    const [list, setList] = useState([])

    useEffect(() => {
        fetch(`${apiUrl}/projects`).then(async response => {
            if(response.ok) {
                setList(await response.json())
            }
        })
    }, [param])

    return <div>
        <SearchPanel users={users} param={param} serParam={serParam}/>
        <List users={users} list={list}/>
    </div>
}