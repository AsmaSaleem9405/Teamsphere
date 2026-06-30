import { AccessToken } from "livekit-server-sdk";

export async function POST(req) {
  try {
    const body = await req.json();

    const { roomName, participantName } =
      body;

    const at = new AccessToken(
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET,
      {
        identity: participantName,
      }
    );

    at.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
    });

    const token =
      await at.toJwt();

    return Response.json({
      token,
    });
  } catch (err) {
    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}