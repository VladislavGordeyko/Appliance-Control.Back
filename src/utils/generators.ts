/** Generate id for models  */
export const generateId = () => {
  return `f${(+new Date()).toString(16)}`
}
