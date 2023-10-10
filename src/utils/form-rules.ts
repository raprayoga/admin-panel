export const formRules = {
  required: {
    value: true,
    message: 'Field ini Harus diisi',
  },
  email: {
    value: /\S+@\S+\.\S+/,
    message: 'Field ini harus berformat email',
  },
  minNominal: (number: number) => ({
    value: number,
    message: 'Harus lebih besar dari ' + number,
  }),
}

export function getVariant(dirty: boolean, error: boolean) {
  if (error) {
    return 'red'
  }
  return !dirty ? 'default' : 'green'
}
