import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';


const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children: [
        {
            path:'journal',
            loadChildren:() => 
                import('../pages/journal/journal.module').then(
                    m => m.JournalPageModule
                )
        },
        {
            path:'activities',
            loadChildren: () =>
            import('../pages/activities/activities.module').then(
                m => m.ActivitiesPageModule
            )
        },
        {
            path:'settings',
            loadChildren:() => 
                import('../pages/settings/settings.module').then(
                    m => m.SettingsPageModule
                )
        }
        
    ]
  }];
  @NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
  })
  export class HomeRouter {}