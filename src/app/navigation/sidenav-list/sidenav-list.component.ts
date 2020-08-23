import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenavi = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }

  onClose() {
    this.closeSidenavi.emit()
  }

}
