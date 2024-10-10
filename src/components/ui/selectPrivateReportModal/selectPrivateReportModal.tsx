import Modal from "@/components/ui/modal/modal";
import ModalWithContent from "@/components/ui/modal/modalWithContent/modalWithContent";
import {BriefcaseOrder, BriefcaseType} from "@/services/briefcase/briefcase.type";
import {useEffect, useState} from "react";
import {
    useLazyDownloadSelectReportQuery
} from "@/services/privateReport/privateReport.service";
import {Button} from "@/components/ui/button";

type PropsType = {
    open: boolean,
    briefcase: BriefcaseType,
    setOpen: (isOpen: boolean) => void
};

export type OrderDeliveryRouteType = {
    _id: string;
    name: string;
};

export const SelectPrivateReportModal = ({briefcase, open, setOpen}: PropsType) => {
    const [deliveryRoutes, setDeliveryRoutes] = useState<OrderDeliveryRouteType[]>([]);
    const [selectedRoutes, setSelectedRoutes] = useState<string[]>([]);
    const [downloadSelectReport, { isLoading }] = useLazyDownloadSelectReportQuery();

    useEffect(() => {
        setDeliveryRoutes(getUniqueDeliveryRoutes(briefcase.orders));
    }, [briefcase])

    const handleCheckboxChange = (routeId: string) => {
        setSelectedRoutes(prevState =>
            prevState.includes(routeId)
                ? prevState.filter(id => id !== routeId)
                : [...prevState, routeId]
        );
    };

    const handleSubmit = async () => {
        try {
            const blob = await downloadSelectReport({ routes: selectedRoutes, briefcaseId: briefcase.id }).unwrap();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Отчет-${briefcase.name}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();

        } catch (error) {
            console.error('Ошибка при скачивании файла:', error);
        }
    };

    return (
        <Modal onOpenChange={setOpen} open={open} title={"Отчет " + briefcase.name}>
            <ModalWithContent>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}>
                    {deliveryRoutes.map((route) => (
                        <div key={route._id}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedRoutes.includes(route._id)}
                                    onChange={() => handleCheckboxChange(route._id)}
                                />
                                {route.name}
                            </label>
                        </div>
                    ))}
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Загрузка..." : "Отправить и скачать отчет"}
                    </Button>
                </form>
            </ModalWithContent>
        </Modal>
    );
};

function getUniqueDeliveryRoutes(orders: BriefcaseOrder[]): OrderDeliveryRouteType[] {
    const deliveryRoutesMap = new Map<string, OrderDeliveryRouteType>();

    orders.forEach((order) => {
        const deliveryRoute = order.deliveryRoute;
        if (deliveryRoute && !deliveryRoutesMap.has(deliveryRoute._id)) {
            deliveryRoutesMap.set(deliveryRoute._id, deliveryRoute);
        }
    });

    return Array.from(deliveryRoutesMap.values());
}