export const minutesToTime = (minutes = 0) => {
  const hours = Math.ceil(minutes / 60)
  const m = minutes % 60
  return `${hours < 10 ? `0${hours}` : hours}:${m < 10 ? `0${m}` : m}`
}

export const minutesToTimeWithType = (minutes = 0) => {
  const hours = Math.ceil(minutes / 60)
  const m = minutes % 60
  return `${hours < 10 ? `0${hours}` : hours}giờ ${m < 10 ? `0${m}` : m}phút`
}
