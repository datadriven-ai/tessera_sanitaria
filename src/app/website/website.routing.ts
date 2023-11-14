import {ContainerComponent} from "./container/container.component";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ReservationsComponent} from "./reservations/page/reservations.component";
import {UsersComponent} from "./users/page/users.component";
import {PartnersComponent} from "./partners/page/partners.component";
import {PromotionsComponent} from "./promo-code/page/promotions.component";
import {CampaignsComponent} from "./campaigns/page/campaigns.component";
import {OrdersComponent} from "./orders/page/orders.component";
import {SupportComponent} from "./support/page/support.component";

const routes: Routes = [
  {path: '',  component: ContainerComponent, children: [
      {path: '', component: ReservationsComponent},
      {path: 'reservations', component: ReservationsComponent},
      {path: 'users', component: UsersComponent},
      {path: 'partners', component: PartnersComponent},
      {path: 'promotions', component: PromotionsComponent},
      {path: 'campaigns', component: CampaignsComponent},
      {path: 'support', component: SupportComponent},
      {path: 'orders', component: OrdersComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRouting {
}
