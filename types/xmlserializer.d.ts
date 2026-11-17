declare module 'xmlserializer' {
    const content: {
        serializeToString: (node: any) => string;
    }
    export = content;
}

export {};  // <- makes the file an ES module