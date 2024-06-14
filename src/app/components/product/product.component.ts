import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
  selector: 'app-product',
  standalone: true,
  providers: [ConfirmationService],
  imports: [RatingModule, FormsModule, ButtonModule, ConfirmPopupModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input() product!: Product;
  @Output() selectProductEv: EventEmitter<Product> =
    new EventEmitter<Product>();
  @Output() deleteProductEv: EventEmitter<Product> =
    new EventEmitter<Product>();
  @ViewChild('deleteButton') deleteButton!: any;
  constructor(private confirmationService: ConfirmationService) {}
  selectProduct(product: Product) {
    this.selectProductEv.emit(product);
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      target: this.deleteButton.nativeElement,
      message: 'Are you sure you want to delete this product?',
      accept: () => this.deleteProductEv.emit(product),
    });
  }
}
