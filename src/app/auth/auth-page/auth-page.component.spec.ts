import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AuthPageComponent } from "./auth-page.component";
import { AppModule } from "src/app/app.module";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";

describe("AuthPageComponent", () => {
  let component: AuthPageComponent;
  let fixture: ComponentFixture<AuthPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
