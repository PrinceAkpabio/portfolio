import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
// import {
//   BreadCrumbsInterface,
//   getBreadCrumb,
//   getMenuChildren,
//   getMenuItem,
//   MenuInterface,
//   SubMenuInterface,
// } from 'src/app/config/menu';

import { gsap, Power1, Power2 } from 'gsap';
import Draggable from 'gsap/Draggable';
import ScrollTrigger from 'gsap/ScrollTrigger';
// import { ScrollActionsService } from 'src/app/services/scrollActions/scroll-actions.service';

@Component({
  selector: 'app-page-wrapper',
  templateUrl: './page-wrapper.component.html',
  styleUrls: ['./page-wrapper.component.scss'],
})
export class PageWrapperComponent implements OnInit, AfterViewInit {
  // Receives the Reactive forms' searchbar input form control and associated submit function
  @Input() pageWrapperSearchbarInput: FormControl | any = new FormControl('');
  @Input() pageWrapperSearchbarSumbitFunction: void | null = null;

  // Menu ID attached to the component route we want to view
  @Input() pageMenuId!: string;

  // Emits the selected submenu route to the component where the page wrapper is used
  @Output() pageWrapperSelectedRoute: EventEmitter<string | any> =
    new EventEmitter();

  // Receives the page title and subtitle from a component/page
  @Input() pageWrapperParentPageText: string | null | undefined = null;
  @Input() pageWrapperPageTitle: string | null | undefined = null;
  @Input() pageWrapperPageSubtitle: string | null | undefined = null;

  // The list of the current page's submenu bread crumbs entries
  // @Input() subMenuBreadCrumbs!: Array<BreadCrumbsInterface> | null;

  // The page menu is used to populate custom page values like name of page its associated children entries
  // pageMenu!: MenuInterface | null | undefined;

  // This is a list of menu children entries which is used to create the sidebar menu
  // pageSubMenuList!: Array<SubMenuInterface> | null | undefined;

  // Updated when the mobile menu is either closed or opened
  isMobileMenu: boolean = false;

  // Tracks the open state of the sidebar menu
  isSidebarOpened: boolean = false;

  tl: GSAPTimeline = new gsap.core.Timeline({ reversed: true, paused: true });
  // scrollToTop: GSAPTimeline = new gsap.core.Timeline({
  //   reversed: true,
  //   paused: true,
  // });

  scrollBox!: GSAPTimeline;
  pageContentWrapper!: Element;

  @Output() emitIsOpen: EventEmitter<boolean> = new EventEmitter();

  constructor() {}
  // constructor(private scrollActions: ScrollActionsService) {}

  /**
   * When the component is initialized, the main page menu is retrieved for populating the page title and any necessary strings, while the submenu is used to populate the sidebar.
   */
  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger, Draggable);

    this.initScrollToTop();

    // this.pageMenu = getMenuItem(this.pageMenuId);

    // this.pageSubMenuList = getMenuChildren(this.pageMenuId);

    // // Check for the first submenu entry that has a truthy selected property
    // const selectedMenuOnInit = this.pageSubMenuList?.find(
    //   (menu) => menu.selected == true
    // );

    // // Set the first breadcrumb view when page loads
    // this.subMenuBreadCrumbs = getBreadCrumb(
    //   this.pageMenu?.persistentMenuId,
    //   selectedMenuOnInit?.persistentMenuId
    // );
    // // this.scrollToTop();
  }
  ngAfterViewInit(): void {
    this.initAnimation();
  }

  /**
   * Listens for changes in the selected submenu route to ensure the page is updated with a new view attached to the updated route
   * @param {string | any} route - The `route` attached to a submenu entry
   * @returns  {void}
   */
  listenForSelectedRoute(route: string | any): void {
    this.pageWrapperSelectedRoute.emit(route);
  }

  /**
   * Listens for changes in the mobile menu component to ascertain when its opened or closed
   * @param {boolean | any} route - The mobile menu state
   * @returns  {void}
   */
  listenForMobileMenuEvents(isMenu: boolean | any): void {
    if (typeof isMenu == 'boolean') this.isMobileMenu = isMenu;
  }

  /**
   *  Updates the open state tracker on the sidebar
   * @param {boolean} isOpen  - Open state of the sidebar
   * @returns
   */
  listenForSidebarEvents(isOpen: boolean) {
    if (isOpen == true) {
      this.isSidebarOpened = isOpen;
      this.emitIsOpen.emit(this.isSidebarOpened);
      this.tl.play();
      return;
    }

    if (isOpen == false) {
      this.isSidebarOpened = isOpen;
      this.emitIsOpen.emit(this.isSidebarOpened);
      this.tl.reverse();
      return;
    }
  }

  initScrollToTop() {
    document.querySelectorAll('.page-content').forEach((box) => {
      this.pageContentWrapper = box;

      this.scrollBox = new gsap.core.Timeline({
        reversed: true,
        paused: true,
        scrollTrigger: {},
      });
    });
  }

  scrollToTop() {
    // this.scrollActions.scrollToTop();
  }

  initAnimation() {
    var burgerTop = document.getElementsByClassName('top');
    var burgerBot = document.getElementsByClassName('bottom');
    var burgerMid = document.getElementsByClassName('middle');
    var burgerSidebar = document.getElementsByClassName('sidebar');
    var navText = document.getElementsByClassName('nav-text');
    var burgerWhole = document.querySelectorAll('.top, .bottom, .middle');

    this.tl
      .to(burgerMid, { display: 'none' })
      .to(burgerTop, { duration: 0.6, rotation: 585, y: 6, width: '15px' })
      .to(burgerBot, { duration: 0.6, rotation: 669, width: '15px' }, '-=0.6')
      .to(burgerWhole, { duration: 0.1 }, '-=0.6');
    //     .from(burgerSidebar, { duration: 0.7, width: '100px' }, '-=0.6')
    //     .to(burgerSidebar, { duration: 0.7, width: 250 }, '-=0.7')
    //     .to(navText, { display: 'flex' })
    //     .to(
    //       '.topbar',
    //       {
    //         duration: 0.6,
    //         left: 240,
    //         width: '87vw',
    //         ease: Power1.easeIn,
    //       },
    //       '-=1.2'
    //     )
    //     .to(
    //       '.page-wrapper',
    //       {
    //         duration: 0.6,
    //         left: 190,
    //         width: '90%',
    //         ease: Power1.easeIn,
    //       },
    //       '-=1.2'
    //     )
    //     .to('.page-content-container', { duration: 0.6, width: '96%' }, '-=1.2')
    //     .to('.page-content', { duration: 0.6, width: '96%' }, '-=1.2');
  }
}
