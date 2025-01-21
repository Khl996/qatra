import { useState } from 'react';
import { Card, Input, Button } from '@/shared/components';

export const CreateOffer = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement API call
    setTimeout(() => {
      setIsLoading(false);
      // Reset form and show success message
    }, 1500);
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-bold mb-4">إضافة عرض جديد</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="عنوان العرض"
          placeholder="مثال: خصم 50% على القهوة"
          required
        />
        
        <Input
          label="تفاصيل العرض"
          placeholder="اكتب تفاصيل العرض..."
          as="textarea"
          rows={3}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="النقاط المطلوبة"
            type="number"
            placeholder="500"
            required
          />
          
          <Input
            label="عدد العروض المتاحة"
            type="number"
            placeholder="100"
            required
          />
        </div>

        <Input
          label="تاريخ انتهاء العرض"
          type="date"
          required
        />

        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full"
        >
          نشر العرض
        </Button>
      </form>
    </Card>
  );
};
