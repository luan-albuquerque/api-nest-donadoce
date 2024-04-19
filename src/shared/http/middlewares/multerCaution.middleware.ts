import { HttpException, HttpStatus } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

export const multerConfig = {
  dest: process.cwd() + "/uploads/caution",
};

export const multerOptionsCaution = {
  fileFilter: (req, file, cb) => {
    if (file.mimetype.match(/\/(pdf|xml|jpg|jpeg|png)$/)) {
      cb(null, true);
    } else {
      cb(
        new HttpException(
          `Unsupported file type: ${extname(
            file.originalname,
          )}. Please, upload: jpg, jpeg, pdf,xml or png file`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  storage: diskStorage({
    destination(req, file, cb) {
      const uploadPath = multerConfig.dest;
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename(req, file, cb) {
      cb(null, `${uuid()}${extname(file.originalname)}`);
    },
  }),
};