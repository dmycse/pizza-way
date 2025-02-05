import { notFound } from 'next/navigation';
import { paymentDone } from '@/actions/payment_done';
import Link from 'next/link';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type SuccessOrderProps = {
  params: {
    id: string;
  },
  searchParams: { 
    userCartId: string;
    payment_intent: string;
  }  
};

/**
 * Shows a success page (modal window) for a paid order.
 * 
 * This component is called from OrderProcessing component -> /components/shared/order/order-processing.tsx
 * when a user successfully pays for an order.
 * 
 * When the page is loaded, it calls the {@link paymentDone} action with the order id and payment id.
 * If the action returns a valid order, it shows the order details has been updated in DB.
 * If the action does not return a valid order, it shows a 404 page.
 * 
 */
export default async function SuccessOrder({ 
  params: { id },
  searchParams: { userCartId, payment_intent }
  }: SuccessOrderProps) {
  
  const order = await paymentDone({ 
    userCartId: +userCartId, 
    orderId: +id, 
    paymentId: payment_intent
  });

  if (!order) {
    return notFound();
  };
   
  
  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent className='max-w-2xl bg-white border-4 border-brand outline-none'>
        <AlertDialogHeader>
          <AlertDialogTitle 
            className="mx-auto mb-2 text-primary text-4xl font-extrabold"
          >
            Thank you!
          </AlertDialogTitle>
          <AlertDialogDescription className="mb-4 flex flex-col items-center text-2xl space-y-4">
            <span className='text-brand'>You successfully paid €{order.sum} for your order #{order.id}</span>
            {/* <span className='text-brand'>Details of your order have been sent to your email.</span> */}
            <span>
              Would like to make a new order? {' '}
              <Link href="/" className='text-primary font-bold'>Click here</Link>
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className='mt-4 mx-auto'>
            <Link 
              href="/" 
              className='p-6 font-bold text-[1rem]'
            >
              OK
            </Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}