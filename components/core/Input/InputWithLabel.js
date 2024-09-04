import React from 'react'
import toTitleCase from '@/hooks/helper/toTitleCase'

const defaultClassNameArray = ["row mt-3", "col-md-3 col-12", "col-md-8 col-12"]


const InputWithLabel = (props) => {
    const { classNameArray = defaultClassNameArray, state = {}, label = "", type = "text", name = "", isDisabled = false, isReadOnly = false, isRequired = false, maxLength = null, onChangeHandler = () => { }, smallCaseOutput = false } = props
    return (
        <div className={classNameArray[0]}>
            {label &&
                <div className={classNameArray[1]}>
                    <label>{label} {isRequired && <span />}</label>
                </div>
            }
            <div className={classNameArray[2]}>
                <input
                    type={type}
                    className='form-control'
                    name={name}
                    value={state[name]}
                    onChange={(e) => {
                        if (type != "file") {
                            if (smallCaseOutput || type === "email") {
                                e.target.value = e?.target?.value?.toLowerCase() || e.target.value
                            } else {
                                e.target.value = toTitleCase(e.target.value)
                            }
                        }
                        onChangeHandler(e)
                    }}
                    readOnly={isReadOnly}
                    disabled={isDisabled}
                    maxLength={maxLength}
                />
            </div>
        </div>
    )
}

export default InputWithLabel