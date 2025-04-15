import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../shared/services/global.service';
import { HttpService } from '../../../shared/services/http.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrl: './record.component.css'
})
export class RecordComponent implements OnInit {

  userTrades: any[] = [];
  user: any = {};

  constructor(
    private global: GlobalService,
    private http: HttpService
  ) {
    this.user = this.global.getStorage("userInfo");
  }

  ngOnInit(): void {
    this.http.get(environment.backend.baseURL + 'trades/' + this.user.user_id + "/").then((userTrades:any) => {
      this.userTrades = userTrades;
    })
  }

}
