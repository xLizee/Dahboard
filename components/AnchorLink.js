import React from 'react';

const AnchorLink = ({ children, href, className, icon, tabIndex, testId }) => {
  return (
    <a href={href} className={className}>
        {children}
    </a>
  );
};

export default AnchorLink;
