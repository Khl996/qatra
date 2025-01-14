import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Navbar from '../../../shared/components/Navbar';
import api from '../../../shared/api/config';
import { Offer } from '../../../shared/types';

const ManageOffers: NextPage = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [newOffer, setNewOffer] = useState({
    title: '',
    description: '',
    pointsRequired: '',
    validUntil: '',
  });

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await api.get('/store/offers');
      setOffers(response.data);
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/store/offers', newOffer);
      fetchOffers();
      setNewOffer({
        title: '',
        description: '',
        pointsRequired: '',
        validUntil: '',
      });
    } catch (error) {
      console.error('Error creating offer:', error);
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
        <h1 className="text-3xl font-bold mb-8 text-right">إدارة العروض</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4 text-right">إضافة عرض جديد</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-right mb-2">عنوان العرض</label>
                <input
                  type="text"
                  value={newOffer.title}
                  onChange={(e) => setNewOffer({...newOffer, title: e.target.value})}
                  className="w-full p-2 border rounded text-right"
                  required
                />
              </div>
              
              <div>
                <label className="block text-right mb-2">الوصف</label>
                <textarea
                  value={newOffer.description}
                  onChange={(e) => setNewOffer({...newOffer, description: e.target.value})}
                  className="w-full p-2 border rounded text-right"
                  rows={3}
                  required
                />
              </div>
              
              <div>
                <label className="block text-right mb-2">النقاط المطلوبة</label>
                <input
                  type="number"
                  value={newOffer.pointsRequired}
                  onChange={(e) => setNewOffer({...newOffer, pointsRequired: e.target.value})}
                  className="w-full p-2 border rounded text-right"
                  required
                />
              </div>
              
              <div>
                <label className="block text-right mb-2">تاريخ الانتهاء</label>
                <input
                  type="date"
                  value={newOffer.validUntil}
                  onChange={(e) => setNewOffer({...newOffer, validUntil: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                إضافة العرض
              </button>
            </form>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4 text-right">العروض الحالية</h2>
            <div className="space-y-4">
              {offers.map((offer) => (
                <div key={offer.id} className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-bold text-right">{offer.title}</h3>
                  <p className="text-gray-600 text-right">{offer.description}</p>
                  <div className="mt-2 text-right">
                    <span className="text-blue-600">النقاط المطلوبة: {offer.pointsRequired}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOffers;
