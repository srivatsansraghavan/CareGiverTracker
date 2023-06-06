import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({ selector: '[showEditDelete]' })
export class ShowEditDeleteDirective {
  constructor(private elm: ElementRef) {}

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: MouseEvent): void {
    this.elm.nativeElement.children[0].style.width = '80%';
    this.elm.nativeElement.children[1].style.display = 'inline-block';
    this.elm.nativeElement.children[2].style.display = 'inline-block';
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent): void {
    this.elm.nativeElement.children[0].style.width = '100%';
    this.elm.nativeElement.children[1].style.display = 'none';
    this.elm.nativeElement.children[2].style.display = 'none';
  }
}
