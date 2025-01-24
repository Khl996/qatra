import {
  Box,
  Text,
  Flex,
  Input,
  IconButton,
  Select,
  Table as ChakraTable,
  Thead as ChakraThead,
  Tbody as ChakraTbody,
  Tr as ChakraTr,
  Th as ChakraTh,
  Td as ChakraTd,
  TableContainer as ChakraTableContainer,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface Column {
  key: string;
  label: string;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onPageChange?: (page: number) => void;
  totalPages?: number;
  currentPage?: number;
}

const DataTable = ({
  columns,
  data,
  onPageChange,
  totalPages = 1,
  currentPage = 1,
}: DataTableProps) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Box>
      <Flex mb={4} justify="space-between" align="flex-end">
        {/* Input field for searching */}
        <Input
          placeholder="بحث..."
          maxW="300px"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* FormControl for rows per page */}
        <FormControl maxW="150px">
          <FormLabel
            htmlFor="rows-per-page"
            mb={1}
            fontSize="sm"
            color="gray.600"
          >
            عدد الصفوف في كل صفحة
          </FormLabel>
          <Select
            id="rows-per-page"
            value={rowsPerPage}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setRowsPerPage(Number(e.target.value))
            }
            size="sm"
            title="اختر عدد الصفوف في كل صفحة"
            aria-label="اختر عدد الصفوف في كل صفحة"
            aria-describedby="rows-per-page-description"
          >
            <option value={10}>10 صفوف</option>
            <option value={25}>25 صفوف</option>
            <option value={50}>50 صفوف</option>
          </Select>
        </FormControl>
      </Flex>

      {/* Table Container */}
      <ChakraTableContainer>
        <ChakraTable variant="simple">
          <ChakraThead>
            <ChakraTr>
              {columns.map((column) => (
                <ChakraTh key={column.key}>{column.label}</ChakraTh>
              ))}
            </ChakraTr>
          </ChakraThead>
          <ChakraTbody>
            {data.map((row, index) => (
              <ChakraTr key={index}>
                {columns.map((column) => (
                  <ChakraTd key={column.key}>{row[column.key]}</ChakraTd>
                ))}
              </ChakraTr>
            ))}
          </ChakraTbody>
        </ChakraTable>
      </ChakraTableContainer>

      {/* Pagination Controls */}
      <Flex mt={4} justify="space-between" align="center">
        <Text>
          صفحة {currentPage} من {totalPages}
        </Text>
        <Flex>
          <IconButton
            aria-label="Previous page"
            icon={<FiChevronRight size={20} />}
            onClick={() => onPageChange?.(currentPage - 1)}
            isDisabled={currentPage === 1}
            mr={2}
          />
          <IconButton
            aria-label="Next page"
            icon={<FiChevronLeft size={20} />}
            onClick={() => onPageChange?.(currentPage + 1)}
            isDisabled={currentPage === totalPages}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default DataTable;
