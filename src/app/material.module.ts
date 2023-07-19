import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [MatButtonModule, MatMenuModule, MatToolbarModule, MatCardModule],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
  ],
})
export class MaterialModule {}
