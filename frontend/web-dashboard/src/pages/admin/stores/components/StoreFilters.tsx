import { Card, CardBody, Stack, HStack, InputGroup, InputLeftElement, Input, Select, IconButton } from '@chakra-ui/react';
import { FiSearch, FiFilter } from 'react-icons/fi';

interface StoreFiltersProps {
  onFilterChange: (filters: any) => void;
}

export const StoreFilters = ({ onFilterChange }: StoreFiltersProps) => {
  return (
    <Card>
      <CardBody>
        <Stack spacing={4}>
          <HStack>
            <InputGroup maxW="320px">
              <InputLeftElement pointerEvents="none">
                <FiSearch />
              </InputLeftElement>
              <Input 
                placeholder="البحث عن متجر..." 
                onChange={(e) => onFilterChange({ search: e.target.value })}
              />
            </InputGroup>
            <Select 
              placeholder="نوع المتجر" 
              maxW="200px"
              onChange={(e) => onFilterChange({ type: e.target.value })}
            >
              <option value="cafe">مقهى</option>
              <option value="restaurant">مطعم</option>
              <option value="retail">متجر</option>
            </Select>
            <Select 
              placeholder="الحالة" 
              maxW="200px"
              onChange={(e) => onFilterChange({ status: e.target.value })}
            >
              <option value="active">نشط</option>
              <option value="pending">قيد المراجعة</option>
              <option value="suspended">موقوف</option>
            </Select>
            <IconButton
              aria-label="فلترة متقدمة"
              icon={<FiFilter />}
              variant="outline"
            />
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  );
};
