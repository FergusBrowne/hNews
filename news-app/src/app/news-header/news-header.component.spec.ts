import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NewsHeaderComponent } from './news-header.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

describe('NewsHeaderComponent', () => {
  let component: NewsHeaderComponent;
  let fixture: ComponentFixture<NewsHeaderComponent>;

  describe('Search page', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          AngularFontAwesomeModule,
          FormsModule
        ],
        declarations: [ NewsHeaderComponent ],
        providers: [
          {
            provide: ActivatedRoute, useValue: {
              data: {
                  value: {
                      type: 'search'
                  }
              },
              queryParams: {
                value: {
                  query: 'angular'
                }
              }
            }
          }
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NewsHeaderComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render all buttons', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(document.getElementById('show')).toBeDefined();
      expect(document.getElementById('show').innerText.indexOf('Show') > -1).toBeTruthy();
      expect(document.getElementById('new')).toBeDefined();
      expect(document.getElementById('new').innerText.indexOf('New') > -1).toBeTruthy();
      expect(document.getElementById('past')).toBeDefined();
      expect(document.getElementById('past').innerText.indexOf('Past') > -1).toBeTruthy();
      expect(document.getElementById('ask')).toBeDefined();
      expect(document.getElementById('ask').innerText.indexOf('Ask') > -1).toBeTruthy();
      expect(document.getElementById('job')).toBeDefined();
      expect(document.getElementById('job').innerText.indexOf('Job') > -1).toBeTruthy();
      expect(document.getElementById('login')).toBeDefined();
      expect(document.getElementById('login').innerText.indexOf('Login') > -1).toBeTruthy();
      expect(document.getElementById('submit')).toBeDefined();
      expect(document.getElementById('submit').innerText.indexOf('Submit') > -1).toBeTruthy();
      expect(document.getElementById('search-text')).toBeDefined();

      expect(compiled.firstChild.id).toBe('header');
    });

    it('setNewsType should get the news type and search query from the url', () => {
      spyOn(NewsHeaderComponent.prototype, 'setNewsType');
      component.setNewsType(component.route);
      expect(component.newsType).toBe('search');
      expect(component.query).toBe('angular');
    });

    it('searchNews should only be called if query is set and the enter key is pressed', () => {
      spyOn(NewsHeaderComponent.prototype, 'searchNews');
      const enterEvent = new KeyboardEvent('keypress', { key: 'Enter' });
      const pEvent = new KeyboardEvent('keypress', { key: 'p' });
      component.query = '';
      component.onEnter(enterEvent);
      expect(NewsHeaderComponent.prototype.searchNews).not.toHaveBeenCalled();
      component.onEnter(pEvent);
      expect(NewsHeaderComponent.prototype.searchNews).not.toHaveBeenCalled();
      component.query = 'test';
      component.onEnter(pEvent);
      expect(NewsHeaderComponent.prototype.searchNews).not.toHaveBeenCalled();
      component.onEnter(enterEvent);
      expect(NewsHeaderComponent.prototype.searchNews).toHaveBeenCalled();
    });
  });

  describe('new page', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          AngularFontAwesomeModule,
          FormsModule
        ],
        declarations: [ NewsHeaderComponent ],
        providers: [
          {
            provide: ActivatedRoute, useValue: {
              data: {
                  value: {
                      type: 'new'
                  }
              }
            }
          }
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NewsHeaderComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('setNewsType should get the news type and search query from the url', () => {
      spyOn(NewsHeaderComponent.prototype, 'setNewsType');
      component.setNewsType(component.route);
      expect(component.newsType).toBe('new');
    });

  });
});
