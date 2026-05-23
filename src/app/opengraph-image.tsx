import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Humna Sadia — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          justifyContent: "space-between", padding: 80,
          backgroundColor: "#0A0A0B",
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 30% 20%, rgba(34, 211, 238, 0.18), transparent), radial-gradient(ellipse 40% 50% at 80% 80%, rgba(125, 211, 252, 0.10), transparent)",
          color: "#EDEAE3",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 18, letterSpacing: 4, color: "#A8A39A", textTransform: "uppercase" }}>
          <div style={{ width: 8, height: 8, borderRadius: 9999, background: "#22D3EE" }} />
          humna.dev
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 128, lineHeight: 1, letterSpacing: -4, fontWeight: 500 }}>
            Humna Sadia.
          </div>
          <div style={{ fontSize: 32, color: "#A8A39A", maxWidth: 900 }}>
            Software Engineer · Mobile · AI · Systems
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, color: "#6B6760", fontFamily: "monospace" }}>
          <span>FAST-NUCES · Islamabad</span>
          <span>github.com/Hhumna</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
