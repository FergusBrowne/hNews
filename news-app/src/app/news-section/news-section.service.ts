import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NewsSectionService {
    constructor(private http: HttpClient) { }

     getNewsIds(url: string) {
        return this.http.get(url);
    }
}
