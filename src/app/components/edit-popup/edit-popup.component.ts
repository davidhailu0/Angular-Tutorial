import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../types';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
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
    ReactiveFormsModule,
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

  constructor(private formBuilder: FormBuilder) {}

  @Input() product: Product = {
    name: '',
    image: '',
    price: '',
    rating: '0',
  };
  specialCharacterValidator(): ValidatorFn {
    return (control) => {
      const hasSpecialCharacter = /[!@#$%^&^*]/.test(control.value);
      return hasSpecialCharacter ? { hasSpecialCharacter: true } : null;
    };
  }

  productForm = this.formBuilder.group({
    name: ['', [Validators.required, this.specialCharacterValidator()]],
    image: ['', []],
    price: ['', []],
    rating: ['0', []],
  });

  ngOnChanges() {
    this.productForm.patchValue(this.product);
  }

  onConfirm() {
    this.confirm.emit({
      name: this.productForm.value.name || '',
      image: this.productForm.value.image || '',
      price: this.productForm.value.price || '',
      rating: this.productForm.value.rating || '',
    });
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  onCancel() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
