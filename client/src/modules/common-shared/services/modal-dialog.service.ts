import { EventEmitter, Injectable, Type } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

export abstract class BaseModalWindowComponent {
  // [key: string]: any;
  onClose: Subject<any> = new Subject<any>();
  onSaveData: EventEmitter<any> = new EventEmitter<any>();

  constructor(protected readonly bsModalRef: BsModalRef) {}

  closeDialog() {
    this.onClose.next(1);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ModalDialogService {

  constructor(private bsModalService: BsModalService) {}

  showModal(
    modalComponent: Type<any>,
    config: any,
    initialState: any,
    callbacks: Callbacks
  ) {
    const modalRef = this.bsModalService.show(
      modalComponent,
      Object.assign({}, config, { initialState })
    );

    const modalWindowComponentInstance = modalRef.content as BaseModalWindowComponent;
    let closeHandled = false;

    Object.keys(callbacks).forEach(key => {
      if (key === 'onClose') {
        closeHandled = true;
      }
      if (key === 'onSaveData') {
        return;
      }
      if (!!modalWindowComponentInstance['onClose']) {
        modalWindowComponentInstance['onClose'].subscribe(async result => {
          const shouldClose = await callbacks[key](result);
          if (shouldClose) {
            modalRef.hide();
          }
        });
      }
    });

    if (!closeHandled) {
      modalWindowComponentInstance.onClose.subscribe(result => {
        modalRef.hide();
      });
    }

    if (!!modalWindowComponentInstance.onSaveData) {
      modalWindowComponentInstance.onSaveData.subscribe(async result => {
        const shouldClose = await callbacks['onSaveData']?.(result);
        if (shouldClose) {
          modalRef.hide();
        }
      });
    }

    return modalRef;
  }
}

type CallbackFunction = (result: any) => Promise<boolean>;

interface Callbacks {
  [key: string]: CallbackFunction;
}