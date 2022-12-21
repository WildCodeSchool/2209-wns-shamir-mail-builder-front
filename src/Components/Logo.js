import PropTypes from 'prop-types';

import { Box } from '@mui/material';

export default function Logo({ sx }) {
  return <Box component="img" src="/static/Logo.png" sx={{ width: '50%', ...sx }} />;
}

Logo.propTypes = {
  sx: PropTypes.oneOfType([PropTypes.objectOf(PropTypes.any), PropTypes.arrayOf(PropTypes.any)]),
};
