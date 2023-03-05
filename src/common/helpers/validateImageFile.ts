import { BadRequestException } from "@nestjs/common";
import { Request } from "express";
import { extname } from "path";


export const validateImageFile = (req: Request, file: Express.Multer.File, callback: (error: Error, filename: string) => void) => {
  const validsExtensionsFile = ['.png', '.jpg', '.jpeg', '.gif','.svg'];
  const { originalname } = file;
  const extensionFile = extname(originalname);
  const extension = validsExtensionsFile.find((extension) => extensionFile === extension);
  let error = null;
  if (!extension)
    error = new BadRequestException(`Not is valid extension ${extensionFile}`);
  callback(error, originalname);
}