import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {

  @Input() tokenColor: string;

  constructor() { }

  ngOnInit() {
  }

}
