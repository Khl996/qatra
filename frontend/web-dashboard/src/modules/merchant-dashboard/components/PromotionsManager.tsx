import { useState } from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  CardActions,
  Switch,
  FormControlLabel
} from '@mui/material';
import { useGetPromotionsQuery, useUpdatePromotionMutation } from '../services/api';
import AddPromotionModal from './AddPromotionModal';

interface Promotion {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  requiredPoints: number;
}

export function PromotionsManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: promotions = [] } = useGetPromotionsQuery();
  const [updatePromotion] = useUpdatePromotionMutation();

  const handleStatusChange = (id: string, isActive: boolean) => {
    updatePromotion({
      id,
      data: { isActive }
    });
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">إدارة العروض الترويجية</Typography>
          <Button variant="contained" onClick={() => setIsModalOpen(true)}>
            إضافة عرض جديد
          </Button>
        </Grid>
        
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {promotions.map((promo: Promotion) => (
              <Grid item xs={12} md={4} key={promo.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{promo.title}</Typography>
                    <Typography color="textSecondary">{promo.description}</Typography>
                    <Typography>النقاط المطلوبة: {promo.requiredPoints}</Typography>
                  </CardContent>
                  <CardActions>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={promo.isActive}
                          onChange={(e) => handleStatusChange(promo.id, e.target.checked)}
                        />
                      }
                      label={promo.isActive ? 'نشط' : 'غير نشط'}
                    />
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      
      <AddPromotionModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Paper>
  );
}
