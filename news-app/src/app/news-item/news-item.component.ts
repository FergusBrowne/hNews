import { Component, OnInit, Input } from '@angular/core';
import { NewsItemService} from './news-item.service';


@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit {
  @Input() newsId;
  public item: any;
  constructor(private newsService: NewsItemService) { }

  public getUrl(): string {
    return `https://hacker-news.firebaseio.com/v0/item/${this.newsId}.json?print=pretty`;
  }

  public getAgeFromTimestamp(timestamp: number): string {
    const minInMs = 60 * 1000;
    const hourInMs = minInMs * 60;
    const dayInMs = hourInMs * 24;
    const monInMs = dayInMs * 30;
    const yearInMs = dayInMs * 365;

    const current: any = new Date();
    const previous: any = new Date(timestamp * 1000);
    const elapsed = current - previous;

    let result;
    if (elapsed < minInMs) {
      result =  Math.round(elapsed / 1000);
      return result + ( (result === 1) ? ' second ago' : ' seconds ago' );
    } else if (elapsed < hourInMs) {
      result = Math.round(elapsed / minInMs);
      return  result + ( (result === 1) ? ' minute ago' : ' minutes ago' );
    } else if (elapsed < dayInMs ) {
      result = Math.round(elapsed / hourInMs );
      return result + ( (result === 1) ? ' hour ago' : ' hours ago');
    } else if (elapsed < monInMs) {
      result = Math.round(elapsed / dayInMs);
      return result + ( (result === 1) ? ' day ago' : ' days ago');
    } else if (elapsed < yearInMs) {
      result = Math.round(elapsed / monInMs);
      return result + ( (result === 1) ? ' month ago' : ' months ago');
    } else {
      result = Math.round(elapsed / yearInMs );
      return result + ( (result === 1) ? ' year ago' : ' years ago');
    }
  }

  commentClick(): void {
    // Render comment section or redirect to comment page
  }

  extractSource(url: string): string {
    if (!url) {
      return '';
    }
    let source;
    if (url.indexOf('//') > -1) {
      source = url.split('/')[2];
    } else {
      source = url.split('/')[0];
    }
    source = source.split(':')[0];
    source = source.split('?')[0];
    return source;
  }

  hideNewsItem(): void {
    // Use this.id to hide
    // If logged in
  }


  ngOnInit() {
    const itemUrl = this.getUrl();
    this.newsService.getItem(itemUrl)
        .subscribe((data) => {
          this.item = data;
          this.item.source = this.extractSource(this.item.url);
        });
  }
}
