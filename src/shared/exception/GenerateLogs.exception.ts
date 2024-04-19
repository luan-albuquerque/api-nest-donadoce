import { HttpException, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import * as dayjs from "dayjs";


const logsPath = {
  dest: process.cwd() + "/logs/",
};

export class GenerateLogs {

  public static async generate(errorS: any) {
    try {
      console.log("Gerando log...")
      await this.verifyFolder();
      const date = new Date();
      var logFileName = "log_" + dayjs(new Date()).format('YYYY_MM_DD_HH_mm_ss') + ".txt";

      fs.appendFileSync(logsPath.dest + logFileName,  String(errorS))
      console.log('Sucesso!');

    } catch (error) {
      throw new InternalServerErrorException("Erro Append File in Dest: " + error)
    }
  }

  private static async verifyFolder() {
    try {

      if (!fs.existsSync(logsPath.dest)) {
        //Efetua a criação do diretório
        fs.mkdirSync(logsPath.dest);
      }
    } catch (error) {
      throw new InternalServerErrorException("Not Found Folder Logs: " + error)
    }
  }



}


