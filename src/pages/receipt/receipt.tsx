import {useParams} from "react-router-dom";
import {useGetOrderInvoiceByIdQuery} from "@/services/invoices/invoices.services";
import {BriefcaseOrder} from "@/services/briefcase/briefcase.type";
import {Loader} from "@/components/ui/loader/loader";
import {TrueFoodReceipt} from "@/pages/receipt/true-food-receipt/true-food-receipt";
import {LavkaReceipt} from "@/pages/receipt/lavka-receipt/lavka-receipt";

export const Receipt = () => {
  const params = useParams();

  const options = {
    briefcase: params.briefcase,
    order: params.order,
  };

  const {data, isLoading} = useGetOrderInvoiceByIdQuery(options);

  if (isLoading) {
    return <Loader/>;
  }

  const order: BriefcaseOrder = data;

  return (
    <>
      {
        data.userId === "6118f73b-f4e0-4193-8751-97c529d0526c" ?
        <TrueFoodReceipt order={order}/> : <LavkaReceipt order={order}/>
      }
    </>
  );
};
