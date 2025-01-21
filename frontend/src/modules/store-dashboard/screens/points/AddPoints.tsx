import { useState } from 'react';
import { Card, Input, Button } from '@/shared/components';

export const AddPoints = () => {
  const [userInfo, setUserInfo] = useState<{
    name?: string;
    points?: number;
    found: boolean;
  }>({ found: false });
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (phone: string) => {
    setIsLoading(true);
    // TODO: Implement API call
    setTimeout(() => {
      setUserInfo({
        name: 'أحمد محمد',
        points: 1500,
        found: true
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleAddPoints = async (amount: number) => {
    setIsLoading(true);
    // TODO: Implement API call
    setTimeout(() => {
      setIsLoading(false);
      setUserInfo({ found: false });
      // Show success message
    }, 1000);
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-bold mb-4">إضافة نقاط</h2>
      <div className="space-y-4">
        <Input
          label="رقم الجوال"
          placeholder="أدخل رقم جوال العميل"
          onBlur={(e) => handleSearch(e.target.value)}
        />

        {userInfo.found && (
          <>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="font-medium">اسم العميل: {userInfo.name}</p>
              <p className="text-gray-600">النقاط الحالية: {userInfo.points}</p>
            </div>

            <Input
              label="مبلغ الفاتورة"
              type="number"
              placeholder="أدخل مبلغ الفاتورة"
            />

            <Button
              onClick={() => handleAddPoints(100)}
              isLoading={isLoading}
              className="w-full"
            >
              إضافة النقاط
            </Button>
          </>
        )}
      </div>
    </Card>
  );
};
