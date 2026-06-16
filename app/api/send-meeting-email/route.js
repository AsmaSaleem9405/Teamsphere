import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      participants,
      title,
      meetingLink,
      meetingType,
      date,
      time,
    } = body;

    for (const email of participants) {
      await resend.emails.send({
        from: "Meetings <onboarding@resend.dev>",
        to: email,
        subject: `Invitation: ${title}`,
        html: `
          <div style="font-family:Arial;padding:30px">
            <h2>You have been invited</h2>

            <p>
              <strong>Meeting:</strong>
              ${title}
            </p>

            <p>
              <strong>Type:</strong>
              ${meetingType}
            </p>

            ${
              date
                ? `<p><strong>Date:</strong> ${date}</p>`
                : ""
            }

            ${
              time
                ? `<p><strong>Time:</strong> ${time}</p>`
                : ""
            }

            <p>
              <a
                href="${meetingLink}"
                style="
                  background:#4f46e5;
                  color:white;
                  padding:12px 20px;
                  text-decoration:none;
                  border-radius:8px;
                "
              >
                Join Meeting
              </a>
            </p>
          </div>
        `,
      });
    }

    return Response.json({
      success: true,
    });
  } catch (error) {
    return Response.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}