export const formatToLocal = (date: string) => {
  const dateInstantiate = new Date(date)
  return dateInstantiate.toLocaleString()
}
