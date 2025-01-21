import { Card } from '@/shared/components';

const employees = [
  {
    id: 1,
    name: 'محمد علي',
    email: 'mohammed@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-15T10:30:00'
  }
  // More employees...
];

export const EmployeesList = () => {
  const getRoleLabel = (role: string) => {
    const roles = {
      admin: 'مدير',
      support: 'دعم فني',
      moderator: 'مشرف'
    };
    return roles[role as keyof typeof roles] || role;
  };

  return (
    <Card className="p-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-right py-3">الموظف</th>
              <th className="text-right py-3">الصلاحية</th>
              <th className="text-right py-3">الحالة</th>
              <th className="text-right py-3">آخر تسجيل دخول</th>
              <th className="text-right py-3">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="border-b">
                <td className="py-4">
                  <div>
                    <p className="font-medium">{employee.name}</p>
                    <p className="text-sm text-gray-500">{employee.email}</p>
                  </div>
                </td>
                <td className="py-4">{getRoleLabel(employee.role)}</td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    employee.status === 'active'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {employee.status === 'active' ? 'نشط' : 'غير نشط'}
                  </span>
                </td>
                <td className="py-4 text-gray-500">
                  {new Date(employee.lastLogin).toLocaleString('ar-SA')}
                </td>
                <td className="py-4">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => console.log(`Edit ${employee.id}`)}
                    >
                      تعديل
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => console.log(`Deactivate ${employee.id}`)}
                    >
                      تعطيل
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
