import { Component , OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public $klanten : Observable<any> | undefined = undefined;

  constructor(private http: HttpClient) {
    
  }

  ngOnInit() : void {
    this.$klanten = this.http.get("https://localhost:7030/api/klants/");
  }

}
