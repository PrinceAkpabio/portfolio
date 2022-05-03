import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { gsap, Power1 } from 'gsap';

@Component({
  selector: 'app-page-menu',
  templateUrl: './page-menu.component.html',
  styleUrls: ['./page-menu.component.scss'],
})
export class PageMenuComponent implements OnInit, OnChanges {
  @Input() isOpen: boolean = false;
  tl: GSAPTimeline = new gsap.core.Timeline({ reversed: true, paused: true });

  constructor() {}

  ngOnInit(): void {
    this.initAnimation();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']) {
      if (changes['isOpen'].currentValue === true) {
        this.tl.play();
      }

      if (changes['isOpen'].currentValue === false) {
        this.tl.reverse();
      }
      console.log('is open: ', this.isOpen);
    }
  }

  initAnimation() {
    let menuWrapper = document.getElementsByClassName('page-menu');
    let menuList = document.getElementsByClassName('page-menu-list');
    let menuItem = document.getElementsByClassName('page-menu-item');

    this.tl
      .from(menuWrapper, { width: '692px', height: '900px', left: '628px' })
      .to(menuWrapper, { width: '92.7%', left: '100px', zIndex: 100 })
      .from(menuList, { display: 'none' })
      .to(menuList, { display: 'flex' }, '-=0.4')
      .from(
        menuItem,
        {
          visibility: 'hidden',
          x: '100%',
        },
        '-=0.4'
      )
      .to(
        menuItem,
        {
          visibility: 'visible',
          stagger: {
            each: 0.13,
            ease: Power1.easeIn,
            from: 'start',
          },
          duration: 0.32,
          ease: Power1.easeIn,
          x: '0%',
        },
        '-=0.3'
      );
  }
}
