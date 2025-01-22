export const mockMerchantStats = {
  totalPoints: 15000,
  activeCustomers: 250,
  averagePoints: 60,
  redeemedOffers: 120,
  pointsGrowth: 15,
  customerGrowth: 8,
  offersGrowth: 12,
  totalSales: 50000,
  salesGrowth: 10,
  monthlyPointsActivity: {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
    datasets: [{
      label: 'النقاط',
      data: [1200, 1900, 1500, 2500, 2200, 3000]
    }]
  },
  pointsDistribution: {
    labels: ['مطاعم', 'متاجر', 'خدمات'],
    datasets: [{
      data: [300, 200, 100],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
  }
};

export const mockStores = [
  { id: 1, name: 'متجر 1', email: 'store1@example.com', phone: '0500000001', status: 'active' },
  { id: 2, name: 'متجر 2', email: 'store2@example.com', phone: '0500000002', status: 'inactive' }
];
