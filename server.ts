import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Route: Send Email (Mock Implementation)
  app.post("/api/email-card", async (req, res) => {
    const { email, studentName, uniqueId, cardImage } = req.body;

    if (!email || !studentName || !uniqueId) {
      return res.status(400).json({ error: "Missing required student data" });
    }

    console.log(`[Email Service] Simulating email to: ${email}`);
    console.log(`[Email Service] Subject: Your American Institute E-Card (ID: ${uniqueId})`);
    
    // In a real production app, you would use a service like Resend, SendGrid, or Mailgun here.
    // Example with Resend (if user provided key):
    /*
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'American Institute <admissions@americaninstitute.in>',
        to: email,
        subject: `Your Official E-Card - ${studentName}`,
        html: `<p>Hello ${studentName}, your ID card is ready!</p>`,
        attachments: [{
          filename: 'ecard.png',
          content: cardImage.split(',')[1],
        }]
      });
    }
    */

    // Simulate success
    res.json({ 
      success: true, 
      message: "E-Card has been sent to your registered email address.",
      mockLog: `Simulated transmission to ${email}`
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
