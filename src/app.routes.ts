import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./app/features/feed/feed.component').then(m => m.FeedComponent),
        pathMatch: 'full'
    },
    {
        path: 'trending',
        loadComponent: () => import('./app/features/feed/feed.component').then(m => m.FeedComponent)
    },
    {
        path: 'discover',
        loadComponent: () => import('./app/features/feed/feed.component').then(m => m.FeedComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];