import { Request, Response } from "express";

abstract class BaseController {
    public async execute(req: Request, res: Response) {}
}

export default BaseController