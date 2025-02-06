import { useState } from 'react';
import TableFilters from '../../../shared/components/ui/tables/TableFilters';
import {
    Box,
    Stack,
    Card,
    CardHeader,
    CardBody,
    Heading,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Button
} from '@chakra-ui/react';
import { LineChart } from '../../../shared/components/ui/charts';
import DataTable from '../../../shared/components/ui/tables/DataTable';

const ReportsPage = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [dateRange, setDateRange] = useState({ start: '', end: '' });

    const handleSearch = (value: string) => {
        // Empty handler since search is disabled
        console.log('Search disabled');
    };

    const salesData = {
        labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو'],
        datasets: [{
            label: 'المبيعات',
            data: [12000, 19000, 15000, 22000, 18000],
        }]
    };

    const pointsData = {
        labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو'],
        datasets: [{
            label: 'النقاط',
            data: [1200, 1900, 1500, 2200, 1800],
        }]
    };

    return (
        <Stack spacing={6}>
            <Card>
                <CardHeader>
                    <Heading size="md">التقارير</Heading>
                </CardHeader>
                <CardBody>
                    <Tabs index={activeTab} onChange={setActiveTab}>
                        <TabList>
                            <Tab>تقرير المبيعات</Tab>
                            <Tab>تقرير النقاط</Tab>
                            <Tab>تقرير العملاء</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <Stack spacing={4}>
                                    <TableFilters
                                        onDateRangeChange={setDateRange}
                                        showSearch={false}
                                        onSearch={handleSearch}
                                    />
                                    <Box h="300px">
                                        <LineChart data={salesData} />
                                    </Box>
                                    <Button colorScheme="blue">
                                        تصدير التقرير
                                    </Button>
                                </Stack>
                            </TabPanel>

                            <TabPanel>
                                <Stack spacing={4}>
                                    <TableFilters
                                        onDateRangeChange={setDateRange}
                                        showSearch={false}
                                        onSearch={handleSearch}
                                    />
                                    <Box h="300px">
                                        <LineChart data={pointsData} />
                                    </Box>
                                    <Button colorScheme="blue">
                                        تصدير التقرير
                                    </Button>
                                </Stack>
                            </TabPanel>

                            {/* يمكن إضافة المزيد من التقارير هنا */}
                        </TabPanels>
                    </Tabs>
                </CardBody>
            </Card>
        </Stack>
    );
};

export default ReportsPage;
