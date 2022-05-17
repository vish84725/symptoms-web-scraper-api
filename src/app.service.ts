import { Injectable } from '@nestjs/common';
import { html } from 'cheerio/lib/api/manipulation';
var rp = require('request-promise');
const cheerio = require('cheerio');
const url = 'https://www.nhsinform.scot/symptoms-and-self-help/a-to-z/';

@Injectable()
export class AppService {

  getAllSymptomes(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      rp(url).then((htmlString: string) => {
          let symptomsList = [];
          const $ = cheerio.load(htmlString);

          for (let i = 0; i < 26; i++) {
            let letter = (i + 10).toString(36);

            $(`#${letter}`).next().each((idx, ref) => {
              const elem = $(ref);
              let itemsList = [];

              $(elem).find('li').each((idx, elem) => {
                const key = $(elem).text().trim();
                itemsList.push(key);
              });

              itemsList.pop(); // removes back to top element
              symptomsList.push(...itemsList);
              itemsList = [];

              });
          }

          resolve(symptomsList);
        })
        .catch( (err) => {
          reject(err);
        });
    });
  }

  getFilteredSymptoms(symptomsList : [], text: string) : any {
    const filteredList = [];
    symptomsList.forEach(symptom => {
      if(text.includes(symptom)){
        filteredList.push(symptom);
      }
    })
    return filteredList;
  }
}
