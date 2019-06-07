import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.pug',
  styleUrls: ['./button.component.scss'],
  exportAs: 'defButton'
})
export class ButtonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
