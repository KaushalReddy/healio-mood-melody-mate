
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  to: string;
  className?: string;
}

const FeatureCard = ({ title, description, icon, to, className }: FeatureCardProps) => {
  return (
    <Link to={to} className="block">
      <div className={cn(
        "healio-card p-6 h-full flex flex-col", 
        className
      )}>
        <div className="h-12 w-12 healio-gradient rounded-lg flex items-center justify-center text-white mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 flex-grow">{description}</p>
      </div>
    </Link>
  );
};

export default FeatureCard;
