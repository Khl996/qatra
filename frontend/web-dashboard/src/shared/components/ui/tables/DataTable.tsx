import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Text,
  Box
} from '@chakra-ui/react';

interface Column {
  header: string;
  accessor: string;
  render?: (value: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  isLoading?: boolean;
  emptyMessage?: string;
}

const DataTable = ({ columns, data, isLoading, emptyMessage = "لا توجد بيانات للعرض" }: DataTableProps) => {
  if (isLoading) {
    return <Box textAlign="center" py={8}><Spinner /></Box>;
  }

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          {columns.map((column) => (
            <Th key={column.accessor}>{column.header}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data.length > 0 ? (
          data.map((row, index) => (
            <Tr key={index}>
              {columns.map((column) => (
                <Td key={column.accessor}>
                  {column.render ? column.render(row[column.accessor]) : row[column.accessor]}
                </Td>
              ))}
            </Tr>
          ))
        ) : (
          <Tr>
            <Td colSpan={columns.length}>
              <Text textAlign="center" color="gray.500">{emptyMessage}</Text>
            </Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  );
};

export default DataTable;
