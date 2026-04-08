import { handlers } from "@/auth";

export const runtime = 'experimental-edge';
export const dynamic = 'force-dynamic';

export const { GET, POST } = handlers;
