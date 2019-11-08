export const handleError = (err, form, noti) => {
  const data = err.response ? err.response.data : undefined
  if (!data) {
    noti.error({ message: 'Server Error' })
    return
  }
  let errors = err.response.data.errors
    ? err.response.data.errors
    : err.response.data

  Object.keys(errors).forEach(key => {
    form.setFields({
      [key.toLocaleLowerCase()]: {
        errors: Array.isArray(errors[key])
          ? errors[key].map(e => new Error(e))
          : [new Error(errors[key])],
        value: form.getFieldValue(key),
      },
    })
    noti.error({
      message: Array.isArray(errors[key]) ? errors[key][0] : errors[key],
    })
  })
}
