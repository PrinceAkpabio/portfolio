import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, AfterViewInit, OnChanges {
  // The list of main menu entries
  sideBarMenu!: Array<any>;

  // Route which the user will navigate to after being logged out
  logOutRoute: string | null | undefined = '/onboarding/signin';
  logOutLabel: string | null | undefined = 'Logout';

  // The icon of the logout button
  logOutIcon: string =
    '../../../assets/icons/Iconly/Light-Outline/Logout.active.svg';

  // Route which the user will navigate to when the app logo is clicked
  landingPageRoute: string = '/dashboard';

  // Logo of the app
  appLogo: string = '../../../assets/images/essolo-logo.png';

  tl = new gsap.core.Timeline({ paused: true, reversed: true });
  menuItems!: GSAPTween;

  @ViewChild('navLink', { static: false }) navLink!: ElementRef<any>;

  @Input() isSidebarOpened: boolean = false;
  @Output() sideBarOpenedEvent: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) {}

  ngOnInit(): void {
    /**
     * Assign the main menu from the config file to the class property during initialization
     * @note - Do NOT change the below line. Changes to the sidebar menu takes place in the config file
     * @see: `config/menu.ts` for usage
     */
    this.sideBarMenu = [];

    // formattedSideBarMenuList.map((menu) => {
    //   if (menu.isSideBarMenu === true) {
    //     this.sideBarMenu = this.sideBarMenu.concat(menu);
    //   }
    // });

    // const logoutMenu = formattedSideBarMenuList.find(
    //   (menu) => menu.isLogOutMenu === true
    // );

    // this.logOutRoute = logoutMenu?.route ?? 'onboarding/signin';

    // const logoutMenuLanguage = logoutMenu?.pageContent?.find(
    //   (content) => content.id === this.cache.get('languageId') ?? 1
    // );

    // this.logOutLabel = logoutMenuLanguage?.content?.contentInformation;

    // this.logOutLabel =

    //  this.menuItems = new gsap.core.Tween('.sidetext', { duration: 2, ease });
    // gsap.to('.sidetext', {
    //   duration: 2.5,
    //   ease: 'rough({ template: none.out, strength: 1, points: 20, taper: none, randomize: true, clamp: false})',
    //   x: -250,
    // });
  }

  ngAfterViewInit(): void {
    this.initiSideBar();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isSidebarOpened'].currentValue === true) {
      this.tl.play();
    } else {
      this.tl.reverse();
    }
  }

  initiSideBar() {
    var burgerTop = document.getElementsByClassName('top');
    var burgerBot = document.getElementsByClassName('bottom');
    var burgerMid = document.getElementsByClassName('middle');
    var burgerSidebar = document.getElementsByClassName('sidebar');
    var navText = document.getElementsByClassName('nav-text');
    var burgerWhole = document.querySelectorAll('.top, .bottom, .middle');

    // this.tl
    //   .to(burgerMid, { display: 'none' })
    //   .to(burgerTop, { duration: 0.6, rotation: 585, y: 6 })
    //   .to(burgerBot, { duration: 0.6, rotation: 669 }, '-=0.6')
    //   .to(burgerWhole, { duration: 0.1 }, '-=0.6');
    //   .from(burgerSidebar, { duration: 0.7, width: '100px' }, '-=0.6')
    //   .to(burgerSidebar, { duration: 0.7, width: 250 }, '-=0.7')
    //   .to(navText, { display: 'flex' });
  }

  haminate(linkClicked: boolean = false, route?: string | any) {
    if (!linkClicked) {
      this.sideBarOpenedEvent.emit(!this.isSidebarOpened);
      return;
    }
  }

  /**
   * Clears the storage object which is used for saving app data
   * This storage object can either be the local or session storage
   */
  logout() {
    this.router.navigate([this.logOutRoute]);
  }
}
