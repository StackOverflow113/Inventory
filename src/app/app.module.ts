import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { MatModule } from '../app/mat/mat.module'
import { MatFormFieldModule } from '@angular/material/form-field';
import { ItemsService } from './services/items.service';
//firebase
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormEditComponent } from './components/form-edit/form-edit.component';
import { FormsModule } from '@angular/forms';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MessageConfirmComponent } from './components/message-confirm/message-confirm.component';
@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    NavbarComponent,
    FormEditComponent,
    MainNavComponent,
    MessageConfirmComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    MatModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatFormFieldModule,
    FormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule


  ],
  providers: [ItemsService],
  bootstrap: [AppComponent],
  entryComponents: [FormEditComponent]
})
export class AppModule { }
