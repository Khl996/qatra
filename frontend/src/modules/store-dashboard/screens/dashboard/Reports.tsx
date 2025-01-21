import { Card } from '@/shared/components';

export const Reports = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">التقرير المالي</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">إجمالي المبيعات</span>
            <span className="font-bold">15,000 ريال</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">العمولة المستحقة</span>
            <span className="font-bold text-red-600">750 ريال</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">صافي الربح</span>
            <span className="font-bold text-green-600">14,250 ريال</span>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">أحدث العمليات</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between items-center pb-2 border-b">
              <div>
                <p className="font-medium">عملية #{1000 + i}</p>
                <p className="text-sm text-gray-500">قبل {i} ساعات</p>
              </div>
              <span className="font-bold">100 نقطة</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
