export const generatePagination = (skip: number, take: number, totalRegisters: number) => {

    const previousPage = ( skip < totalRegisters ) ? skip : totalRegisters;
    const totalResult = (skip + take);
    const missing = ( totalResult < totalRegisters ) ? totalRegisters - totalResult : 0;
    const nextPage = ( take <= missing ) ? take : missing;
    const hasNextPage = nextPage !== 0;
    const hasPreviousPage = previousPage !== 0;
    const actualPage = Math.floor((skip + 1 + take)/take);
    return {
        previousPage,
        hasPreviousPage,
        actualPage,
        nextPage,
        hasNextPage,
        missing,
        totalRegisters
    }
}