import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBookFormStore } from "@/store/bookFormStore";
import { CirclePlus } from "lucide-react";

export function FormAddBooks({ handleSubmit }: { handleSubmit: () => void }) {
  const { bookRequest, setBookRequest } = useBookFormStore();
  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookRequest({
      ...bookRequest,
      [name]: name === "published_year" ? Number(value) : value,
    });
  };
  return (
    <Dialog>
      <form onSubmit={handleSubmit}>
        <DialogTrigger asChild>
          <Button className="bg-black">
            <span className="hidden md:block">Add Book</span>
            <CirclePlus />
          </Button>
        </DialogTrigger>
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
            <Button type="submit" onClick={handleSubmit}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
