import { TestBed } from '@angular/core/testing';

import { ToasterManager } from './toaster-manager';

describe('ToasterManager', () => {
  let service: ToasterManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToasterManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
