import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageWrapperComponent } from './page-wrapper/page-wrapper.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SidebarModule } from './sidebar/sidebar.module';
import { PageMenuComponent } from './page-menu/page-menu.component';

@NgModule({
  declarations: [PageWrapperComponent, PageMenuComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,

    /**
     * Custom components modules
     */
    SidebarModule,
  ],
  exports: [
    PageWrapperComponent,
    PageMenuComponent,
    ReactiveFormsModule,

    /**
     * Custom components modules
     */

    SidebarModule,
  ],
})
export class ComponentsModule {}
