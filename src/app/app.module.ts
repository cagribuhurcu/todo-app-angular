import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { ColumnComponent } from './components/column/column.component';
import { CardComponent } from './components/card/card.component';
import { provideHttpClient } from '@angular/common/http';
import { SpicaService } from './services/spica.service';

@NgModule({
  declarations: [
    AppComponent,
    ColumnComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DragDropModule,
  ],
  providers: [SpicaService, provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }