import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModalDialog } from './delete-modal-dialog';

describe('DeleteModalDialog', () => {
  let component: DeleteModalDialog;
  let fixture: ComponentFixture<DeleteModalDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteModalDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteModalDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
