import type { Request, Response, NextFunction } from 'express'
import { BadRequestException } from './http-exception.middleware.js'

export const validateSlug = (req: Request, _res: Response, next: NextFunction) => {
    const slug = req.params['slug'] as string
    const slugRegex = /^[a-z0-9-]+-\d+$/
    if (!slug || !slugRegex.test(slug)) {
        return next(new BadRequestException('Slug inválido'))
    }
    next()
}

export const validateId = (req: Request, _res: Response, next: NextFunction) => {
    const id = req.params['id'] as string
    const uuidRegex = /^[a-f0-9]{24}$/i
    if (!id || !uuidRegex.test(id)) {
        return next(new BadRequestException('ID inválido'))
    }
    next()
}
