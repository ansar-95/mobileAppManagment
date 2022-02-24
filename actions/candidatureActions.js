const setCandidature = (candidatureObj) => {
    return {
        type: "SET_CANDIDATURE",
        payload: candidatureObj
    }
}

const resetCandidature = () => {
    return {
        type: "RESET_CANDIDATURE"
    }
}

export default {
    setCandidature,
    resetCandidature
}