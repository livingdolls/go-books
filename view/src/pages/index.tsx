import { Content } from "@/components/organism/content";
import { Header } from "../components/organism/header";
import { useBooks } from "../hooks/useBooks";

export const IndexPage = () => {
  const {
    bookRequest,
    handleChangeForm,
    handleSubmit,
    data,
    isLoading,
    isError,
    filter,
    handleSearchFilter,
    setOrder,
    setSortBy,
    setSelectedBookId,
    handleDelete,
    updateDialogOpen,
    setUpdateDialogOpen,
    formUpdate,
    setFormUpdate,
    handleUpdateSubmit,
  } = useBooks();
  return (
    <div className="px-4 md:px-6 lg:px-8">
      <div className="max-w-[1440px] m-auto">
        <Header
          handleChangeForm={handleChangeForm}
          bookRequest={bookRequest}
          handleSubmit={handleSubmit}
          filter={filter}
          setOrder={setOrder}
          setSortBy={setSortBy}
          handleSearchFilter={handleSearchFilter}
        />

        <Content
          loading={isLoading}
          error={isError}
          data={data}
          setSelectedBookId={setSelectedBookId}
          handleDelete={handleDelete}
          updateDialogOpen={updateDialogOpen}
          setUpdateDialogOpen={setUpdateDialogOpen}
          formUpdate={formUpdate}
          setFormUpdate={setFormUpdate}
          handleUpdateSubmit={handleUpdateSubmit}
        />
      </div>
    </div>
  );
};
