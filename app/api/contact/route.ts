import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // ------------------------------------------------------------------
    // Wire up your preferred email service here.
    // Options:
    //   • Resend (https://resend.com) — recommended for Vercel
    //   • Nodemailer with an SMTP provider
    //   • Formspree (no code needed — point the form action at their URL)
    //
    // Example with Resend:
    //   import { Resend } from "resend";
    //   const resend = new Resend(process.env.RESEND_API_KEY);
    //   await resend.emails.send({
    //     from: "portfolio@yourdomain.com",
    //     to: "evanreppeto@email.com",
    //     subject: `Portfolio message from ${name}`,
    //     text: `From: ${email}\n\n${message}`,
    //   });
    // ------------------------------------------------------------------

    console.log("Contact form submission:", { name, email, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
