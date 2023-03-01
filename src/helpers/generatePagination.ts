export const generatePagination = (skip: number, take: number, totalRegisters: number) => {

    const previousPage = ( skip < totalRegisters ) ? skip : totalRegisters;
    const totalResult = (skip + take);
    const missing = ( totalResult < totalRegisters ) ? totalRegisters - totalResult : 0;
    const nextPage = ( take <= missing ) ? take : missing;
    const hasNextPage = nextPage !== 0;
    const hasPreviousPage = previousPage !== 0;
    return {
        previousPage,
        hasPreviousPage,
        nextPage,
        hasNextPage,
        missing,
        totalRegisters
    }
}