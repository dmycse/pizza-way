'use client';

import { Ingredient, ProductOption } from '@prisma/client';
import { variantPizzaTypes } from '@/prisma/constants';
import { mapPizzaType, type PizzaSize, type PizzaType } from '@/prisma/prisma-types';
import { IngredientItem, PizzaImage, PizzaSelector, Title } from '@/components/shared';
import { cn, getTotalPizzaPrice } from '@/lib';
import { usePizzaVariants } from '@/hooks';
import { Button } from '@/components/ui';

type ChoosePizzaProps = {
  name: string;
  imageUrl: string;
  ingredients: Ingredient[];
  options: ProductOption[];
  loading?: boolean;
  onSubmit: (optionId: number, ingredients: number[]) => void;
  className?: string;
};

/**
 * Component (modal window): choose pizza variants and ingredients
 * 
 * Used in: ProductSelection -> /components/products/product-selection.tsx
 */

export const ChoosePizza = ({
  name, 
  imageUrl, 
  ingredients, 
  options, 
  loading, 
  onSubmit,
  className 
  }: ChoosePizzaProps) => {

    const {
      selectedSize,
      selectedType,
      selectedIngredients,
      availablePizzaSizes,
      currentItemId,
      setSelectedSize,
      setSelectedType,
      addIngredient
    } = usePizzaVariants(options);
  
  const textDetaills = `Pizza: ${selectedSize} sm, ${mapPizzaType[selectedType]} crust`;

  const selectedIngredientsDetails = ingredients
                                    .filter(item => selectedIngredients.has(item.id))
                                    .map(item => item.name.toLowerCase()).join(', ');

  const totalPrice = getTotalPizzaPrice(selectedType, selectedSize, options, ingredients, selectedIngredients);

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients));
    }
  };

  return (
    <div className={cn(className, 'm-auto flex-1 flex')}>
      <div className="py-6 px-1 w-[440px] flex flex-col justify-center items-center gap-4">
        <PizzaImage imageUrl={imageUrl} pizzaSize={selectedSize} />
        <Button
          loading={loading}
          onClick={handleClickAdd}
          disabled={totalPrice === 0}
          className="mt-6 px-10 w-8/12 h-11 text-base text-brand rounded-xl
                   bg-white border border-brand hover:bg-brand hover:text-white
                   disabled:border-gray-500 disabled:text-gray-500 disabled:bg-"
        >
          Add to cart &#8364;{totalPrice.toFixed(2)} 
        </Button>
      </div>

      <div className="p-6 pl-0 max-w-[400px] max-h-[600px] flex-1 flex flex-col gap-1">
        <Title text={name} size="md" className="font-extrabold" />

        <p className="pl-1 h-6 text-gray-400">{textDetaills}</p>
        <p className="pl-1 h-10 text-gray-400 text-sm">{selectedIngredientsDetails}</p>

        <div className="mt-1 mb-1 flex flex-col gap-3">
          <PizzaSelector
            items={availablePizzaSizes}
            value={String(selectedSize)}
            onClick={value => setSelectedSize(Number(value) as PizzaSize)}
          />

          <PizzaSelector
            items={variantPizzaTypes}
            value={String(selectedType)}
            onClick={value => setSelectedType(Number(value) as PizzaType)}
          />
        </div>

        <div className="p-3 bg-gray-50 rounded-md overflow-auto scrollbar">
          <div className="grid grid-cols-3 gap-2">
            {ingredients.map(ingredient => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                imageUrl={ingredient.imageUrl}
                price={ingredient.price}
                active={selectedIngredients.has(ingredient.id)}
                onClick={() => addIngredient(ingredient.id)}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};