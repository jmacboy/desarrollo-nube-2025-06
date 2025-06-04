import React from "react";

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  footer,
  className,
}) => {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg shadow-sm p-4 ${className}`}
    >
      {(title || subtitle) && (
        <div className="mb-3">
          {title && (
            <h5 className="text-lg font-semibold text-gray-800">{title}</h5>
          )}
          {subtitle && <h6 className="text-sm text-gray-500">{subtitle}</h6>}
        </div>
      )}
      <div className="text-gray-700 mb-3">{children}</div>
      {footer && (
        <div className="pt-3 border-t border-gray-200 text-sm text-gray-600">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
