import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
})
export class ProductAddComponent {
  productAddForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private toastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.createProductAddForm();
  }
  createProductAddForm() {
    this.productAddForm = this.formBuilder.group({
      productName: ['', Validators.required],
      unitPrice: ['', Validators.required],
      unitsInStock: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
  }
  add() {
    if (this.productAddForm.valid) {
      let productModel = Object.assign({}, this.productAddForm.value);
      console.log({ productModel }.productModel);
      this.productService.add(productModel).subscribe({
        next: (response) => {
          console.log(response);
          this.toastrService.success(response.message, 'Basarili');
        },
        error: (responseError) => {
          console.log('-->databank - error');
          console.log('responseError:');
          console.log(responseError);
          console.log('responseError.error:');
          console.log(responseError.error);
          console.log('responseError.error.Errors:');
          console.log(responseError.error.Errors);
          console.log('responseError.error.Message:');
          console.log(responseError.error.Message);
          if (responseError.error.Errors.length > 0) {
            for (
              let index = 0;
              index < responseError.error.Errors.length;
              index++
            ) {
              const element = responseError.error.Errors[index];
              this.toastrService.error(element.ErrorMessage, 'Dikkat');
            }
          }
        },
        complete: () => console.info('complete'),
      });
    } else {
      this.toastrService.error('form is not valid', 'Dikkat');
    }
  }
}
