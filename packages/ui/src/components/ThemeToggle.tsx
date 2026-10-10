import { IconButton, Tooltip } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export const ThemeToggle = () => {
  const { mode, systemMode, setMode } = useColorScheme();
  if (!mode) return null;
  const current = mode === 'system' ? systemMode : mode;
  const next = current === 'dark' ? 'light' : 'dark';

  return (
    <Tooltip title={`Switch to ${next} mode`}>
      <IconButton color="inherit" aria-label="toggle theme" onClick={() => setMode(next)}>
        {current === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
};
