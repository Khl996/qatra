import { HStack, Input, Select } from '@chakra-ui/react';

interface TableFiltersProps {
  showSearch?: boolean;
  showDateRange?: boolean;
  onDateRangeChange?: (range: { start: string; end: string }) => void;
  onSearch: (value: string) => void;
  onFilterChange?: (filter: string) => void;
  filters?: { value: string; label: string }[];
}

const TableFilters: React.FC<TableFiltersProps> = ({ 
  showSearch, 
  showDateRange, 
  onDateRangeChange,
  onSearch, 
  onFilterChange, 
  filters 
}) => {
  return (
    <HStack spacing={4}>
      {showSearch && (
        <Input
          placeholder="بحث..."
          onChange={(e) => onSearch(e.target.value)}
          maxW="300px"
        />
      )}
      {filters && (
        <Select
          onChange={(e) => onFilterChange?.(e.target.value)}
          maxW="200px"
          placeholder="تصفية حسب..."
        >
          {filters.map((filter) => (
            <option key={filter.value} value={filter.value}>
              {filter.label}
            </option>
          ))}
        </Select>
      )}
    </HStack>
  );
};

export default TableFilters;
