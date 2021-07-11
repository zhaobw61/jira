interface State<D> {
    error: Error |  null;
    data: D | null;
    stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
    error: null,
    data: null,
    stat: 'idle'
}

export const useAsync = <D>(initialState?: State<D>) => {
    const [state, setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    })

    const setData = (data: D) => setState({
        data,
        stat: 'success',
        error: null
    })

    const setError = (data: D) => setState({
        data,
        stat: 'erro',
        error: null
    })
    // run 用来触发异步请求
    const run = (promise: Promise<D>) => {
        if(!promise || !promise.then) {
            throw new Error("请传入Promise类型");
        }
        setState({...state, stat: 'loading'})
        return promise
        .then(data => {
            setData(data)
            return data
        })
        .catch(error => {
            setEroor(error)
            return error
        })
    }
}