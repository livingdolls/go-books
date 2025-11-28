import { Content } from "@/components/organism/content";
import { Header } from "../components/organism/header";
import { useBooksZustand } from "../hooks/useBooksZustand";

export const IndexPage = () => {
  const {
    handleSubmit,
    data,
    isLoading,
    isError,
    handleDelete,
    handleUpdateSubmit,
  } = useBooksZustand();
  return (
    <div className="px-4 md:px-6 lg:px-8">
      <div className="max-w-[1440px] m-auto">
        <Header handleSubmit={handleSubmit} />

        <Content
          loading={isLoading}
          error={isError}
          data={data}
          handleDelete={handleDelete}
          handleUpdateSubmit={handleUpdateSubmit}
        />
      </div>
    </div>
  );
};
