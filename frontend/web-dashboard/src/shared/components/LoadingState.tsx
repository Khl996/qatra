import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'جاري التحميل...' }: LoadingStateProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight={200}
    >
      <CircularProgress />
      <Typography sx={{ mt: 2 }} color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
}
