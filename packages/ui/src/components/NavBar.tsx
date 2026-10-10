import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { ThemeToggle } from './ThemeToggle';
import { NavLink } from 'react-router-dom';
import type { ILink } from '../models/navbar.model';

export const NavBar = ({ pages }: { pages: ILink[] }) => {
  return (
    <AppBar sx={{ position: 'relative' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={NavLink}
            to="/"
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              fontWeight: 700,
              flexGrow: { xs: 1, md: 0 },
              mr: { md: 4 },
            }}
          >
            Repo Radar
          </Typography>

          <Box sx={{ display: { md: 'flex' }, gap: 1, flexGrow: 1 }}>
            {pages.map((page) => (
              <Button
                key={page.to}
                component={NavLink}
                to={page.to}
                color="inherit"
                sx={{ '&.active': { borderBottom: '2px solid #fff', borderRadius: 0 } }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          <ThemeToggle />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
