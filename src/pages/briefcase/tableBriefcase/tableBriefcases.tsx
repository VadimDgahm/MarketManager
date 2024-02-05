import {Table} from '@/components/ui/table/Table';
import s from './tableBriefcases.module.scss';
import {useGetBriefcaseQuery} from '@/services/briefcase/briefcase.services';
import {useNavigate} from 'react-router-dom';

export const TableBriefcases = () => {
    return (
        <Table.Root className={s.table}>
            <ContentTableHead/>
            <ContentTableBody/>
        </Table.Root>
    );
};

const ContentTableHead = () => {
    return (
        <Table.Head>
            <Table.Row>
                <Table.Cell variant={'head'}>Название портфеля</Table.Cell>
                <Table.Cell variant={'head'}>Дата создания</Table.Cell>
            </Table.Row>
        </Table.Head>
    )
}
const ContentTableBody = () => {
    const {data, isLoading} = useGetBriefcaseQuery({});
    const navigate = useNavigate()
    if (isLoading) {
        return <div>isLoading</div>;
    }

    return (
        <Table.Body>
            {data?.map((briefcase: BriefcaseType) => (
                <Table.Row key={briefcase.id}>
                    <Table.Cell
                        className={s.linkBriefcase}
                        onClick={() => navigate(`/briefcases/${briefcase.id}`)}
                    >
                        {briefcase.name}
                    </Table.Cell>
                    <Table.Cell>
                        {briefcase.createdDate}
                    </Table.Cell>
                </Table.Row>
            ))}
        </Table.Body>
)
}



export type BriefcaseType = {
    name: string
    id: string
    createdDate: string
    orders: any
    userId: string
}