import { merge } from 'lodash';
import Typography from './Typography';

export default function ComponentsOverrides(theme) {
  return merge(Typography(theme));
}
