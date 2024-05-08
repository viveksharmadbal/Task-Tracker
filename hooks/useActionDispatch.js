import { useDispatch } from 'react-redux'

import { setError, setSuccess, resetValidation } from '@/redux/slice/validation.slice'

const useActionDispatch = () => {
    const dispatch = useDispatch()

    return ({
        setError: (e) => dispatch(setError(e)),
        setSuccess: (e) => dispatch(setSuccess(e)),
        resetValidation: (e) => dispatch(resetValidation(e)),

    })
}

export default useActionDispatch