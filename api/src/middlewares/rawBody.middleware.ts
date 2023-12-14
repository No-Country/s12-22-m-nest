import { type Response } from 'express'
import { json } from 'body-parser'
import type RequestWithRawBody from 'src/payments/interface/requestWithRawBody.interface'

function rawBodyMiddleware() {
  return json({
    verify: (
      request: RequestWithRawBody,
      response: Response,
      buffer: Buffer
    ) => {
      if (request.url === '/api/payments/stripe-webhook' && Buffer.isBuffer(buffer)) {
        request.rawBody = Buffer.from(buffer)
      }
      return true
    }
  })
}

export default rawBodyMiddleware
