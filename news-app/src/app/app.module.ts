import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxPaginationModule } from 'ngx-pagination';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsHeaderComponent } from './news-header/news-header.component';
import { NewsSectionComponent } from './news-section/news-section.component';
import { NewsSectionService} from './news-section/news-section.service';
import { NewsItemComponent } from './news-item/news-item.component';
import { NewsItemService} from './news-item/news-item.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

const appRoutes: Routes = [
  { path: '', component: NewsSectionComponent, data: { type: 'top' } },
  { path: 'new', component: NewsSectionComponent, data: { type: 'new' } },
  { path: 'past', component: NewsSectionComponent, data: { type: 'past' }  },
  { path: 'ask', component: NewsSectionComponent, data: { type: 'ask' }  },
  { path: 'show', component: NewsSectionComponent, data: { type: 'show' }  },
  { path: 'job', component: NewsSectionComponent, data: { type: 'job' }  },
  { path: 'search', component: NewsSectionComponent, data: { type: 'search' }  },
];

@NgModule({
  declarations: [
    AppComponent,
    NewsHeaderComponent,
    NewsSectionComponent,
    NewsItemComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    PaginationModule,
    NgxPaginationModule,
    AngularFontAwesomeModule
  ],
  providers: [
    NewsSectionService,
    NewsItemService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
