import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./user/user.module').then(u => u.UserPageModule),
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(u => u.FolderPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(u  => u.UserPageModule)
  },
  {
    path: 'user-tambah',
    loadChildren: () => import('./user-tambah/user-tambah.module').then(u => u.UserTambahPageModule)
  },
  {
    path: 'user-edit/:email',
    loadChildren: () => import('./user-edit/user-edit.module').then(u => u.UserEditPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
