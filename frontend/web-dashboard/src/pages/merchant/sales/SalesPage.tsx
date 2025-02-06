import { useEffect, useState } from 'react';
import {
    Box,
    Stack,
    Card,
    CardHeader,
    CardBody,
    Heading,
    useToast
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppDispatch';
import DataTable from '../../../shared/components/ui/tables/DataTable';
import TableFilters from '../../../shared/components/ui/tables/TableFilters';
import StatisticsCard from '../../../shared/components/ui/statistics/StatisticsCard';
import { FiDollarSign, FiStar } from 'react-icons/fi';

interface SaleTransaction {
    id: string;
    amount: number;
    points: number;
    customerName: string;
    date: string;
}

const SalesPage = () => {
    const dispatch = useAppDispatch();
    const toast = useToast();
    const [dateRange, setDateRange] = useState({ start: '', end: '' });

    const salesData: SaleTransaction[] = []; // سيتم ربطه مع Redux لاحقاً

    const columns = [
        { header: 'العميل', accessor: 'customerName' },
        { header: 'المبلغ', accessor: 'amount' },
        { header: 'النقاط', accessor: 'points' },
        { header: 'التاريخ', accessor: 'date' }
    ];

    const totalSales = salesData.reduce((sum, sale) => sum + sale.amount, 0);
    const totalPoints = salesData.reduce((sum, sale) => sum + sale.points, 0);

    const handleSearch = (value: string) => {
        console.log('Searching:', value);
        // Implement search logic here
    };

    return (
        <Stack spacing={6}>
            <Box>
                <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                    <StatisticsCard
                        title="إجمالي المبيعات"
                        value={`${totalSales} ر.س`}
                        icon={FiDollarSign}
                    />
                    <StatisticsCard
                        title="إجمالي النقاط"
                        value={totalPoints}
                        icon={FiStar}
                    />
                </Stack>
            </Box>

            <Card>
                <CardHeader>
                    <Heading size="md">سجل المبيعات</Heading>
                </CardHeader>
                <CardBody>
                    <TableFilters
                        onDateRangeChange={setDateRange}
                        showSearch
                        onSearch={handleSearch}
                    />
                    <Box mt={4}>
                        <DataTable
                            data={salesData}
                            columns={columns}
                            isLoading={false}
                        />
                    </Box>
                </CardBody>
            </Card>
        </Stack>
    );
};

export default SalesPage;
