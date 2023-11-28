import * as bcryptjs from 'bcryptjs'

export const hash = async (pass: string): Promise<string> => {
  return await bcryptjs.hash(pass, 8)
}

export const compare = async (
  hashPass: string,
  planePass: string
): Promise<boolean> => {
  return await bcryptjs.compare(planePass, hashPass)
}
