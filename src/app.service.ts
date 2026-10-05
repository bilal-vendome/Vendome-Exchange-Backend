import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo(): {status:boolean,statusCode:number,message:string} {
    return {status:true,statusCode:200,message:"NEST JS SERVER!"};
  }
}
