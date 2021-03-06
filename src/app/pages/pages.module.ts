import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [LandingComponent],
  imports: [CommonModule, ComponentsModule],
  exports: [LandingComponent],
})
export class PagesModule {}
