export const priceFormat = (price = 0) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
