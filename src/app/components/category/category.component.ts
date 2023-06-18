import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {
  /////////////
  ngDoCheck() {
    // console.log('---Inside ngDoCheck---');
    // console.log(this.router.url);
    if (this.router.url == '/' || this.router.url == '/products') {
      console.log('all products');
      this.allCategoriesClass = 'list-group-item active';
    } else {
      this.allCategoriesClass = 'list-group-item';
    }
  }

  // ngAfterContentInit() {
  //   console.log('---Inside ngAfterContentInit---');
  // }
  // ngAfterContentChecked() {
  //   console.log('---Inside ngAfterContentChecked---');
  // }
  // ngAfterViewInit() {
  //   console.log('---Inside ngAfterViewInit---');
  // }
  // ngAfterViewChecked() {
  //   console.log('---Inside ngAfterViewChecked---');
  // }
  // ngOnDestroy() {
  //   console.log('---Inside ngOnDestroy---');
  // }
  //////////

  categories: Category[] = [];
  // currentCategory: Category = { categoryId: 0, categoryName: '' };
  currentCategory: Category;
  allCategoriesClass: string = '';

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {
    console.log('---constructor---');
  }

  ngOnInit(): void {
    console.log('---Inside ngOnInit---');
    this.getCategories();
  }
  getCategories() {
    this.categoryService
      .getCategories()
      .subscribe((response) => (this.categories = response.data));
  }

  setCurrentCategory(category: Category) {
    this.currentCategory = category;
  }

  getCurrentCategoryClass(category: Category) {
    if (
      category != this.currentCategory ||
      this.router.url == '/' ||
      this.router.url == '/products'
    ) {
      return 'list-group-item';
    } else {
      return 'list-group-item active';
    }
  }

  getAllCategoryClass = () => this.allCategoriesClass;
  // this.currentCategory ? 'list-group-item' : 'list-group-item active';

  // {
  //   if (category != this.currentCategory) {
  //     return 'list-group-item';
  //   } else {
  //     return 'list-group-item active';
  //   }
  // }
}
