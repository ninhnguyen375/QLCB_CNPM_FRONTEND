export const handleError = (err, form, noti) => {
  const data = err.response ? err.response.data : undefined
  const isOnFormError = !!form

  if (!data) {
    noti.error({ message: err.message || 'Server Error' })
    return
  }

  let errors = data.errors ? data.errors : data

  Object.keys(errors).forEach(key => {
    if (isOnFormError) {
      form.setFields({
        [key.charAt(0).toLocaleLowerCase() + key.substring(1)]: {
          errors: Array.isArray(errors[key])
            ? errors[key].map(e => new Error(e))
            : [new Error(errors[key])],
          value: form.getFieldValue(key),
        },
      })
    }
    // noti.error({
    //   message: Array.isArray(errors[key]) ? errors[key][0] : errors[key],
    // })
  })
}
