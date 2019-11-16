export const getCount = (...numbers) => {
  let total = 0
  numbers.forEach(n => {
    let num = parseFloat(n)
    num = isNaN(num) ? 0 : num

    total += num
  })

  return total
}
