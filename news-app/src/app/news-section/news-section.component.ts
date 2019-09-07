import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsSectionService} from './news-section.service';

@Component({
  selector: 'app-news-section',
  templateUrl: './news-section.component.html',
  styleUrls: ['./news-section.component.scss']
})
export class NewsSectionComponent implements OnInit {
  public allIds: any;
  public newsItemIds: any;
  public pageSize = 30;
  public page = 1;
  public totalPages: number;


  constructor(private newsService: NewsSectionService, private route: ActivatedRoute) { }

  buildUrl(data: any) {
    const type = data.value.type;
    switch (type) {
      case 'search':
        // const query = this.route.queryParams.value.query
        return 'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty';
      case 'top':
        return 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty';
      case 'new':
        return 'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty';
      case 'best':
        return 'https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty';
      case 'ask':
        return 'https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty';
      case 'show':
        return 'https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty';
      case 'job':
          return 'https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty';
      default:
        return 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty';
    }

  }

  pageClick(setting: string) {
    switch (setting) {
      case 'next':
        this.page++;
        break;
      case 'prev':
        this.page--;
        break;
    }
  }

  isFirstPage(): boolean {
    return this.page === 1;
  }

  isLastPage(): boolean {
    return this.page === this.totalPages;
  }

  ngOnInit() {
    this.newsItemIds = [];
    const routeData = this.route.data;
    const itemUrl = this.buildUrl(routeData);
    this.newsService.getNewsIds(itemUrl)
        .subscribe((data: Array<any>) => {
          this.newsItemIds = data;
          this.totalPages = Math.ceil( data.length / this.pageSize);
        });
  }
}
