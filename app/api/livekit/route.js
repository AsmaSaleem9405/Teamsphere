import { AccessToken } from "livekit-server-sdk";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      roomName,
      participantName,
      participantEmail,
    } = body;

    // UNIQUE IDENTITY

    const uniqueIdentity =
      `${participantName}-${Date.now()}`;

    // TOKEN

    const at = new AccessToken(
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET,
      {
        identity:
          uniqueIdentity,

        // DISPLAY NAME
        name:
          participantName,
      }
    );

    // ROOM GRANTS

    at.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
    });

    // JWT

    const token =
      await at.toJwt();

    return Response.json({
      token,
    });
  } catch (err) {
    console.log(err);

    return Response.json(
      {
        error:
          "Failed to generate token",
      },
      {
        status: 500,
      }
    );
  }
}