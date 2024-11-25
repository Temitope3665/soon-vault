import { cn } from '@/libs/utils';
import Image from 'next/image';

const EmptyData = ({ title, description, className }: { title: string; description: string; className?: string }) => {
  return (
    <div className={cn('w-full', className)}>
      <Image src="/no-document.png" priority alt="empty" width={650} height={650} className="w-[650px] md:w-[120px] mx-auto" />
      <p className="text-center text-white font-medium text-base">{title}</p>
      <p className="text-center font-light text-sm text-[#999999]">{description}</p>
    </div>
  );
};

export default EmptyData;
