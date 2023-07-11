import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgroupationComponent } from './views/group-items/agroupation.component';
import { MainMenuComponent } from './views/main-menu/main-menu.component';

const routes: Routes = [
  { path: '', component: MainMenuComponent },
  { path: 'agroupation', component: AgroupationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
