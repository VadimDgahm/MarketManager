import { BriefcaseOrder } from "@/services/briefcase/briefcase.type";

const deliverySortOrders = (a: BriefcaseOrder,b: BriefcaseOrder,type:string ) => {
    {
        const a_deliveryRoute = a.deliveryRoute ? a.deliveryRoute.name : '';
        const b_deliveryRoute = b.deliveryRoute ? b.deliveryRoute.name : '';
        if (type === 'desc') {
          return a_deliveryRoute.toLowerCase() > b_deliveryRoute.toLowerCase() ? 1 : -1;
        } else {
          return a_deliveryRoute.toLowerCase() < b_deliveryRoute.toLowerCase() ? 1 : -1;
        }
      }
}

const addressSortOrders = (a: BriefcaseOrder,b: BriefcaseOrder,type:string ) => {
    const a_address = a.dataClient?.addresses.filter((address: any) => a.addressId === address.idAddress).map(address => {
        return address.city?.trim() + ' ' + address.street?.trim();
      })[0];
      const b_address = b.dataClient?.addresses.filter((address: any) => b.addressId === address.idAddress).map(address => {
        return address.city?.trim() + ' ' + address.street?.trim();
      })[0];

      if (type === 'asc') {
        return a_address?.toLowerCase() > b_address?.toLowerCase() ? 1 : -1;
      } else {
        return a_address?.toLowerCase() < b_address?.toLowerCase() ? 1 : -1;
      }
}

export {deliverySortOrders, addressSortOrders}