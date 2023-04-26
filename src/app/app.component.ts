import { Component } from '@angular/core';
import { SideNavToggle } from './interfaces/SideNavToggle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-admin-pannel';

  isSideNavCollapsed=false;
  screenWidth=0;

  onToggleSideNav(data:SideNavToggle):void{
    this.screenWidth=data.screenWidth;
    this.isSideNavCollapsed=data.collapsed;
  }
}
