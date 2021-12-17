import { Injectable } from '@angular/core';

import { UserService } from "src/app/modules/home/services/user/user.service";

@Injectable({
  providedIn: 'root'
})
export class UserFacade {


  constructor(private _service: UserService) { }

}
