export interface Document {
    data: any;
    html: string;
    type?: 'buffer' | 'stream';
    path?: 'string';
}
export interface IfCondOptions {
    fn: (context: any) => string;
    inverse: (context: any) => string;
}
