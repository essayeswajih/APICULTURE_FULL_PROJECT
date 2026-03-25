import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterManager {
  private isBrowser: boolean;

  constructor(
    private toastr: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  success(message: string, title?: string) {
    if (this.isBrowser) {
      this.toastr.success(message, title);
    }
  }

  error(message: string, title?: string) {
    if (this.isBrowser) {
      this.toastr.error(message, title);
    }
  }

  info(message: string, title?: string) {
    if (this.isBrowser) {
      this.toastr.info(message, title);
    }
  }

  warning(message: string, title?: string) {
    if (this.isBrowser) {
      this.toastr.warning(message, title);
    }
  }

  clear(toastId?: number) {
    if (this.isBrowser) {
      this.toastr.clear(toastId);
    }
  }
}