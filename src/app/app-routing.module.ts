import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgroupationComponent } from './views/agroupation/agroupation.component';
import { ListComponent } from './views/list/list.component';
import { ListsComponent } from './views/lists/lists.component';
import { MainMenuComponent } from './views/main-menu/main-menu.component';

const routes: Routes = [
  { path: '', component: MainMenuComponent },
  { path: 'agroupation', component: AgroupationComponent },
  { path: 'list', component: ListsComponent },
  { path: 'list/:id', component: ListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
