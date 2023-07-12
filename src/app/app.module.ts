import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { AgroupationComponent } from './views/group-items/agroupation.component';
import { MainMenuComponent } from './views/main-menu/main-menu.component';

@NgModule({
  declarations: [AppComponent, MainMenuComponent, AgroupationComponent],
  imports: [BrowserModule, AppRoutingModule, MaterialModule, DragDropModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
