export function getUrlFromUri(uri: string) {
    return uri.substring(0, uri.indexOf('?'));
}

/**
 * helper to pack query-parameters of a uri into a JSON
 * @param uri any uri with query-parameters
 */
export function getParameterJsonFromUri(uri: string): object {
    const query = uri.substr(uri.lastIndexOf('?') + 1);
    const result = {};
    query.split('&').forEach((part) => {
        const item = part.split(/=(.+)/);
        result[item[0].toUpperCase()] = decodeURIComponent(item[1]);
    });
    return result;
}