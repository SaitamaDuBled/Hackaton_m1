import { InfoComponent } from './Pages/info/info.component';
import { ChatComponent } from './Pages/chat/chat.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './Pages/Map/map.component';

export const routes: Routes = [
  { path: '', component: MapComponent }, // Route par défaut
  { path: ':zone/info', component: InfoComponent },
  { path: ':zone/chat', component: ChatComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Redirection pour les routes non trouvées
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
