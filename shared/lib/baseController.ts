import { Request, Response } from "express";

export abstract class BaseController {
    public async execute(req: Request, res: Response) {}
}