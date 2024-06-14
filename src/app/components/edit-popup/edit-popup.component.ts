import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../types';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    FormsModule,
    RatingModule,
    ButtonModule,
  ],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss',
})
export class EditPopupComponent {
  @Input({ required: true }) header!: string;
  @Input() visible: boolean = false;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() confirm: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  @Input() product: Product = {
    name: '',
    image: '',
    price: '',
    rating: '0',
  };

  onConfirm() {
    this.confirm.emit(this.product);
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  onCancel() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}