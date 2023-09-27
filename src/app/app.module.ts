import {NgModule, Provider, isDevMode} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutComponent } from './shared/app-layout/app-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { PostComponent } from './shared/components/post/post.component';
import {SharedModule} from "./shared/shared/shared.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./auth.interceptor";
import {AuthService} from "./shared/auth.service";
import {registerLocaleData} from "@angular/common";
import ruLocale from "@angular/common/locales/ru"
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import { ServiceWorkerModule } from '@angular/service-worker';
import {environments} from "../enviroments/enviroment";

registerLocaleData(ruLocale, 'ru')

const INTERSEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}
@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    HomePageComponent,
    PostPageComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NgxSkeletonLoaderModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environments.production
    })
  ],
  providers: [INTERSEPTOR_PROVIDER, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
