import * as bcryptjs from 'bcryptjs'

export default class BcryptManager {
  static async hash(pass: string): Promise<string> {
    return await bcryptjs.hash(pass, 8)
  }

  static async compare(hashPass: string, planePass: string): Promise<boolean> {
    return await bcryptjs.compare(planePass, hashPass)
  }
}
