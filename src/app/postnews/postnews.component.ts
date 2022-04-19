import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-postnews',
  templateUrl: './postnews.component.html',
  styleUrls: ['./postnews.component.scss']
})
//export class NewsfeedComponent implements OnInit {
  export class PostnewsComponent{
  title='ngrxdemo';
  name:String
  result:String

  constructor(private http:HttpClient) { }

  postData()
  {
let url = "http://httpbin.org/post"

    this.http.post(url,{
      name:this.name
  }).toPromise().then((data: any)=>{
    console.log(data)
    console.log(JSON.stringify(data.json.name))
    this.result = JSON.stringify(data.json.name)
  })
}

  ngOnInit(): void {
  }
  id:any = "mission";
  tabChange(ids:any){
    this.id = ids;
    console.log(this.id);
  }

}