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
import { useBookFormStore } from "@/store/bookFormStore";
import { useNetworkStore } from "@/store/networkStore";
import { LoaderCircle } from "lucide-react";

export function FormAddBooks({ handleSubmit }: { handleSubmit: () => void }) {
  const { bookRequest, setBookRequest, setDialogRequestOpen, dialogRequest } = useBookFormStore();
  const {isLoading} = useNetworkStore();
  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookRequest({
      ...bookRequest,
      [name]: name === "published_year" ? Number(value) : value,
    });
  };
  return (
    <Dialog open={dialogRequest} onOpenChange={setDialogRequestOpen}>
      <form onSubmit={handleSubmit}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Books</DialogTitle>
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
                value={bookRequest.title}
                onChange={handleChangeForm}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                value={bookRequest.author}
                onChange={handleChangeForm}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="published_year">Published Year</Label>
              <Input
                id="published_year"
                name="published_year"
                value={bookRequest.published_year}
                onChange={handleChangeForm}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button disabled={isLoading} type="submit" onClick={handleSubmit}>
              Save
              <LoaderCircle className={isLoading ? "animate-spin block" : "hidden"} />
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
