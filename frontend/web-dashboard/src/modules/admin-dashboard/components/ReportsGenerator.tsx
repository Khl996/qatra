import { useState } from 'react';
import { Box, Paper, Grid, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useGenerateReportMutation } from '@shared/services/reports';
import { LoadingState } from '@shared/components/LoadingState';

export function ReportsGenerator() {
  const [generateReport, { isLoading }] = useGenerateReportMutation();
  const [reportConfig, setReportConfig] = useState({
    type: '',
    startDate: '',
    endDate: '',
    format: 'PDF'
  });

  if (isLoading) return <LoadingState message="جاري إنشاء التقرير..." />;

  return (
    <Paper sx={{ p: 3 }}>
      <Box component="form" onSubmit={(e) => e.preventDefault()}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>نوع التقرير</InputLabel>
              <Select
                value={reportConfig.type}
                onChange={(e) => setReportConfig({ ...reportConfig, type: e.target.value })}
              >
                <MenuItem value="sales">المبيعات</MenuItem>
                <MenuItem value="points">النقاط</MenuItem>
                <MenuItem value="stores">المتاجر</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* ... باقي حقول النموذج ... */}
          <Grid item xs={12}>
            <Button 
              variant="contained" 
              onClick={() => generateReport(reportConfig)}
            >
              إنشاء التقرير
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
