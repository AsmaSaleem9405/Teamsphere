import { resend } from "./resend";

export async function sendMeetingInvitation({
  to,
  title,
  meetingLink,
  scheduledAt,
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: "TeamSphere <onboarding@resend.dev>",
      to,
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

        <p>Thanks,<br/>TeamSphere</p>
      `,
    });

    if (error) {
      console.error(error);
      return;
    }

    console.log("Email sent:", data);
  } catch (err) {
    console.error(err);
  }
}