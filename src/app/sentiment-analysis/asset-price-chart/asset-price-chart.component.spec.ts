import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetPriceChartComponent } from './asset-price-chart.component';

describe('AssetPriceChartComponent', () => {
  let component: AssetPriceChartComponent;
  let fixture: ComponentFixture<AssetPriceChartComponent>;

  beforeEach(async(() => {
    return TestBed.configureTestingModule({
      declarations: [ AssetPriceChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetPriceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    return expect(component).toBeTruthy();
  });
});
