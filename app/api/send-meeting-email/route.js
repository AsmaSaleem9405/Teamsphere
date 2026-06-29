import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { participants, title, meetingLink, scheduledAt } =
      await req.json();

    const emails = participants.map((email) => ({
      from: "TeamSphere <onboarding@resend.dev>",
      to: email,
      subject: `Invitation: ${title}`,
      html: `
        <h2>You are invited to a meeting</h2>

        <p><strong>Meeting:</strong> ${title}</p>

        ${
          scheduledAt
            ? `<p><strong>Date:</strong> ${scheduledAt}</p>`
            : ""
        }

        <p>
          <a href="${meetingLink}">
            Join Meeting
          </a>
        </p>
      `,
    }));

    await Promise.all(
      emails.map((email) => resend.emails.send(email))
    );

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);

    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}