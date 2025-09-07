
import type { GetServerSidePropsContext } from 'next';

export function pathForServer(context: GetServerSidePropsContext) {
    const protocol = context.req.headers["x-forwarded-proto"] || "http";
    const host = context.req.headers.host || 'localhost';
    return `${protocol}://${host}`;
}
