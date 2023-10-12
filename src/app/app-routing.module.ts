import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TprintComponent } from './components/tprint/tprint.component';
import { HeaderComponent } from './components/header/header.component';
import { BoardComponent } from './components/board/board.component';
import { TicketsComponent } from './components/tickets/tickets.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: '', component: HeaderComponent },      
      { path: 'board', component: BoardComponent },
      { path: 'tickets', component: TicketsComponent },
    ],
  },
  { path: 'tprint', component: TprintComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
