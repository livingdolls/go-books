import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Book } from "@/types/book";

type Props = {
  handleChangeForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  formUpdate: Omit<Book, "id">;
};

export const FormUpdate = ({
  handleChangeForm,
  formUpdate,
  open,
  onOpenChange,
  onConfirm,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Books</DialogTitle>
            <DialogDescription>
              Make changes to your book here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Book Title</Label>
              <Input
                id="title"
                name="title"
                value={formUpdate.title}
                onChange={handleChangeForm}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                value={formUpdate.author}
                onChange={handleChangeForm}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="published_year">Published Year</Label>
              <Input
                id="published_year"
                name="published_year"
                value={formUpdate.published_year}
                onChange={handleChangeForm}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={onConfirm}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
