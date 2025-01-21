import { useState } from 'react';
import { Card, Input, Button } from '@/shared/components';
import Image from 'next/image';

interface CreateAdProps {
  onClose: () => void;
}

export const CreateAd = ({ onClose }: CreateAdProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
          <h2 className="text-lg font-bold">إضافة إعلان جديد</h2>
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            {selectedImage ? (
              <div className="relative h-48">
                <Image
                  src={selectedImage}
                  alt="صورة الإعلان"
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="py-8">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer text-blue-600"
                >
                  اختر صورة الإعلان
                </label>
              </div>
            )}
          </div>

          <Input
            label="عنوان الإعلان"
            placeholder="أدخل عنوان الإعلان"
            required
          />

          <Input
            label="الوصف"
            placeholder="أدخل وصف الإعلان"
            as="textarea"
            rows={3}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="تاريخ البداية"
              type="date"
              required
            />
            <Input
              label="تاريخ النهاية"
              type="date"
              required
            />
          </div>

          <div className="flex gap-2 justify-end">
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
              نشر الإعلان
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
