import {
  Card,
  CardBody,
  Stack,
  HStack,
  Select,
  Input,
  IconButton,
  Collapse,
  Button,
  SimpleGrid,
} from '@chakra-ui/react';
import { FiFilter, FiX } from 'react-icons/fi';
import { useState } from 'react';

interface ReportFiltersProps {
  onDateRangeChange: (range: { start: Date | null; end: Date | null }) => void;
  onFilterChange: (filters: any) => void;
}

const ReportFilters = ({ onDateRangeChange, onFilterChange }: ReportFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card>
      <CardBody>
        <Stack spacing={4}>
          <HStack>
            <Input
              type="date"
              placeholder="من تاريخ"
              onChange={(e) => onDateRangeChange({ start: new Date(e.target.value), end: null })}
            />
            <Input
              type="date"
              placeholder="إلى تاريخ"
              onChange={(e) => onDateRangeChange({ start: null, end: new Date(e.target.value) })}
            />
            <IconButton
              aria-label="فلترة متقدمة"
              icon={isExpanded ? <FiX /> : <FiFilter />}
              onClick={() => setIsExpanded(!isExpanded)}
            />
          </HStack>

          <Collapse in={isExpanded}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} pt={4}>
              <Select placeholder="المنطقة">
                <option value="riyadh">الرياض</option>
                <option value="jeddah">جدة</option>
                <option value="dammam">الدمام</option>
              </Select>
              <Select placeholder="نوع المتجر">
                <option value="restaurant">مطعم</option>
                <option value="cafe">مقهى</option>
                <option value="retail">متجر</option>
              </Select>
              <Select placeholder="حالة المتجر">
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
              </Select>
            </SimpleGrid>
            <HStack justify="flex-end" pt={4}>
              <Button size="sm" onClick={() => onFilterChange({})}>
                إعادة تعيين
              </Button>
              <Button size="sm" colorScheme="blue">
                تطبيق
              </Button>
            </HStack>
          </Collapse>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ReportFilters;
