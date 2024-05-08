import React, { useRef, useState } from 'react'
import { useRouter } from "next/navigation";
// Services
import axios from '@/services/axios';
import endpoint from '@/services/endpoint';
// Hooks
import useActionDispatch from '@/hooks/useActionDispatch';
import { conditionRequiredFields, requiredFields } from '@/hooks/helper/requiredFields';


const useFormHooks = () => {
    const formRef = useRef(null);
    const router = useRouter();

    const { setError, resetValidation } = useActionDispatch()


    // const submitHandler = async (e) => {
    //     e.preventDefault()
    //     const body = { ...state }
    //     const requiredInputArray = ['name']
    //     const conditionCases = [
    //         {
    //             condition: (state) => state.unit_id === 1,
    //             requiredInputs: ['denomination_id', 'currency_id']
    //         },
    //     ]
    //     try {
    //         requiredFields(requiredInputArray, body)
    //         conditionRequiredFields(conditionCases, body)
    //         await axios.post(endpoint.test(), body)
    //     } catch (error) {
    //          console.error(error)
    //     }
    // }

    return ({})
}

export default useFormHooks