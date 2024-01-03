import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { getStorage, provideStorage } from '@angular/fire/storage';

// NGX TOASTER
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

import {
  getRemoteConfig,
  provideRemoteConfig,
} from '@angular/fire/remote-config';
import { environment } from './environments/environment.prod';
import { CategoriesService } from './services/categories.service';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

import { provideQuillConfig } from 'ngx-quill/config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideDatabase(() => getDatabase())),
    importProvidersFrom(provideFunctions(() => getFunctions())),
    importProvidersFrom(provideMessaging(() => getMessaging())),
    importProvidersFrom(providePerformance(() => getPerformance())),
    importProvidersFrom(provideStorage(() => getStorage())),
    importProvidersFrom(provideRemoteConfig(() => getRemoteConfig())),
    CategoriesService,

    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    provideAnimations(),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      enableHtml: true,
      tapToDismiss: true,
      closeButton: true,
      progressBar: true,
      newestOnTop: false,
      maxOpened: 0,
      progressAnimation: 'decreasing',
    }),
    provideQuillConfig({
      modules: {
        syntax: true,
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ header: 1 }, { header: 2 }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [
            {
              color: [
                '#000000',
                '#999999',
                '#2E8B57',
                '#FF1493',
                '#1E90FF',
                '#696969',
                '#E91E63',
                '#303F9F',
                '#FF8A65',
                '#795548',
                '#006400',
                '#69F0AE',
                '#F1C40F',
                '#0277BD',
                '#D32F2F',
                '#FF4081',
                '#673AB7',
                '#A52A2A',
                '#009688',
                '#FF5722',
                '#757575',
                '#9E9E9E',
                '#607D8B',
                '#546E7A',
                '#455A64',
              ],
            },
            {
              background: [
                'white',
                'black',
                'red',
                'orange',
                'yellow',
                'green',
                'teal',
                'blue',
                'indigo',
                'violet',
              ],
            },
          ],
          [
            {
              font: [],
            },
          ],
          [{ align: [] }],
          ['clean'],
          ['link', 'image', 'video'],
        ],
      },
    }),
  ],
};
