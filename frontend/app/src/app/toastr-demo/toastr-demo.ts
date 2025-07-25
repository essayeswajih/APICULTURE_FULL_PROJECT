import { Component } from '@angular/core';
import { ToasterManager } from '../services/toaster-manager';

@Component({
  selector: 'app-toastr-demo',
  imports: [],
  templateUrl: './toastr-demo.html',
  styleUrl: './toastr-demo.scss'
})
export class ToastrDemo {
constructor(private toaster: ToasterManager) {}

  showSuccess() {
    this.toaster.success('Operation successful!', 'Success');
  }

  showError() {
    this.toaster.error('Something went wrong!', 'Error');
  }

  showInfo() {
    this.toaster.info('This is an info message.', 'Info');
  }

  showWarning() {
    this.toaster.warning('Be careful!', 'Warning');
  }

  clear() {
    this.toaster.clear();
  }
}