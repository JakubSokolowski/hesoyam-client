import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '@app/core';

import { ExamplesComponent } from './examples/examples.component';
import { ParentComponent } from './theming/parent/parent.component';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { TodosContainerComponent } from './todos/components/todos-container.component';
import { AssetInsightContainerComponent } from '@app/sentiment-analysis/asset-insights/components/asset-insight-container/asset-insight-container.component';
import { StockMarketContainerComponent } from './stock-market/components/stock-market-container/stock-market-container.component';
import { CrudComponent } from './crud/components/crud.component';
import { FormComponent } from './form/components/form.component';
import { NotificationsComponent } from './notifications/components/notifications.component';

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
                path: 'todos',
                component: TodosContainerComponent,
                data: { title: 'anms.examples.menu.todos' }
            },
            {
                path: 'stock-market',
                component: StockMarketContainerComponent,
                data: { title: 'anms.examples.menu.stocks' }
            },
          {
            path: 'asset-insights',
            component: AssetInsightContainerComponent,
            data: { title: 'anms.examples.menu.stocks' }
          },
            {
                path: 'theming',
                component: ParentComponent,
                data: { title: 'anms.examples.menu.theming' }
            },
            {
                path: 'crud',
                redirectTo: 'crud/',
                pathMatch: 'full'
            },
            {
                path: 'crud/:id',
                component: CrudComponent,
                data: { title: 'anms.examples.menu.crud' }
            },
            {
                path: 'form',
                component: FormComponent,
                data: { title: 'anms.examples.menu.form' }
            },
            {
                path: 'notifications',
                component: NotificationsComponent,
                data: { title: 'anms.examples.menu.notifications' }
            },
            {
                path: 'authenticated',
                component: AuthenticatedComponent,
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