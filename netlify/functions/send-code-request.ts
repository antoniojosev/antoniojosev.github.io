import type { Handler } from '@netlify/functions';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body: { name: string; email: string; reason: string; project: string };
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { name, email, reason, project } = body;

  if (!name?.trim() || !email?.trim() || !reason?.trim() || !project?.trim()) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Faltan campos requeridos' }) };
  }

  try {
    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: 'antoniovila.dev@gmail.com',
      subject: `Code Request: ${project} — ${name}`,
      html: `
        <div style="font-family: monospace; background: #0a0a0b; color: #e8e8ec; padding: 2rem; border-radius: 8px; max-width: 560px;">
          <div style="font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; color: #6b6b7a; margin-bottom: 0.5rem;">
            Code Request · Portfolio
          </div>
          <h2 style="font-family: sans-serif; font-size: 1.4rem; font-weight: 800; margin: 0 0 1.5rem; color: #e8e8ec;">
            ${project}
          </h2>

          <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
            <tr>
              <td style="padding: 0.6rem 0; color: #6b6b7a; white-space: nowrap; padding-right: 1.5rem;">Nombre</td>
              <td style="padding: 0.6rem 0; color: #e8e8ec;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 0.6rem 0; color: #6b6b7a; white-space: nowrap; padding-right: 1.5rem;">Email</td>
              <td style="padding: 0.6rem 0;">
                <a href="mailto:${escapeHtml(email)}" style="color: #c8f565; text-decoration: none;">${escapeHtml(email)}</a>
              </td>
            </tr>
          </table>

          <div style="margin-top: 1.5rem; padding: 1rem; background: #111114; border: 1px solid #1e1e24; border-left: 3px solid #c8f565; border-radius: 0 6px 6px 0;">
            <div style="font-size: 0.6rem; letter-spacing: 0.12em; text-transform: uppercase; color: #c8f565; margin-bottom: 0.5rem;">
              Motivo del interés
            </div>
            <div style="font-size: 0.85rem; color: #e8e8ec; line-height: 1.7; white-space: pre-wrap;">${escapeHtml(reason)}</div>
          </div>
        </div>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    console.error('Resend error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al enviar el correo' }),
    };
  }
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
