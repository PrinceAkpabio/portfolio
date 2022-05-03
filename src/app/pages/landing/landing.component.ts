import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  isMenuOpen: boolean = false;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}

  listenForMenuIsOpen(event: any) {
    this.isMenuOpen = event;
    this.cd.detectChanges();
  }
}
