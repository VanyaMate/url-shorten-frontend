export const removeUrlAction = async function (url: string): Promise<void> {
    await fetch(`${ __API__ }/api/v1/url-shorten/${ url }`, { method: 'DELETE' });
};