import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { Products } from './products';

describe('Products', () => {
  let component: Products;
  let fixture: ComponentFixture<Products>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Products],
      providers: [
        provideRouter([]),
        provideHttpClient(),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Products);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty products on init', () => {
    expect(component.products).toEqual([]);
  });

  it('should default to grid view', () => {
    expect(component.viewMode).toBe('grid');
  });

  it('should default filters correctly', () => {
    expect(component.filters.page).toBe(1);
    expect(component.filters.limit).toBe(12);
    expect(component.filters.search).toBe('');
  });

  it('should clear filters correctly', () => {
    component.filters.search      = 'Nike';
    component.filters.category_id = '1';
    component.filters.brand_id    = '2';
    component.clearFilters();
    expect(component.filters.search).toBe('');
    expect(component.filters.category_id).toBe('');
    expect(component.filters.brand_id).toBe('');
  });

  it('should calculate discount correctly', () => {
    const mockProduct: any = { price: 1000000, sale_price: 800000 };
    expect(component.discountPct(mockProduct)).toBe(20);
  });

  it('should return correct display price with sale', () => {
    const mockProduct: any = { price: 1000000, sale_price: 750000 };
    expect(component.getDisplayPrice(mockProduct)).toBe(750000);
  });

  it('should return correct display price without sale', () => {
    const mockProduct: any = { price: 1000000, sale_price: null };
    expect(component.getDisplayPrice(mockProduct)).toBe(1000000);
  });

  it('should generate correct page numbers', () => {
    component.pagination = { total: 30, pages: 3 };
    expect(component.getPages()).toEqual([1, 2, 3]);
  });

  it('should not go to invalid page', () => {
    component.pagination = { total: 10, pages: 2 };
    component.filters.page = 1;
    component.goToPage(0);
    expect(component.filters.page).toBe(1);
  });
});