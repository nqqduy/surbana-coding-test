import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

export class SwaggerConfigure {
  public static async setup(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('API DOCUMENT FOR ARTNPRICE-PRO')
      .setDescription('Api document for Artnprice Pro')
      .setVersion(await this.getVersionFromPackageJson())
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`api/docs`, app, document);
  }

  private static async getVersionFromPackageJson(): Promise<string> {
    let packageJsonContent: any = await fs.promises.readFile(`package.json`, 'utf-8');
    packageJsonContent = JSON.parse(packageJsonContent);
    const version: string = packageJsonContent['version'];
    return version;
  }
}
