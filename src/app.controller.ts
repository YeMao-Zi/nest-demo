import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      dest: 'uploads',
    }),
  )
  uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: { name: string },
  ) {
    try {
      const fileName = body.name.match(/(.+)-\d+$/)?.[1] || '';
      // 新建目录
      const chunkDir = path.join('uploads', `chunks_${fileName}`);
      if (!fs.existsSync(chunkDir)) {
        fs.mkdirSync(chunkDir);
      }
      // 将文件复制进指定目录并删除临时文件
      const destPath = path.join(chunkDir, body.name);
      fs.cpSync(files[0].path, destPath);
      fs.rmSync(files[0].path);
    } catch (error) {
      console.error('文件分块保存失败:', error);
    }
  }

  @Post('merge')
  mergeFiles(@Body() body: { name: string }) {
    try {
      const { name } = body;
      const chunkDir = path.join('uploads', `chunks_${name}`);
      const targetDir = path.join('uploads', name);
      // 读取指定文件夹下的所有文件
      const files = fs.readdirSync(chunkDir);
      let startPos = 0;
      let count = 0;
      files.forEach((file) => {
        const filePath = path.join(chunkDir, file);
        // 创建可读流 readStream 用于读取该分片内容
        const readStream = fs.createReadStream(filePath);
        // 创建可写流 writeStream，指定写入的起始位置为 startPos
        const writeStream = fs.createWriteStream(targetDir, {
          start: startPos,
        });
        // 将读取流的数据写入到同一个文件的指定位置并在结束时删除分片文件
        readStream.pipe(writeStream).on('finish', () => {
          count++;
          if (count === files.length) {
            fs.rmSync(chunkDir, { recursive: true });
          }
        });
        startPos += fs.statSync(filePath).size;
      });
    } catch (error) {
      console.error('文件合并失败:', error);
    }
  }
}
