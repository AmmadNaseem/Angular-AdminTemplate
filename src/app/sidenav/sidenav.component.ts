import { fadeInOut, INavbarData } from './helper';
import { style, transition, trigger, animate, keyframes } from '@angular/animations';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { SideNavToggle } from '../interfaces/SideNavToggle';
import { navbarData } from './nav-data';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations:[
   fadeInOut,
    trigger('rotate',[
      transition(':enter',[
        animate('1000ms',
          keyframes([
            style({transform:'rotate(0deg)', offset:'0'}),
            style({transform:'rotate(2turn)', offset:'1'}),

          ])
        )
      ])
    ])
  ]//end of animations array
})
export class SidenavComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed:boolean=false;
  navData=navbarData;
  screenWidth= 0;
  multiple:boolean=false;

  @HostListener('window:resize',['$event'])
  onResize(event:any){
    this.screenWidth=window.innerWidth;
    if (this.screenWidth<=768) {
      this.collapsed=false;
      this.onToggleSideNav.emit({
        collapsed:this.collapsed,
        screenWidth:this.screenWidth
      });
    }

  }

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.screenWidth=window.innerWidth;
  }

  toggleCollapse():void{
    this.collapsed=!this.collapsed;
    this.onToggleSideNav.emit({
      collapsed:this.collapsed,
      screenWidth:this.screenWidth
    });
  }

  closeSideNav():void{
    this.collapsed=false;
    this.onToggleSideNav.emit({
      collapsed:this.collapsed,
      screenWidth:this.screenWidth
    });
  }

  handleClick(item:INavbarData):void{
    if (!this.multiple) {
      for (let modelItem of this.navData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded=false;
        }
      }
    }
    item.expanded =! item.expanded;
  }

  getActiveClass(data:INavbarData):string{
    return this.router.url.includes(data.routeLink) ? 'active':'';
  }



}
