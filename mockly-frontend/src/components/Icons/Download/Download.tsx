import { forwardRef } from 'react';

const DownloadIcon = forwardRef((props, ref: any) => (
  <svg {...props} width="24px" height="24px" fill="currentColor" viewBox="0 0 24 24" ref={ref}>
    <path d="M5 20h14v-2H5zM19 9h-4V3H9v6H5l7 7z"></path>
  </svg>
));

export default DownloadIcon;