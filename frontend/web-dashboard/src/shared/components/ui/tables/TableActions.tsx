import { HStack, IconButton, Tooltip } from '@chakra-ui/react';
import { FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';

interface TableActionsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const TableActions = ({ onView, onEdit, onDelete }: TableActionsProps) => {
  return (
    <HStack spacing={2}>
      {onView && (
        <Tooltip label="عرض">
          <IconButton aria-label="عرض" icon={<FiEye />} size="sm" onClick={onView} />
        </Tooltip>
      )}
      {onEdit && (
        <Tooltip label="تعديل">
          <IconButton aria-label="تعديل" icon={<FiEdit2 />} size="sm" onClick={onEdit} />
        </Tooltip>
      )}
      {onDelete && (
        <Tooltip label="حذف">
          <IconButton aria-label="حذف" icon={<FiTrash2 />} size="sm" onClick={onDelete} />
        </Tooltip>
      )}
    </HStack>
  );
};

export default TableActions;
