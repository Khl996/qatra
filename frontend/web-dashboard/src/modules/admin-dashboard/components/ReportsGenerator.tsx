import { useState } from 'react';
import { Box, Paper, Grid, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useGenerateReportMutation } from '@shared/services/reports';
import { LoadingState } from '@shared/components/LoadingState';
import { ReportType, ReportParams } from '../services/api';

export function ReportsGenerator() {
  const [generateReport, { isLoading }] = useGenerateReportMutation();
  const [reportConfig, setReportConfig] = useState<ReportParams>({
    type: 'daily' as ReportType,
    startDate: '',
    endDate: '',
    format: 'pdf'
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
                onChange={(e) => setReportConfig({ ...reportConfig, type: e.target.value as ReportType })}
              >
                <MenuItem value="daily">يومي</MenuItem>
                <MenuItem value="monthly">شهري</MenuItem>
                <MenuItem value="yearly">سنوي</MenuItem>
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
