import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { BrowserModule } from '@angular/platform-browser';

import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { AgroupationComponent } from './views/agroupation/agroupation.component';
import { AgroupationService } from './views/agroupation/agroupation.service';
import { MainMenuComponent } from './views/main-menu/main-menu.component';

@NgModule({
  declarations: [AppComponent, MainMenuComponent, AgroupationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    DragDropModule,
    AngularFireDatabaseModule,
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    AgroupationService,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
