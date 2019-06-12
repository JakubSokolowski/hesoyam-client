import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '@app/core';
import { ExamplesComponent } from './examples/examples.component';
import { DataScrapperComponent } from './authenticated/data-scrapper.component';
import { AssetInsightContainerComponent } from '@app/sentiment-analysis/asset-insight-container/asset-insight-container.component';

const routes: Routes = [
    {
        path: '',
        component: ExamplesComponent,
        children: [
            {
                path: '',
                redirectTo: 'asset-insights',
                pathMatch: 'full'
            },
            {
            path: 'asset-insights',
            component: AssetInsightContainerComponent,
            data: { title: 'anms.examples.menu.stocks' }
          },
            {
                path: 'authenticated',
                component: DataScrapperComponent,
                canActivate: [AuthGuardService],
                data: { title: 'anms.examples.menu.auth' }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SentimentAnalysisRoutingModule {}
