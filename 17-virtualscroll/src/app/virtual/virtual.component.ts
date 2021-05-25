import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-virtual',
  templateUrl: './virtual.component.html',
  styleUrls: ['./virtual.component.scss'],
})
export class VirtualComponent implements OnInit {
  public personas = Array.from({ length: 500 }, () =>
    Math.round(Math.random() * 100 + 1)
  );
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;
  constructor() {}
  ngAfterViewInit() {}
  ngOnInit(): void {
    console.log(this.personas);
  }
  irInicio() {
    this.viewport.scrollToIndex(0);
  }
  irMitad() {
    this.viewport.scrollToIndex(this.personas.length / 2);
  }
  irFinal() {
    this.viewport.scrollToIndex(this.personas.length);
  }
}
