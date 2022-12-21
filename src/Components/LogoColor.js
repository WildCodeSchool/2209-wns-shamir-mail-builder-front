import PropTypes from 'prop-types';

import { Box } from '@mui/material';

export default function LogoColor({ sx }) {
  return <Box component="img" src="/static/Logo_color.png" sx={{ width: '50%', ...sx }} />;
}

LogoColor.propTypes = {
  sx: PropTypes.oneOfType([PropTypes.objectOf(PropTypes.any), PropTypes.arrayOf(PropTypes.any)]),
};
