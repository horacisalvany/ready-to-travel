import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupItemsComponent } from './views/group-items/group-items.component';
import { MainMenuComponent } from './views/main-menu/main-menu.component';

const routes: Routes = [
  { path: '', component: MainMenuComponent },
  { path: 'group-items', component: GroupItemsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
