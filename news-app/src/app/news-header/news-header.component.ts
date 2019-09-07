import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { debug } from 'util';

@Component({
  selector: 'app-news-header',
  templateUrl: './news-header.component.html',
  styleUrls: ['./news-header.component.scss']
})
export class NewsHeaderComponent implements OnInit {
  public newsType: string;
  public query: string;
  constructor(public route: ActivatedRoute) {
  }

  onEnter(event) {
    if (event.key === 'Enter' && this.query) {
      this.searchNews();
    }
  }

  searchNews() {
    location.href = `/search?query=${this.query}`;
  }

  setNewsType(route: any) {
    this.newsType = route.data.value.type;
    if (this.newsType === 'search') {
      this.query = route.queryParams.value.query;
    }
  }

  ngOnInit() {
    this.query = '';
    const routeData = this.route;
    this.setNewsType(routeData);
  }

}
