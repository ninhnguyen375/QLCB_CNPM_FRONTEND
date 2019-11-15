export const getValueFromObj = (stringKeys = '', obj = {}) => {
  try {
    const keys = stringKeys.split('.')
    let res = obj[keys[0]]

    for (let i = 1; i < keys.length; i++) {
      res = res[keys[i]]
    }
    return res
  } catch (err) {
    return ''
  }
}
