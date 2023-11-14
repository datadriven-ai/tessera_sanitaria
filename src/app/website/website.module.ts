import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsComponent } from './reservations/page/reservations.component';
import {WebsiteRouting} from "./website.routing";
import {ContainerComponent} from "./container/container.component";
import {SharedModule} from "../shared/shared.module";
import { ReservationCardComponent } from './reservations/components/reservation-card/reservation-card.component';
import { UsersComponent } from './users/page/users.component';
import { PartnersComponent } from './partners/page/partners.component';
import { PartnerCardComponent } from './partners/components/partner-card/partner-card.component';
import { PromotionsComponent } from './promo-code/page/promotions.component';
import { CampaignsComponent } from './campaigns/page/campaigns.component';
import { PromoCardComponent } from './promo-code/component/promo-card/promo-card.component';
import { NewPromoModalComponent } from './promo-code/modal/new-promo-modal/new-promo-modal.component';
import {ProductsSelectionComponent} from "./promo-code/component/products-selection/products-selection.component";
import { UserCardComponent } from './users/components/user-card/user-card.component';
import { CampaignCardComponent } from './campaigns/components/campaign-card/campaign-card.component';
import { NewUserModalComponent } from './users/modals/new-user-modal/new-user-modal.component';
import { NewCampaignModalComponent } from './campaigns/modals/new-campaign-modal/new-campaign-modal.component';
import { NewPartnerModalComponent } from './partners/modals/new-partner-modal/new-partner-modal.component';
import {ProductInfoComponent} from "./partners/components/product-info/product-info.component";
import { PartnerCatalogComponent } from './partners/modals/partner-catalog/partner-catalog.component';
import { AddEmailModalComponent } from './partners/modals/add-email-modal/add-email-modal.component';
import { OrdersComponent } from './orders/page/orders.component';
import { OrderCardComponent } from './orders/components/order-card/order-card.component';
import { InvoiceModalComponent } from './orders/modals/invoice-modal/invoice-modal.component';
import { ReportCardComponent } from './reports/components/report-card/report-card.component';
import { MedicInfoModalComponent } from './users/modals/medic-info-modal/medic-info-modal.component';
import {ReservationInfoModal} from "./reservations/modals/booking-info-modal/reservation-info-modal.component";
import {ReservationModalComponent} from "./reservations/modals/reservation-modal/reservation-modal.component";
import { AssociateMedicsComponent } from './users/modals/associate-medics/associate-medics.component';
import { ImporterModalComponent } from './partners/modals/importer-modal/importer-modal.component';
import { SupportComponent } from './support/page/support.component';
import { ModifyUserModalComponent } from './users/modals/modify-user-modal/modify-user-modal.component';



@NgModule({
  declarations: [
    ReservationsComponent,
    ReservationCardComponent,
    UsersComponent,
    PartnersComponent,
    PartnerCardComponent,
    PromotionsComponent,
    CampaignsComponent,
    PromoCardComponent,
    ReservationModalComponent,
    NewPromoModalComponent,
    ProductsSelectionComponent,
    UserCardComponent,
    CampaignCardComponent,
    NewUserModalComponent,
    ModifyUserModalComponent,
    NewCampaignModalComponent,
    NewPartnerModalComponent,
    ProductInfoComponent,
    PartnerCatalogComponent,
    AddEmailModalComponent,
    OrdersComponent,
    OrderCardComponent,
    InvoiceModalComponent,
    ReportCardComponent,
    ReservationInfoModal,
    MedicInfoModalComponent,
    ContainerComponent,
    AssociateMedicsComponent,
    ImporterModalComponent,
    SupportComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    WebsiteRouting
  ],
  exports: [],
  providers: []
})
export class WebsiteModule { }
