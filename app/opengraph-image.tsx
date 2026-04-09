import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Evan Reppeto — CS Student & AI Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0f1e",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background gradient blobs */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            zIndex: 1,
          }}
        >
          {/* Name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              background: "linear-gradient(90deg, #818cf8, #a78bfa, #67e8f9)",
              backgroundClip: "text",
              color: "transparent",
              letterSpacing: "-2px",
            }}
          >
            Evan Reppeto
          </div>

          {/* Divider */}
          <div
            style={{
              width: 80,
              height: 4,
              borderRadius: 2,
              background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
            }}
          />

          {/* Title */}
          <div
            style={{
              fontSize: 32,
              color: "#94a3b8",
              fontWeight: 400,
              letterSpacing: "0.5px",
            }}
          >
            CS Student &amp; AI Developer
          </div>

          {/* Tags */}
          <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
            {["Autonomous Agents", "LLM Development", "Full-Stack"].map((tag) => (
              <div
                key={tag}
                style={{
                  padding: "8px 20px",
                  borderRadius: 999,
                  border: "1px solid rgba(99,102,241,0.5)",
                  color: "#a5b4fc",
                  fontSize: 20,
                  background: "rgba(99,102,241,0.1)",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}
