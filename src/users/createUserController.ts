// src/controllers/createUserController.ts
import { Request, Response } from 'express';
import { createUserService } from '../services/createUserService';

export const createUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await createUserService(email, password);
    res.status(201).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};
