import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { GroupItemsComponent } from './views/group-items/group-items.component';
import { MainMenuComponent } from './views/main-menu/main-menu.component';

@NgModule({
  declarations: [AppComponent, MainMenuComponent, GroupItemsComponent],
  imports: [BrowserModule, AppRoutingModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
