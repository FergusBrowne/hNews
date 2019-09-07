import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsItemComponent } from './news-item.component';
import { NewsItemService} from './news-item.service';

import { HttpClient, HttpHandler } from '@angular/common/http';
import { of } from 'rxjs';

describe('NewsItemComponent', () => {
  let component: NewsItemComponent;
  let fixture: ComponentFixture<NewsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        NewsItemService,
        HttpClient,
        HttpHandler
      ],
      declarations: [ NewsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    spyOn(NewsItemComponent.prototype, 'getAgeFromTimestamp').and.callThrough();
    spyOn(NewsItemService.prototype, 'getItem').and.returnValue(of({
      id: 1,
      title: 'test title',
      by: 'joe bloggs',
      kids: [2, 3, 4],
      time: 101010101
    }));
    fixture = TestBed.createComponent(NewsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getAgeFromTimestamp should be called on initialize', () => {
    expect(NewsItemComponent.prototype.getAgeFromTimestamp).toHaveBeenCalled();
  });

  it('buildUrl should return the correct url based on newsId', () => {
    expect(component).toBeTruthy();
    component.newsId = 15;
    expect(component.getUrl()).toBe('https://hacker-news.firebaseio.com/v0/item/15.json?print=pretty');
    component.newsId = 212;
    expect(component.getUrl()).toBe('https://hacker-news.firebaseio.com/v0/item/212.json?print=pretty');
  });

  it('author\'s name should be displayed', () => {
    expect(document.getElementsByClassName('item-author')[0].innerHTML.indexOf('joe bloggs') > -1).toBeTruthy();
  });

  it('number of comments should be displayed', () => {
    expect(document.getElementsByClassName('item-comment-count')[0].textContent).toBe(' 3 ');
  });

  it('extractSource should get the source from the items url', () => {
    expect(component.extractSource('')).toBe('');
    expect(component.extractSource('https://www.facebook.com/story/1234567')).toBe('www.facebook.com');
    expect(component.extractSource('https://www.sec.gov/ix?doc=/Archives/edgar/data/1652044/000165204419000025/form8-kdojcid.htm'))
      .toBe('www.sec.gov');
  });

  it('clicking the hide button should call the hideNewsItem function', () => {
    spyOn(NewsItemComponent.prototype, 'hideNewsItem').and.callThrough();
    const button: any = document.getElementsByClassName('hide-button')[0];
    expect(button).toBeTruthy();
    button.click();
    expect(NewsItemComponent.prototype.hideNewsItem).toHaveBeenCalled();
  });

  it('clicking the hide button should call the hideNewsItem function', () => {
    spyOn(NewsItemComponent.prototype, 'commentClick').and.callThrough();
    const button: any = document.getElementsByClassName('comment-icon')[0];
    expect(button).toBeTruthy();
    button.click();
    expect(NewsItemComponent.prototype.commentClick).toHaveBeenCalled();
  });

  it('', () => {
    expect(component.getAgeFromTimestamp(1330192800).indexOf('years ago') > -1).toBe(true);
  });
});
