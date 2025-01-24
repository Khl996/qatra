import { HStack, Button, Text } from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const TablePagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: TablePaginationProps) => {
  return (
    <HStack spacing={2}>
      <Button
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage <= 1}
        leftIcon={<FiChevronRight />}
      >
        السابق
      </Button>
      <Text>
        صفحة {currentPage} من {totalPages}
      </Text>
      <Button
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
        rightIcon={<FiChevronLeft />}
      >
        التالي
      </Button>
    </HStack>
  );
};

export default TablePagination;
