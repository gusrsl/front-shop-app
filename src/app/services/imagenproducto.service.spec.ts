import { TestBed } from '@angular/core/testing';

import { ImagenproductoService } from './imagenproducto.service';

describe('ImagenproductoService', () => {
  let service: ImagenproductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagenproductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
