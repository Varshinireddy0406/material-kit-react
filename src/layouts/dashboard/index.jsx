import { School, ExitToApp } from '@mui/icons-material';

const getIcon = (name) => {
  switch (name) {
    case 'school':
      return <School />;
    case 'logout':
      return <ExitToApp />;
    default:
      return null;
  }
};
