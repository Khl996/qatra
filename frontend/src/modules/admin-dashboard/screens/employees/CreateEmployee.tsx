import { useState } from 'react';
import { Card, Input, Button } from '@/shared/components';

interface CreateEmployeeProps {
  onClose: () => void;
}

const roles = [
  { id: 'admin', label: 'مدير' },
  { id: 'support', label: 'دعم فني' },
  { id: 'moderator', label: 'مشرف' }
];

export const CreateEmployee = ({ onClose }: CreateEmployeeProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement API call
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">إضافة موظف جديد</h2>
          <button onClick={onClose} className="text-gray-500">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="الاسم الكامل"
            placeholder="أدخل اسم الموظف"
            required
          />
          
          <Input
            label="البريد الإلكتروني"
            type="email"
            placeholder="أدخل البريد الإلكتروني"
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              الصلاحية
            </label>
            <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
              {roles.map(role => (
                <option key={role.id} value={role.id}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="كلمة المرور"
            type="password"
            placeholder="أدخل كلمة المرور"
            required
          />

          <div className="flex gap-2 justify-end mt-6">
            <Button
              variant="outline"
              onClick={onClose}
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
            >
              إضافة
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
