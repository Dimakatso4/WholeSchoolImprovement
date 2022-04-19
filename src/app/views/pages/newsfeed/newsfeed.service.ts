import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NewsfeedService {

  constructor(private http: HttpClient) { }

  Header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, Content-type,Authorization'

  });

  base_url = environment.base_url;

  uploadLink = this.base_url + "api/Upload/Document";

  getAllNewsfeed() {
    return this.http.get(this.base_url + "api/NewsFeed/GetNewsFeedListAll", { headers: this.Header });
  }
  getNewsfeedByTypeId(typeId: any) {
    return this.http.get(this.base_url + "api/NewsFeed/GetNewsFeedListByTypeID?TypeID=" + typeId);
  }
  //update news feed 
  updateNewsFeed(newsFeedModel){
    return this.http.post(this.base_url + "api/NewsFeed/UpdateNewsFeed",newsFeedModel, { headers: this.Header })
  }

   //soft delete news feed
   deleteNewsFeed(newsModel) {
    return this.http.patch(this.base_url + "api/NewsFeed/DeleteNewsFeed", newsModel);
  }
 

  getDropDown() {
    return this.http.get(this.base_url + "api/NewsFeed/GetNewsType", { headers: this.Header });
  }


  createNewsFeedNews(getData) {
    console.log(getData);
    return this.http.post(this.base_url + "api/NewsFeed/CreateNewsFeed", getData, { headers: this.Header });
  }

  getnewsfeed() {
    return this.http.get(this.base_url + "api/NewsFeed/GetNewsFeedList");
  }

  getnewsfeed2() {
    return this.http.get(this.base_url + "api/NewsFeed/GetNewsFeedList2");
  }

  getnewsfeed3() {
    return this.http.get(this.base_url + "api/NewsFeed/GetNewsFeedList3");
  }

  getnewsFeedById() {
    return this.http.get(this.base_url + "api/NewsFeed/GetNewsFeedById?Id=4");
  }
  getUserById(id){
    return this.http.get(this.base_url + "api/Users/GetUserById?Id="+id)
  }

}