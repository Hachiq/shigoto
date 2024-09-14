import { DOCUMENT } from '@angular/common';
import { Component, ComponentRef, ElementRef, EventEmitter, Inject, Injectable, Input, Output, Type, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalOptions } from '../models/modal-options';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  template: ``
})
export abstract class BaseModalWindowComponent {
  @Input() size? = 'md';

  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();

  constructor(
    protected elementRef: ElementRef
  ) {}

  close(): void {
    this.elementRef.nativeElement.remove();
    this.closeEvent.emit();
  }

  submit(): void {
    this.elementRef.nativeElement.remove();
    this.submitEvent.emit();
  }
}

@Injectable({
  providedIn: 'root'
})
export class ModalDialogService {
  public viewContainer!: ViewContainerRef;

  set modalRef(vcr: ViewContainerRef) {
    this.viewContainer = vcr;
  }
  private modalNotifier?: Subject<string>;
  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {}

  open<T>(component: Type<T>, options?: ModalOptions): Subject<string> {
    const modalComponentRef: ComponentRef<any> = this.viewContainer.createComponent(component);
    
    modalComponentRef.instance.size = options?.size;
    
    modalComponentRef.instance.closeEvent.subscribe(() => this.closeModal(modalComponentRef));
    modalComponentRef.instance.submitEvent.subscribe(() => this.submitModal(modalComponentRef));

    this.document.body.classList.add('no-scroll');
    this.document.body.appendChild(modalComponentRef.location.nativeElement);
    this.modalNotifier = new Subject();
    return this.modalNotifier;
  }

  closeModal(modalComponentRef: ComponentRef<any>) {
    this.document.body.classList.remove('no-scroll');
    modalComponentRef.destroy();
    this.modalNotifier?.complete();
  }

  submitModal(modalComponentRef: ComponentRef<any>) {
    this.modalNotifier?.next('confirm');
    this.closeModal(modalComponentRef);
  }
}