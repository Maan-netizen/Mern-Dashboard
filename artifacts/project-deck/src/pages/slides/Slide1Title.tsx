export default function Slide1Title() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#1A1B26",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        color: "#C0CAF5",
        position: "relative",
      }}
    >
      {/* Left Sidebar */}
      <div
        style={{
          width: "22vw",
          height: "100vh",
          borderRight: "1px solid rgba(255, 255, 255, 0.05)",
          padding: "5vh 3vw",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.8vw", marginBottom: "6vh" }}>
          <div style={{ width: "1.5vw", height: "1.5vw", backgroundColor: "#7AA2F7", borderRadius: "0.3vw" }} />
          <div style={{ fontSize: "1.2vw", fontWeight: 600, color: "#FFFFFF" }}>cmd.center</div>
        </div>

        <div style={{ fontSize: "0.85vw", fontWeight: 600, color: "#565F89", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.5vh" }}>
          Getting Started
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.2vh", marginBottom: "3.5vh" }}>
          <div style={{ fontSize: "0.95vw", color: "#C0CAF5", opacity: 0.6 }}>Authentication</div>
          <div style={{ fontSize: "0.95vw", color: "#C0CAF5", opacity: 0.6 }}>Tech Stack</div>
        </div>

        <div style={{ fontSize: "0.85vw", fontWeight: 600, color: "#565F89", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.5vh" }}>
          Routes
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.2vh", marginBottom: "3.5vh" }}>
          <div style={{ fontSize: "0.95vw", color: "#C0CAF5", opacity: 0.6 }}>Dashboard</div>
          <div style={{ fontSize: "0.95vw", color: "#C0CAF5", opacity: 0.6 }}>Notes</div>
          <div style={{ fontSize: "0.95vw", color: "#C0CAF5", opacity: 0.6 }}>Settings</div>
        </div>

        <div style={{ fontSize: "0.85vw", fontWeight: 600, color: "#565F89", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.5vh" }}>
          Deployment
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.2vh" }}>
          <div style={{ fontSize: "0.95vw", color: "#7AA2F7", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.5vw" }}>
            <span style={{ width: "3px", height: "1.1vw", backgroundColor: "#7AA2F7", borderRadius: "2px", marginLeft: "-3vw" }} />
            Overview
          </div>
        </div>

        <div style={{ marginTop: "auto", fontSize: "0.8vw", color: "#565F89" }}>
          v1.0.0 • 2026
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: "8vh 5vw",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ fontSize: "0.95vw", color: "#7AA2F7", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: "1.5vh" }}>
          API Reference
        </div>

        <h1
          style={{
            fontSize: "4.5vw",
            fontWeight: 800,
            color: "#FFFFFF",
            margin: "0 0 1.5vh 0",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          Command Center
        </h1>

        <p
          style={{
            fontSize: "1.3vw",
            color: "#9AA5CE",
            lineHeight: 1.6,
            maxWidth: "38vw",
            margin: "0 0 4vh 0",
            fontWeight: 400,
          }}
        >
          A full-stack MERN web app — built and deployed on Replit. Users, notes, and a live API.
        </p>

        {/* Endpoint Box */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "1.5vh 1.8vw",
            backgroundColor: "rgba(158, 206, 106, 0.08)",
            border: "1px solid rgba(158, 206, 106, 0.2)",
            borderRadius: "0.5vw",
            marginBottom: "3.5vh",
            width: "fit-content",
          }}
        >
          <div style={{ fontSize: "1vw", fontWeight: 700, color: "#9ECE6A", marginRight: "1.5vw", fontFamily: "'DM Mono', monospace" }}>
            POST
          </div>
          <div style={{ fontSize: "1.1vw", color: "#FFFFFF", fontFamily: "'DM Mono', monospace" }}>
            /api/auth/register
          </div>
        </div>

        {/* Two-column code area */}
        <div style={{ display: "flex", gap: "3vw", flex: 1 }}>
          {/* Request */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2vh" }}>
            <div style={{ fontSize: "1.1vw", fontWeight: 600, color: "#FFFFFF", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "1vh" }}>
              Request Body
            </div>
            <div
              style={{
                backgroundColor: "#16161E",
                borderRadius: "0.5vw",
                padding: "2vh 1.8vw",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.95vw",
                lineHeight: 1.7,
              }}
            >
              <div style={{ color: "#C0CAF5" }}>{`{`}</div>
              <div style={{ paddingLeft: "2vw", color: "#C0CAF5" }}>
                <span style={{ color: "#7AA2F7" }}>"name"</span>: <span style={{ color: "#9ECE6A" }}>"Ada Lovelace"</span>,
              </div>
              <div style={{ paddingLeft: "2vw", color: "#C0CAF5" }}>
                <span style={{ color: "#7AA2F7" }}>"email"</span>: <span style={{ color: "#9ECE6A" }}>"ada@example.com"</span>,
              </div>
              <div style={{ paddingLeft: "2vw", color: "#C0CAF5" }}>
                <span style={{ color: "#7AA2F7" }}>"password"</span>: <span style={{ color: "#E0AF68" }}>"••••••••"</span>
              </div>
              <div style={{ color: "#C0CAF5" }}>{`}`}</div>
            </div>
          </div>

          {/* Response */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2vh" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "1vh" }}>
              <div style={{ fontSize: "1.1vw", fontWeight: 600, color: "#FFFFFF" }}>Response</div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5vw" }}>
                <div style={{ width: "0.5vw", height: "0.5vw", backgroundColor: "#9ECE6A", borderRadius: "50%" }} />
                <div style={{ fontSize: "0.85vw", fontFamily: "'DM Mono', monospace", color: "#9ECE6A" }}>201 Created</div>
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#16161E",
                borderRadius: "0.5vw",
                padding: "2vh 1.8vw",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.95vw",
                lineHeight: 1.7,
              }}
            >
              <div style={{ color: "#C0CAF5" }}>{`{`}</div>
              <div style={{ paddingLeft: "2vw", color: "#C0CAF5" }}>
                <span style={{ color: "#7AA2F7" }}>"token"</span>: <span style={{ color: "#9ECE6A" }}>"eyJhbGci..."</span>,
              </div>
              <div style={{ paddingLeft: "2vw", color: "#C0CAF5" }}>
                <span style={{ color: "#7AA2F7" }}>"user"</span>: {`{`}
              </div>
              <div style={{ paddingLeft: "4vw", color: "#C0CAF5" }}>
                <span style={{ color: "#7AA2F7" }}>"id"</span>: <span style={{ color: "#E0AF68" }}>"64f3a..."</span>,
              </div>
              <div style={{ paddingLeft: "4vw", color: "#C0CAF5" }}>
                <span style={{ color: "#7AA2F7" }}>"name"</span>: <span style={{ color: "#9ECE6A" }}>"Ada Lovelace"</span>
              </div>
              <div style={{ paddingLeft: "2vw", color: "#C0CAF5" }}>{`}`}</div>
              <div style={{ color: "#C0CAF5" }}>{`}`}</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "2vh" }}>
          <div style={{ fontSize: "0.85vw", color: "#565F89" }}>Replit • 2026</div>
        </div>
      </div>
    </div>
  );
}
