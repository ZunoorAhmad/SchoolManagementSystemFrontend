import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: "",
                pathMatch: "full",
                redirectTo: "auth",
            },
            {
                path: 'auth',
                loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
                // canActivate:[AuthGuard]
            },
            {
                path: 'main',
                loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule),
                // canActivate: [UserGuard]
            },
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}