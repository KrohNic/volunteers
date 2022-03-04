const MIN_TABLE_PAGE_SIZE = 5;

const generatePageSizeOptions = (totalItems: number): Array<string> => {
  const isTwoOrLessMinPages = totalItems <= 2 * MIN_TABLE_PAGE_SIZE;

  if (isTwoOrLessMinPages) return [MIN_TABLE_PAGE_SIZE, totalItems].map(String);

  return Array(Math.ceil(totalItems / MIN_TABLE_PAGE_SIZE))
    .fill(undefined)
    .map((_, index) => `${(index + 1) * MIN_TABLE_PAGE_SIZE}`);
};

export const generatePaginationProps = (totalItems: number) => {
  const isLessThanMinPage = totalItems <= MIN_TABLE_PAGE_SIZE;

  const paginationProp = {
    total: totalItems,
    hideOnSinglePage: isLessThanMinPage,
    showSizeChanger: !isLessThanMinPage,
  };

  if (isLessThanMinPage) return paginationProp;

  return {
    ...paginationProp,
    pageSizeOptions: generatePageSizeOptions(totalItems),
  };
};
