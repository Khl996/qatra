import { Grid, Paper, Typography } from '@mui/material';
import { DoughnutChart, AnalyticsChart, StatCard } from '@shared/components/charts';
import { DashboardLayout } from '@shared/components/layouts';
import { useGetMerchantStatsQuery } from '@merchant/services/api';
import DetailedStatistics from '@admin/components/DetailedStatistics';
import StoreReports from '@merchant/components/StoreReports';

export default function Dashboard() {
  const { data: stats, isLoading } = useGetMerchantStatsQuery();

  return (
    <DashboardLayout role="merchant">
      <Grid container spacing={3}>
        {/* إحصائيات سريعة */}
        <Grid item xs={12} md={3}>
          <StatCard 
            title="إجمالي النقاط"
            value={stats?.totalPoints || 0}
            percentage={stats?.pointsGrowth}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard 
            title="العملاء النشطين"
            value={stats?.activeCustomers || 0}
            percentage={stats?.customerGrowth}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard 
            title="متوسط النقاط للعميل"
            value={stats?.averagePoints || 0}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard 
            title="العروض المستخدمة"
            value={stats?.redeemedOffers || 0}
            percentage={stats?.offersGrowth}
          />
        </Grid>

        {/* الرسوم البيانية */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              نشاط النقاط الشهري
            </Typography>
            <AnalyticsChart
              type="line"
              data={stats?.monthlyPointsActivity || { labels: [], datasets: [] }}
              height={300}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              توزيع النقاط حسب الفئة
            </Typography>
            <DoughnutChart
              data={stats?.pointsDistribution || { labels: [], datasets: [] }}
              title="توزيع النقاط"
            />
          </Paper>
        </Grid>

        {/* تفاصيل إضافية */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              التحليل التفصيلي
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">أفضل العملاء</Typography>
                {/* قائمة أفضل العملاء */}
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">أكثر العروض استخداماً</Typography>
                {/* قائمة العروض الأكثر استخداماً */}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}