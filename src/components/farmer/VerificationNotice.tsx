import React from 'react';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import Card from '../common/Card';

interface VerificationNoticeProps {
  status: 'pending' | 'approved' | 'rejected';
  message?: string;
  timestamp?: string;
}

const VerificationNotice: React.FC<VerificationNoticeProps> = ({
  status,
  message,
  timestamp
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          icon: <AlertCircle className="h-6 w-6 text-amber-500" />,
          bgColor: 'bg-amber-50',
          textColor: 'text-amber-700',
          borderColor: 'border-amber-200',
          defaultMessage: 'Your honey sample is being tested. This process typically takes 2-3 business days.'
        };
      case 'approved':
        return {
          icon: <CheckCircle className="h-6 w-6 text-[#8fce90]" />,
          bgColor: 'bg-[#8fce90]/10',
          textColor: 'text-[#8fce90]',
          borderColor: 'border-[#8fce90]/20',
          defaultMessage: 'Congratulations! Your honey has been verified and approved for export.'
        };
      case 'rejected':
        return {
          icon: <XCircle className="h-6 w-6 text-red-500" />,
          bgColor: 'bg-red-50',
          textColor: 'text-red-700',
          borderColor: 'border-red-200',
          defaultMessage: 'Your honey sample did not meet our quality standards. Please review the feedback and submit a new sample.'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Card className={`${config.bgColor} border ${config.borderColor}`}>
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {config.icon}
          </div>
          <div className="ml-3">
            <p className={`text-sm font-medium ${config.textColor}`}>
              {message || config.defaultMessage}
            </p>
            {timestamp && (
              <p className="mt-1 text-xs text-gray-500">
                {timestamp}
              </p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VerificationNotice; 