import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(200)
  async getAllSymptomsInWeb(): Promise<any> {
    let response =  await this.appService.getAllSymptomes();
    return { "response": response};
  }

  @Post('filter-symptoms')
  @HttpCode(200)
  async getAllSymptoms(@Body() messageBody: any): Promise<any> {
    const textExtract = messageBody.content;

    let symptomsList =  await this.appService.getAllSymptomes();
    let res = this.appService.getFilteredSymptoms(symptomsList,textExtract);

    return { "response": res};
  }
}
