import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-product-drawer',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
  ],
  templateUrl: './product-drawer.html',
  styleUrls: ['./product-drawer.scss']
})
export class ProductDrawerComponent {

  @Input() visible = false;
  @Input() title = 'Drawer';
  @Input() width = 560;
  @Input() showFooter = true;
  @Input() okText = 'Save';
  @Input() cancelText = 'Cancel';
  @Input() okLoading = false;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() close = new EventEmitter<void>();
  @Output() ok = new EventEmitter<void>();

@HostListener('document:keydown.escape', ['$event'])
protected onEscape(event: Event) {
  const keyboardEvent = event as KeyboardEvent;

  if (this.visible) {
    this.onClose();
    keyboardEvent.preventDefault();
  }
}

  onClose() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.close.emit();
  }

  onOk() {
    this.ok.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('drawer-overlay')) {
      this.onClose();
    }
  }
}