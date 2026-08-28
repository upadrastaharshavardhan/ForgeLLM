# ForgeLLM v2 — Netlify Edition (powered by ForgeLM)

A more advanced build of ForgeLLM, structured for a static Netlify deploy
with a serverless proxy instead of a standalone Node server. This version
talks to your own [ForgeLM](https://github.com/upadrastaharshavardhan/ForgeLM)
model instead of OpenRouter.

## What's new vs v1

- **Netlify Edge Function proxy** (`netlify/edge-functions/chat.ts`) instead
  of an Express server — no server to host separately, streams responses
  natively, and deploys with the rest of the site.
- **Multiple conversations** — a sidebar with create, rename, delete, all
  persisted to the browser's local storage (nothing leaves the user's
  machine except the messages sent to `/api/chat`).
- **Markdown rendering + syntax-highlighted code blocks** with a one-click
  copy button on every block.
- **Stop / Regenerate** — cancel an in-flight response (`Esc` or the Stop
  button), or regenerate the last answer.
- **Response style presets** (Precise / Balanced / Creative) that map to a
  temperature server-side — no model internals exposed to the UI.
- **Two themes** — Forge (dark ember) and Quench (cool cyan), a toggle in
  the sidebar, tying back to the metalworking concept: heating vs. cooling
  metal.
- Mobile-responsive collapsible sidebar.

The identity guardrails are unchanged: the system prompt, ForgeLM URL, and
API key (if any) all live only in the edge function — never in anything
shipped to the browser.

## Architecture — the model server can't live on Netlify

```
Browser  ──►  Netlify Edge Function  ──►  Your ForgeLM server (:8000-equivalent)
(anywhere)     (Netlify's cloud,           (public HTTPS URL, running
                thin proxy only)            somewhere that stays on)
```

Netlify Edge Functions run on Deno at the edge — no Python, no
PyTorch/Transformers, no long-lived process, and functions get killed
after a few seconds. `forgelm_serve.py` needs a real, always-on Python
process holding the model in memory, so it can never run *inside*
Netlify. `chat.ts` is only ever a thin proxy: it forwards chat requests
to whatever public URL you put in `FORGELM_API_URL`.

**Recommended: deploy `forgelm_serve.py` as a Hugging Face Space
(free, Docker, always has a public URL, no dependency on your own
machine).** Full step-by-step instructions, Dockerfile, and
requirements.txt are in the separate `forgelm-hf-space/` folder handed
to you alongside this project — follow its README, then set:

```
FORGELM_API_URL=https://<your-hf-username>-<space-name>.hf.space/v1
FORGELM_MODEL=ForgeLM-v1
```

**Quick local testing only — not for anything you'll share with other
people:** you can instead run `forgelm_serve.py` on your own machine and
expose it with a tunnel (`cloudflared tunnel --url http://127.0.0.1:8000`
or `ngrok http 8000`), pointing `FORGELM_API_URL` at the tunnel's
`https://...` URL. This only works while your machine and the tunnel are
both running — the moment either stops, the site returns a "couldn't
reach the ForgeLM server" error. Fine for trying things out solo, not a
real deployment.

## Deploy to Netlify

**Option A — Netlify CLI**
```bash
npm install -g netlify-cli
netlify init
netlify env:set FORGELM_API_URL https://your-tunnel-url.trycloudflare.com/v1
netlify env:set FORGELM_MODEL ForgeLM-v1
netlify deploy --prod
```

**Option B — Git-connected site**
1. Push this folder to a GitHub/GitLab repo.
2. In Netlify: **Add new site → Import an existing project**, point it at
   the repo. Build command: none needed (publish directory is `public`,
   already set in `netlify.toml`).
3. In **Site settings → Environment variables**, add:
   - `FORGELM_API_URL` — your tunnel's public URL + `/v1`, e.g.
     `https://your-tunnel-url.trycloudflare.com/v1`
   - `FORGELM_MODEL` — the `--model-name` you passed to `forgelm_serve.py`
     (e.g. `ForgeLM-v1`)
   - `FORGELM_API_KEY` — only if you've added your own auth in front of
     `forgelm_serve.py`; otherwise leave unset
4. Deploy.

Note: free tunnel URLs (like `trycloudflare.com` quick tunnels) change
every time you restart `cloudflared`. If that happens, update
`FORGELM_API_URL` in Netlify and redeploy, or use a named/persistent
tunnel so the URL stays fixed.

## Local development

```bash
npm install -g netlify-cli   # if you don't have it
cp .env.example .env         # fill in your tunnel URL and model name
netlify dev
```

This runs the edge function and static site together at `localhost:8888`.

## Files

- `netlify.toml` — routes `/api/chat` to the edge function, sets basic
  security headers
- `netlify/edge-functions/chat.ts` — the proxy: validates input, rate-limits
  per IP (best effort), injects the guardrail system prompt, forwards the
  request to your ForgeLM server's `/v1/chat/completions`, and streams the
  response back as SSE
- `public/index.html`, `public/styles.css`, `public/app.js` — the UI
  (unchanged — it only ever talks to `/api/chat`, so switching the backend
  from OpenRouter to ForgeLM required no frontend changes)
