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

export const PrivateReport = () => {
    const isPrivatePassVerified = useSelector((state: any) => state.privatePass.isPrivatePassVerified);
    const {data, isLoading} = useGetBriefcaseQuery({});
    const [triggerDownload] = useLazyDownloadPrivateReportQuery();


    if (isLoading) {
        return <Loader/>;
    }

    const downloadExcel = async (idBriefcase: string) => {
        //@ts-ignore
        const response = await triggerDownload(idBriefcase);
        if (response.data) {
            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'private_report.xlsx');
            document.body.appendChild(link);
            link.click();
            //@ts-ignore
            link.parentNode.removeChild(link);
        }
    };

    if (!isPrivatePassVerified) {
        return <PasswordCheck/>;
    }

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
                            <Button onClick={() => downloadExcel(briefcase.id)}>Отчет {briefcase.name}</Button>
                            <BriefcaseRow key={briefcase.id} briefcase={briefcase}/>
                        </>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    );
};
