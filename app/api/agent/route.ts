import { NextRequest, NextResponse, userAgent } from 'next/server';

export async function GET(req: NextRequest) {
  const agent = userAgent(req);
  const viewport = agent.device.type || 'desktop';

  console.log('agent', agent);
  console.log('viewport', viewport);

  // const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const ip: string = req?.headers.get('x-forwarded-for') || '';

  return NextResponse.json({ data: { ip } }, { status: 200 });
}
