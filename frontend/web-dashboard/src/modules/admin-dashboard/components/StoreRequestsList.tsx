import React from 'react';
import { Paper, Typography, Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetStoresQuery } from '../services/api';

interface StoreRequest {
  id: string;
  storeName: string;
  ownerName: string;
  email: string;
  phone: string;
  category: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

interface StoreRequestsListProps {
  requests: StoreRequest[];
  onApprove: (requestId: string) => void;
  onReject: (requestId: string) => void;
}

export const StoreRequestsList: React.FC<StoreRequestsListProps> = ({
  requests,
  onApprove,
  onReject,
}) => {
  const { data: stores, isLoading } = useGetStoresQuery({});

  if (isLoading) {
    return <Typography>جاري التحميل...</Typography>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-right bg-gray-50">اسم المتجر</th>
            <th className="px-6 py-3 text-right bg-gray-50">اسم المالك</th>
            <th className="px-6 py-3 text-right bg-gray-50">البريد الإلكتروني</th>
            <th className="px-6 py-3 text-right bg-gray-50">رقم الجوال</th>
            <th className="px-6 py-3 text-right bg-gray-50">التصنيف</th>
            <th className="px-6 py-3 text-right bg-gray-50">الإجراءات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {requests.map((request) => (
            <tr key={request.id}>
              <td className="px-6 py-4">{request.storeName}</td>
              <td className="px-6 py-4">{request.ownerName}</td>
              <td className="px-6 py-4">{request.email}</td>
              <td className="px-6 py-4">{request.phone}</td>
              <td className="px-6 py-4">{request.category}</td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => onApprove(request.id)}
                    className="px-4 py-2 text-sm text-white bg-green-500 rounded hover:bg-green-600"
                  >
                    قبول
                  </button>
                  <button
                    onClick={() => onReject(request.id)}
                    className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    رفض
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
