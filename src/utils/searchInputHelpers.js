export const applyMask = (value) => value.length <= 5
    ? value
    : `${value.slice(0,5)}-${value.slice(5)}`

export const removeMask = (value) => value.replace(/\D/g, '')

export const sameDigits = (value) => [...value].every(d => d === value[0])

export const lastSubmitted = (lastValue, currentValue) => lastValue === currentValue
