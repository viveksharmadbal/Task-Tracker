export const requiredFields = (requiredInputArray = [], state = {}) => {
    const error = (k) => {
        throw new Error('Please fill in all required fields marked with an asterisk (*) to proceed.');
    }
    for (const k of requiredInputArray) {
        if (Array.isArray(state[k]) && state[k].length === 0) {
            error(k)
        } else if (typeof state[k] === 'object' && Object.keys(state[k]).length === 0) {
            error(k)
        } else if (state[k] === null || state[k] === undefined || state[k] === "") {
            error(k)
        }
    }
}

export const conditionRequiredFields = (conditionCases = [], state = {}) => {
    for (const i of conditionCases) {
        const { condition = () => { }, requiredInputs = [] } = i
        if (condition(state)) {
            requiredFields(requiredInputs, state)
        }
    }
}