import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useSWRConfig } from 'swr';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';

import type { Food } from '@/server/db/types';

const DeleteFood = ({ food }: { food: Food }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(false);
  const { mutate } = useSWRConfig();

  async function deleteFood() {
    setIsDeleting(true);
    toast.loading(`Deleting '${food.name}'`, {
      duration: 100000,
      id: 'delete-begin',
    });

    const res = await fetch('/api/food/' + food.id, {
      method: 'DELETE',
    });

    setIsDeleting(false);
    toast.dismiss('delete-begin');

    if (res.status !== 200) {
      const data = (await res.json()) as { message: string };
      toast.error(`Failed updating '${food.name}': ${data.message}`);
      return;
    }

    toast.success(`Deleted '${food.name}'`);
    await mutate('/api/food');
    setOpen(false);
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className="text-red-500 hover:bg-red-500 hover:text-white"
          size="sm"
          variant="outline">
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Dish</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this dish?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={deleteFood} disabled={isDeleting}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteFood;
