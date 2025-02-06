import { useEffect, useState } from 'react';
import { Box, VStack, useToast } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppDispatch';
import { addPoints, getPointsHistory } from '../../../store/slices/pointsSlice';
import DataTable from '../../../shared/components/ui/tables/DataTable';
import { AddPointsModal } from '../../../shared/components/modals/merchant/AddPointsModal';
import type { PointTransaction } from '../../../types';
import { useAPI } from '../../../hooks/useAPI';

const PointsManagementPage = () => {
    const dispatch = useAppDispatch();
    const toast = useToast();
    const { transactions } = useAppSelector(state => state.points);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const { handleRequest, isLoading } = useAPI();

    useEffect(() => {
        dispatch(getPointsHistory());
    }, [dispatch]);

    const handleAddPoints = async (data: Omit<PointTransaction, 'id' | 'date'>) => {
        await handleRequest(
            async () => {
                await dispatch(addPoints({
                    ...data,
                    date: new Date()
                })).unwrap();
                return true;
            },
            'تم إضافة النقاط بنجاح'
        );
        setIsAddModalOpen(false);
    };

    return (
        <Box p={4}>
            <VStack spacing={4} align="stretch">
                <DataTable 
                    data={transactions}
                    isLoading={isLoading}
                    columns={[
                        { header: 'رقم العميل', accessor: 'customerId' },
                        { header: 'المبلغ', accessor: 'amount' },
                        { header: 'النقاط', accessor: 'points' },
                        { 
                            header: 'التاريخ', 
                            accessor: 'date',
                            render: (item: PointTransaction) => new Date(item.date).toLocaleDateString('ar-SA')
                        }
                    ]}
                />

                <AddPointsModal 
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    onSubmit={handleAddPoints}
                />
            </VStack>
        </Box>
    );
};

export default PointsManagementPage;
