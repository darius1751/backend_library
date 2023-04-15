export const getContentTypeImage = (ext: string): string => {
    const extensions: string[] = ['.png', '.jpg', '.jpeg', '.gif','.svg'];
    const index = extensions.indexOf(ext);
    if(index === 4)
        return `image/${extensions[index].substring(1)}+xml`;
    return `image/${extensions[index].substring(1)}`;
}