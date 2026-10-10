import { Box, Paper, Typography } from '@mui/material';

export const Widget = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <Paper variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography
        className="drag-handle"
        variant="subtitle2"
        sx={{ p: 1, cursor: 'grab', borderBottom: 1, borderColor: 'divider' }}
      >
        {title}
      </Typography>
      <Box sx={{ flex: 1, minHeight: 0, p: 2, overflow: 'auto' }}>{children}</Box>
    </Paper>
  );
};
