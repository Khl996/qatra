import { Card } from '@/shared/components';

export const Overview = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <h2 className="text-lg font-bold mb-4">طلبات المتاجر الجديدة</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">متجر السعادة</h3>
                <p className="text-sm text-gray-500">
                  تاريخ الطلب: {new Date().toLocaleDateString('ar-SA')}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-green-100 text-green-600 rounded-lg text-sm">
                  قبول
                </button>
                <button className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm">
                  رفض
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-bold mb-4">آخر العمليات</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">استبدال نقاط</h3>
                <p className="text-sm text-gray-500">
                  متجر البركة - أحمد محمد
                </p>
              </div>
              <span className="text-blue-600 font-medium">500 نقطة</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
