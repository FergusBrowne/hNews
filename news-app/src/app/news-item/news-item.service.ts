import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NewsItemService {
    constructor(private http: HttpClient) { }

     getItem(url: string) {
        return this.http.get(url);
    }
}
