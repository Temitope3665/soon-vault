import { cn } from '@/libs/utils';

const EmptyData = ({ title, description, className }: { title: string; description: string; className?: string }) => {
  return (
    <div className="flex items-center">
      <div className={cn('w-full', className)}>
        <img src="/no-document.png" alt="empty" className="w-[70px] lg:w-[150px] mx-auto" />
        <p className="text-center text-white font-medium text-base">{title}</p>
        <p className="text-center font-light text-sm text-[#999999]">{description}</p>
      </div>
    </div>
  );
};

export default EmptyData;
