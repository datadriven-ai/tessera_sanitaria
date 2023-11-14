import {SelectionModel} from "@angular/cdk/collections";

export class SelectionModelExtended<T> extends SelectionModel<any> {

  deselect(isCatalog?: boolean, ...values: T[]): void {
    values.forEach((item: any) => {
      const itemFound = this.selected.find((i: any) => isCatalog ?  i.id === item.id : i.productChannelId === item.productChannelId);
      if (itemFound) {
        super.deselect(itemFound);
      }
    })
  }
}
