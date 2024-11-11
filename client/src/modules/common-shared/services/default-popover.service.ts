import { ElementRef, Injectable, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DefaultPopoverService {
  private popover: HTMLElement | null = null;

  private showPopoverTimeout: any;

  public renderer!: Renderer2;
  public el!: ElementRef;

  movePopover(event: MouseEvent, text: string) {
    this.hidePopover();
    clearTimeout(this.showPopoverTimeout);

    this.showPopoverTimeout = setTimeout(() => {
      if (!this.popover) {
        this.popover = this.renderer.createElement('span');
        this.renderer.addClass(this.popover, 'default-popover');
        this.renderer.appendChild(this.el.nativeElement, this.popover);
        this.renderer.setProperty(this.popover, 'textContent', text);

        const offsetX = 15;
        const offsetY = 15;

        this.renderer.setStyle(this.popover, 'left', `${event.pageX - window.scrollX + offsetX}px`);
        this.renderer.setStyle(this.popover, 'top', `${event.pageY - window.scrollY + offsetY}px`);
      }
    }, 700);
  }

  removePopover() {
    clearTimeout(this.showPopoverTimeout);
    this.hidePopover();
  }

  private hidePopover() {
    setTimeout(() => {
      if (this.popover) {
        this.renderer.removeChild(this.el.nativeElement, this.popover);
        this.popover = null;
      }
    }, 100)
  }
}
