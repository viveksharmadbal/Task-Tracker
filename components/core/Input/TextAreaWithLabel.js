"use client"


import React from 'react'
const defaultClassNameArray = ["row mt-3", "col-12", "col-12"]


const TextAreaWithLabel = (props) => {
    const {
        feilds = {},
        state = {},
        onChangeHandler = () => { },
        className = defaultClassNameArray,
        additinalValidation = (value) => value,
    } = props

    const {
        label = "",
        placeholder = "",
        name = "",

        isDisabled = false,
        isReadOnly = false,
        isRequired = false,
        isHidden = false,

    } = feilds

    return (
        <div className={className[0]}>
            {label &&
                <div className={className[1]}>
                    <label>{label}{isRequired && <span />}</label>
                </div>
            }
            <div className={className[2]}>
                <textarea
                    name={name}
                    placeholder={placeholder}
                    className='form-control'
                    cols="30"
                    rows="5"

                    value={state?.[name]}
                    onChange={(e) => {
                        e.target.value = additinalValidation(e.target.value)
                        onChangeHandler(e)
                    }}

                    readOnly={isReadOnly}
                    disabled={isDisabled}
                    hidden={isHidden}
                    required={isRequired}
                />
            </div>
        </div>
    )
}

export default TextAreaWithLabel