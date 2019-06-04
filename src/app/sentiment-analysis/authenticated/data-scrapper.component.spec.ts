import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingModule } from '@testing/utils';

import { DataScrapperComponent } from './data-scrapper.component';

describe('DataScrapperComponent', () => {
    let component: DataScrapperComponent;
    let fixture: ComponentFixture<DataScrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TestingModule],
            declarations: [DataScrapperComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DataScrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
