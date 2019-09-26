import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './component/edit/edit.component';

const routes: Routes = [
{ path: 'create', component: CreateComponent},
{ path: 'edit/:id', component:EditComponent},
{ path: '', redirectTo: 'list', pathMatch: 'full'}
];

@NgModule({
  imports: [
  	RouterModule.forRoot(routes)
  	],
  exports: [RouterModule]
})
export class AppRoutingModule { }
