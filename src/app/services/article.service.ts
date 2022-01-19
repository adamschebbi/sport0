import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  articleURL="http://localhost:3000/api/blogs"

  constructor(private httpClient: HttpClient) { }

  sendReqToAddArticle(obj) {
    return this.httpClient.post<{ result: any }>(this.articleURL, obj);
  }

  sendReqToGetAllArticles() {
    return this.httpClient.get<{ result: any }>(this.articleURL);
  }

  sendReqToGetArticleById(id) {
    return this.httpClient.get<{ result: any }>(`${this.articleURL}/${id}`);
  }

  sendReqToDeleteArticleById(id) {
    return this.httpClient.delete<{ result: any }>(`${this.articleURL}/${id}`);
  }

  sendReqToEditArticle(obj) {
    return this.httpClient.put<{ result: any }>(`${this.articleURL}/${obj._id}`, obj);
  }
}
