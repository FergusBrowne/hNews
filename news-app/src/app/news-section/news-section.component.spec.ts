import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsSectionComponent } from './news-section.component';
import { NewsItemComponent } from '../news-item/news-item.component';
import { NewsItemService} from '../news-item/news-item.service';
import { NewsHeaderComponent } from '../news-header/news-header.component';
import { NewsSectionService} from './news-section.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { of } from 'rxjs';

describe('NewsSectionComponent', () => {
  let component: NewsSectionComponent;
  let fixture: ComponentFixture<NewsSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFontAwesomeModule,
        FormsModule
      ],
      providers: [
        NewsSectionService,
        NewsItemService,
        HttpClient,
        HttpHandler,
        {provide: ActivatedRoute, useValue: {
          data: {
              value: {
                  type: 'top'
              }
          }
        }
      }
      ],
      declarations: [
        NewsSectionComponent,
        NewsHeaderComponent,
        NewsItemComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    spyOn(NewsSectionComponent.prototype, 'buildUrl').and.callThrough();
    spyOn(NewsItemService.prototype, 'getItem').and.returnValue(of({}));
    spyOn(NewsSectionService.prototype, 'getNewsIds').and.returnValue(of([1,2,3,4,5,6]));
    fixture = TestBed.createComponent(NewsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shoud call buildUrl function', () => {
    expect(NewsSectionComponent.prototype.buildUrl).toHaveBeenCalled();
    expect(NewsSectionService.prototype.getNewsIds).toHaveBeenCalledWith(
      'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
    );
  });

  it('buildUrl shoud return the correct URL', () => {
    expect(component.buildUrl({value: {type: ''}})).toBe(
      'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
    );
    expect(component.buildUrl({value: {type: 'top'}})).toBe(
      'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
    );
    expect(component.buildUrl({value: {type: 'ask'}})).toBe(
      'https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty'
    );
    expect(component.buildUrl({value: {type: 'top'}})).toBe(
      'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
    );
    expect(component.buildUrl({value: {type: 'new'}})).toBe(
      'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty'
    );
    expect(component.buildUrl({value: {type: 'best'}})).toBe(
      'https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty'
    );
    expect(component.buildUrl({value: {type: 'show'}})).toBe(
      'https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty'
    );
    expect(component.buildUrl({value: {type: 'blahblahblah'}})).toBe(
      'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
    );
  });

  it('pageClick shoud change the page number if `prev` or `next` is the input', () => {
    expect(component.page).toBe(1);
    component.pageClick('next');
    expect(component.page).toBe(2);
    component.pageClick('next');
    expect(component.page).toBe(3);
    component.pageClick('prev');
    expect(component.page).toBe(2);
    component.pageClick('blahblahblah');
    expect(component.page).toBe(2);
    component.pageClick('prev');
    expect(component.page).toBe(1);
  });

  it('isFirstPage should return true if page is 1', () => {
    expect(component.page).toBe(1);
    expect(component.isFirstPage()).toBe(true);
    component.pageClick('next');
    expect(component.isFirstPage()).toBe(false);
    component.pageClick('prev');
    expect(component.isFirstPage()).toBe(true);
  });
  it('isLastPage should return true if page is equal to total number of pages', () => {
    component.totalPages = 3;
    expect(component.totalPages).toBe(3);
    expect(component.isLastPage()).toBe(false);
    component.pageClick('next');
    expect(component.isLastPage()).toBe(false);
    component.pageClick('next');
    expect(component.isLastPage()).toBe(true);
    component.pageClick('prev');
    expect(component.isLastPage()).toBe(false);
  });
});
