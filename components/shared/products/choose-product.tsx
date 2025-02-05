import { cn } from '@/lib/utils';
import { ProductImage, Title } from '@/components/shared';
import { Button } from '@/components/ui';

type ChooseProductProps = {
  name: string;
  imageUrl: string;
  price: number;
  loading?: boolean;
  onSubmit?: VoidFunction;
  className?: string;
}

/**
 * Component: Choose product variant
 *
 * Parent component: ProducSelection -> /components/products/product-selection.tsx
 */


export const ChooseProduct = ({
  name,
  imageUrl,
  price,
  loading,
  onSubmit,
  className,
}: ChooseProductProps) => {

  return (
    <div className={cn(className, 'flex-1 flex')}>
      <ProductImage imageUrl={imageUrl}  />

      <div className="p-7 w-[490px] bg-[#f7f6f5]">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <Button
          loading={loading}
          onClick={() => onSubmit?.()}
          className={cn("mt-10 px-10 w-full h-11 text-base text-brand rounded-[18px] bg-white border border-brand hover:bg-brand hover:text-white",
            { 'opacity-50 disabled:bg-white': loading }
          )}>
          Add to cart &#8364;{price}
        </Button>
      </div>
    </div>
  );
};