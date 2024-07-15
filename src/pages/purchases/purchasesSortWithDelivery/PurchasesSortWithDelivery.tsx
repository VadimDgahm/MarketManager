import { useParams } from "react-router-dom";
import { Purchase } from "../purchase/purchase"
import { useGetBriefcaseByIdQuery } from "@/services/briefcase/briefcase.services";
import { useGetCatalogQuery } from "@/services/catalog/catalog.services";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BriefcaseOrder} from "@/services/briefcase/briefcase.type";
import classes from './PurchasesSortWithDelivery.module.scss'
import { Typography } from "@/components/ui/typography";

const REMAINIG_DELIVERY = 'Все остальные'

const PurchasesSortWithDelivery = () => {
    const param = useParams();
    const { data, isLoading } = useGetBriefcaseByIdQuery({ id: param.id });
    const { data: catalog, isLoading: loadingCatalog } = useGetCatalogQuery({});
    const [namesDelivery, setNamesDelivery] = useState<string[]>([])
    const [activeDeliveryButton, setActiveDeliveryButton] = useState<string | null>(null)
    const [filterDeliveryDataOrders, setFilterDeliveryDataOrders] = useState<BriefcaseOrder[]>([])

    useEffect(()=>{
        if (data) {
            setNamesDelivery(getNamesDeliveryOrders(data.orders))
        }
        if(activeDeliveryButton){
            const orders = getFilteredOrdersDelivery(data.orders, activeDeliveryButton)
            setFilterDeliveryDataOrders(orders)
        }
    },[activeDeliveryButton,data])



    if (isLoading || loadingCatalog) {
        return <div>Loading</div>;
    }
    
const onClickHandlerAllOrders = () => {
    setFilterDeliveryDataOrders(data.orders)
    setActiveDeliveryButton(null)
}
    return<>
       <Typography variant={"large"}>{data.name}</Typography>

       <Typography variant={"h2"}>Фильтр</Typography>
        <div className={classes.boxDeliveryFilter}>
            {namesDelivery?.map(name => <Button 
            className={name === activeDeliveryButton ? classes.buttonActive : ''} 
            onClick={() => setActiveDeliveryButton(name)}>{name}</Button>)}
            <Button onClick={onClickHandlerAllOrders }>Показать всю закупку</Button>
        </div>
        <Purchase 
            data={data} 
            catalog={catalog} 
            dataOrders={
            !filterDeliveryDataOrders.length
                ? data.orders
                : filterDeliveryDataOrders}/>
    </> 
}

export {PurchasesSortWithDelivery}


const getNamesDeliveryOrders = (orders: BriefcaseOrder[]) => {
    return orders.reduce<string[]>((acc, currentValue) => {
        const {deliveryRoute} = currentValue

        let name = deliveryRoute?.name

        if(!name){
            name = REMAINIG_DELIVERY
        }
        if(!acc.includes(name)){
            return [...acc, name]
        }
        return acc
        
    }, [])
}


const getFilteredOrdersDelivery = ( orders : BriefcaseOrder[], activeTab: string) => {

    return orders.filter(order => {
        if(!order.deliveryRoute?.name && activeTab === REMAINIG_DELIVERY){
            return true
        }
        return order.deliveryRoute?.name === activeTab
    })
}