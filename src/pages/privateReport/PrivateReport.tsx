import {useSelector} from "react-redux";
import {PasswordCheck} from "@/pages/privateReport/PasswordCheck";
import {useLazyDownloadPrivateReportQuery} from "@/services/privateReport/privateReport.service";
import {useGetBriefcaseQuery} from "@/services/briefcase/briefcase.services";
import {Loader} from "@/components/ui/loader/loader";
import {BriefcaseRow} from "@/pages/briefcase/tableBriefcase/briefcaseRow/briefcaseRow";
import {Table} from "@/components/ui/table/Table";
import {BriefcaseType} from "@/pages/briefcase/tableBriefcase/tableBriefcases";
import style from "./privateReport.module.scss";
import {Button} from "@/components/ui/button";
import {selectIsPrivatePassVerified} from "@/services/privateReport/privateReportSelector";
import {SelectPrivateReportModal} from "@/components/ui/selectPrivateReportModal/selectPrivateReportModal";
import {useState} from "react";

export const PrivateReport = () => {
    const isPrivatePassVerified = useSelector(selectIsPrivatePassVerified);
    const {data, isLoading} = useGetBriefcaseQuery({});
    const [triggerDownload] = useLazyDownloadPrivateReportQuery();
    const [open, setOpen] = useState(false);
    const [selectedBriefcase, setSelectedBriefcase] = useState<BriefcaseType | null>(null);

    if (isLoading) {
        return <Loader/>;
    }

    const downloadExcel = async (idBriefcase: string, nameBriefcase: string) => {
        //@ts-ignore
        const response = await triggerDownload(idBriefcase);
        if (response.data) {
            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Отчет продаж ' + nameBriefcase + '.xlsx');
            document.body.appendChild(link);
            link.click();
            //@ts-ignore
            link.parentNode.removeChild(link);
        }
    };

    if (!isPrivatePassVerified) {
        return <PasswordCheck/>;
    }

    const openModal = (briefcase: BriefcaseType) => {
        setSelectedBriefcase(briefcase);
        setOpen(true);
    };

    return (
        <div>
            <h1>Private Report</h1>
            <Table.Root className={style.tableBriefcase}>
                <Table.Head>
                    <Table.Row>
                        <Table.Cell variant={"head"}>Название портфеля</Table.Cell>
                        <Table.Cell variant={"head"}>Дата создания</Table.Cell>
                        <Table.Cell variant={"head"}></Table.Cell>
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {data?.map((briefcase: BriefcaseType) => (
                        <>
                            <Button onClick={() => downloadExcel(briefcase.id, briefcase.name)}>Отчет {briefcase.name}</Button>
                            <Button onClick={() => openModal(briefcase)}>Выбор</Button>
                            <BriefcaseRow key={briefcase.id} briefcase={briefcase}/>
                        </>
                    ))}
                </Table.Body>
            </Table.Root>

            {selectedBriefcase && (
                <SelectPrivateReportModal
                    open={open}
                    briefcase={selectedBriefcase}
                    setOpen={setOpen}
                />
            )}
        </div>
    );
};
