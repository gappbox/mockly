import { forwardRef } from 'react';

const NorthIcon = forwardRef((props, ref: any) => (
  <svg {...props} width="24px" height="24px" fill="currentColor" viewBox="0 0 24 24" ref={ref}>
    <path fillRule="evenodd" clipRule="evenodd" d="M11.0001 22.2877H13.0001V7.80237L16.2428 11.045L17.657 9.63079L12.0001 3.97394L6.34326 9.63079L7.75748 11.045L11.0001 7.80236V22.2877ZM18 3H6V1H18V3Z" fill="currentColor"></path>
  </svg>
));

export default NorthIcon;