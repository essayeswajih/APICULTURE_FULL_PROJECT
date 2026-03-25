import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientOrderView } from './client-order-view';

describe('ClientOrderView', () => {
  let component: ClientOrderView;
  let fixture: ComponentFixture<ClientOrderView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientOrderView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientOrderView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
