import React, { useState } from 'react';
import { NextPage } from 'next';
import Navbar from '../../../shared/components/Navbar';
import api from '../../../shared/api/config';

const AddPoints: NextPage = () => {
  const [customerPhone, setCustomerPhone] = useState('');
  const [points, setPoints] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/store/add-points', {
        customerPhone,
        points: parseInt(points),
      });
      
      setMessage({ 
        type: 'success', 
        text: 'تم إضافة النقاط بنجاح' 
      });
      setCustomerPhone('');
      setPoints('');
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'حدث خطأ أثناء إضافة النقاط' 
      });
    }
  };

  return (
    <div>
      <Navbar 
        items={[
          { label: 'الرئيسية', href: '/store/dashboard' },
          { label: 'إضافة نقاط', href: '/store/add-points' },
          { label: 'إدارة العروض', href: '/store/offers' },
        ]}
      />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-right">إضافة نقاط</h1>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          {message.text && (
            <div className={`p-4 rounded mb-4 ${
              message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message.text}
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-right mb-2">رقم جوال العميل</label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full p-2 border rounded text-right"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-right mb-2">عدد النقاط</label>
            <input
              type="number"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              className="w-full p-2 border rounded text-right"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            إضافة النقاط
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPoints;
