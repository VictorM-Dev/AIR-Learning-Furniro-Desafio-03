import type { Request, Response, NextFunction } from 'express';
import {HttpException, InternalServerErrorException}  from '../middlewares/http-exception.middleware.js';
import  logger  from '../utils/logger/logger.js';

export const errorMiddleware = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
     if(error instanceof HttpException){
        logger.error(`HTTP Exception: ${error.message} - Status: ${error.statusCode}`);
        return res.status(error.statusCode).json(error.toJSON())
    }
    const internalError = new InternalServerErrorException()
    logger.error(`Internal Server Error: ${internalError.message} - Status: ${internalError.statusCode}`);
    return res.status(internalError.statusCode).json(internalError.toJSON())
}


