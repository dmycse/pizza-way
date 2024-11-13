import { useEffect, useState } from "react";
import { useSet } from "react-use";
import { ProductOption } from "@prisma/client";
import { PizzaSize, PizzaType } from "@/prisma/prisma-types";
import type { PizzaVariant } from '@/components/shared/pizzas/pizza-selector';
import { getAvailablePizzaSizes } from "@/lib";

type ReturnProps = {
  selectedSize: PizzaSize;
  selectedType: PizzaType;
  selectedIngredients: Set<number>;
  availablePizzaSizes: PizzaVariant[];
  currentItemId?: number;
  setSelectedSize: (size: PizzaSize) => void;
  setSelectedType: (type: PizzaType) => void;
  addIngredient: (id: number) => void;
};

/**
 * Hook: handling choosing pizza variants
 * 
 * Used in: ChoosePizza -> /components/shared/pizzas
 * @param   {ProductOption[]} options
 * @returns {ReturnProps} props:
 * @prop    {number} [selectedSize] - selected size of a pizza
 * @prop    {number} [selectedType] - selected cruct type of a pizza
 * @prop    {Set<number>} [selectedIngredients] - selected ingredients for pizza sumplements
 * @prop    {PizzaVariant[]} [availableSizes] - array of pizza sizes depends of selected crust type
 * @prop    {number} [currentItemId] - product id of a pizza depends on of selected size and selected crust type
 * @prop    {Function} [setSelectedSize] - function for changing a size of a pizza
 * @prop    {Function} [setSelectedType] - function for changing a crust type a pizza 
 * @prop    {Function} [addIngredient] - function for adding selected ingredients
 */

export const usePizzaVariants = (options: ProductOption[]): ReturnProps => {

  let [selectedSize, setSelectedSize] = useState<PizzaSize>(25);
  let [selectedType, setSelectedType] = useState<PizzaType>(1);
  let [selectedIngredients, {toggle: addIngredient}] = useSet(new Set<number>([]));

  let availablePizzaSizes = getAvailablePizzaSizes(selectedType, options);

  let currentItemId = options.find(item => item.pizzaType === selectedType && item.pizzaSize === selectedSize)?.productId;

  useEffect(() => {
    let isSelectedSizeAvailable = availablePizzaSizes?.find(
      item => +item.value === selectedSize && !item.disabled
    );
   
    let firstAvailableSize = availablePizzaSizes?.find(item => !item.disabled);
    
    if (!isSelectedSizeAvailable && firstAvailableSize) {
      setSelectedSize(+firstAvailableSize.value as PizzaSize);
    }
  }, [selectedType]);


  return {
    selectedSize,
    selectedType,
    selectedIngredients,
    availablePizzaSizes,
    currentItemId,
    setSelectedSize,
    setSelectedType,
    addIngredient
  };
};