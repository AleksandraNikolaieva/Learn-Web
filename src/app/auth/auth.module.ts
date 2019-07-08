import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserAccountComponent } from './user-account/user-account.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './store/auth.reducer';
import { AuthEffects } from './store/auth.effects';
import { FormControlsModule } from '../form-controls/form-controls.module';

@NgModule({
  declarations: [
      LoginComponent,
      UserAccountComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormControlsModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class AuthModule { }
