export default function Slide2TechStack() {
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
        <div style={{ display: "flex", alignItems: "center", gap: "0.8vw", marginBottom: "6vh" }}>
          <div style={{ width: "1.5vw", height: "1.5vw", backgroundColor: "#7AA2F7", borderRadius: "0.3vw" }} />
          <div style={{ fontSize: "1.2vw", fontWeight: 600, color: "#FFFFFF" }}>cmd.center</div>
        </div>

        <div style={{ fontSize: "0.85vw", fontWeight: 600, color: "#565F89", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.5vh" }}>
          Getting Started
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.2vh", marginBottom: "3.5vh" }}>
          <div style={{ fontSize: "0.95vw", color: "#C0CAF5", opacity: 0.6 }}>Authentication</div>
          <div style={{ fontSize: "0.95vw", color: "#7AA2F7", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.5vw" }}>
            <span style={{ width: "3px", height: "1.1vw", backgroundColor: "#7AA2F7", borderRadius: "2px", marginLeft: "-3vw" }} />
            Tech Stack
          </div>
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
          <div style={{ fontSize: "0.95vw", color: "#C0CAF5", opacity: 0.6 }}>Production</div>
        </div>

        <div style={{ marginTop: "auto", fontSize: "0.8vw", color: "#565F89" }}>
          v1.0.0 • 2026
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: "7vh 5vw",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div style={{ fontSize: "0.95vw", color: "#7AA2F7", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: "1.5vh" }}>
          Getting Started
        </div>

        <h1
          style={{
            fontSize: "4vw",
            fontWeight: 800,
            color: "#FFFFFF",
            margin: "0 0 1.5vh 0",
            letterSpacing: "-0.02em",
          }}
        >
          Tech Stack
        </h1>

        <p style={{ fontSize: "1.2vw", color: "#9AA5CE", margin: "0 0 4vh 0", lineHeight: 1.5 }}>
          OpenAPI-first MERN architecture — spec drives codegen, codegen drives the frontend.
        </p>

        <div style={{ display: "flex", gap: "3vw", flex: 1 }}>
          {/* Backend */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "1.1vw", fontWeight: 600, color: "#FFFFFF", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "1vh", marginBottom: "2.5vh" }}>
              Backend
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "2vh" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1.2vw" }}>
                <div style={{ backgroundColor: "rgba(122, 162, 247, 0.12)", border: "1px solid rgba(122, 162, 247, 0.25)", borderRadius: "0.3vw", padding: "0.3vh 0.7vw", fontFamily: "'DM Mono', monospace", fontSize: "0.85vw", color: "#7AA2F7", whiteSpace: "nowrap", marginTop: "0.3vh" }}>
                  DB
                </div>
                <div>
                  <div style={{ fontSize: "1.05vw", color: "#FFFFFF", fontWeight: 600, marginBottom: "0.3vh" }}>MongoDB + Mongoose</div>
                  <div style={{ fontSize: "0.9vw", color: "#9AA5CE" }}>Document persistence with typed schemas</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "1.2vw" }}>
                <div style={{ backgroundColor: "rgba(224, 175, 104, 0.12)", border: "1px solid rgba(224, 175, 104, 0.25)", borderRadius: "0.3vw", padding: "0.3vh 0.7vw", fontFamily: "'DM Mono', monospace", fontSize: "0.85vw", color: "#E0AF68", whiteSpace: "nowrap", marginTop: "0.3vh" }}>
                  API
                </div>
                <div>
                  <div style={{ fontSize: "1.05vw", color: "#FFFFFF", fontWeight: 600, marginBottom: "0.3vh" }}>Express + Node.js</div>
                  <div style={{ fontSize: "0.9vw", color: "#9AA5CE" }}>REST API with OpenAPI 3.1 spec</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "1.2vw" }}>
                <div style={{ backgroundColor: "rgba(158, 206, 106, 0.12)", border: "1px solid rgba(158, 206, 106, 0.25)", borderRadius: "0.3vw", padding: "0.3vh 0.7vw", fontFamily: "'DM Mono', monospace", fontSize: "0.85vw", color: "#9ECE6A", whiteSpace: "nowrap", marginTop: "0.3vh" }}>
                  AUTH
                </div>
                <div>
                  <div style={{ fontSize: "1.05vw", color: "#FFFFFF", fontWeight: 600, marginBottom: "0.3vh" }}>JWT + bcryptjs</div>
                  <div style={{ fontSize: "0.9vw", color: "#9AA5CE" }}>Stateless auth with hashed passwords</div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "#16161E",
                  borderRadius: "0.5vw",
                  padding: "1.5vh 1.5vw",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.85vw",
                  lineHeight: 1.6,
                  marginTop: "0.5vh",
                }}
              >
                <div style={{ color: "#7AA2F7" }}>GET<span style={{ color: "#C0CAF5" }}> /api/dashboard/stats</span></div>
                <div style={{ color: "#9ECE6A" }}>POST<span style={{ color: "#C0CAF5" }}> /api/notes</span></div>
                <div style={{ color: "#E0AF68" }}>PATCH<span style={{ color: "#C0CAF5" }}> /api/users/profile</span></div>
              </div>
            </div>
          </div>

          {/* Frontend */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "1.1vw", fontWeight: 600, color: "#FFFFFF", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "1vh", marginBottom: "2.5vh" }}>
              Frontend
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "2vh" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1.2vw" }}>
                <div style={{ backgroundColor: "rgba(122, 162, 247, 0.12)", border: "1px solid rgba(122, 162, 247, 0.25)", borderRadius: "0.3vw", padding: "0.3vh 0.7vw", fontFamily: "'DM Mono', monospace", fontSize: "0.85vw", color: "#7AA2F7", whiteSpace: "nowrap", marginTop: "0.3vh" }}>
                  UI
                </div>
                <div>
                  <div style={{ fontSize: "1.05vw", color: "#FFFFFF", fontWeight: 600, marginBottom: "0.3vh" }}>React + Vite + TypeScript</div>
                  <div style={{ fontSize: "0.9vw", color: "#9AA5CE" }}>shadcn/ui components, wouter routing</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "1.2vw" }}>
                <div style={{ backgroundColor: "rgba(224, 175, 104, 0.12)", border: "1px solid rgba(224, 175, 104, 0.25)", borderRadius: "0.3vw", padding: "0.3vh 0.7vw", fontFamily: "'DM Mono', monospace", fontSize: "0.85vw", color: "#E0AF68", whiteSpace: "nowrap", marginTop: "0.3vh" }}>
                  DATA
                </div>
                <div>
                  <div style={{ fontSize: "1.05vw", color: "#FFFFFF", fontWeight: 600, marginBottom: "0.3vh" }}>TanStack Query</div>
                  <div style={{ fontSize: "0.9vw", color: "#9AA5CE" }}>Server state, caching, invalidation</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "1.2vw" }}>
                <div style={{ backgroundColor: "rgba(158, 206, 106, 0.12)", border: "1px solid rgba(158, 206, 106, 0.25)", borderRadius: "0.3vw", padding: "0.3vh 0.7vw", fontFamily: "'DM Mono', monospace", fontSize: "0.85vw", color: "#9ECE6A", whiteSpace: "nowrap", marginTop: "0.3vh" }}>
                  GEN
                </div>
                <div>
                  <div style={{ fontSize: "1.05vw", color: "#FFFFFF", fontWeight: 600, marginBottom: "0.3vh" }}>Orval codegen</div>
                  <div style={{ fontSize: "0.9vw", color: "#9AA5CE" }}>OpenAPI spec → typed React hooks</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "1.2vw" }}>
                <div style={{ backgroundColor: "rgba(255, 158, 100, 0.12)", border: "1px solid rgba(255, 158, 100, 0.25)", borderRadius: "0.3vw", padding: "0.3vh 0.7vw", fontFamily: "'DM Mono', monospace", fontSize: "0.85vw", color: "#FF9E64", whiteSpace: "nowrap", marginTop: "0.3vh" }}>
                  FORM
                </div>
                <div>
                  <div style={{ fontSize: "1.05vw", color: "#FFFFFF", fontWeight: 600, marginBottom: "0.3vh" }}>react-hook-form + zod</div>
                  <div style={{ fontSize: "0.9vw", color: "#9AA5CE" }}>Typed validation on every form</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "2vh" }}>
          <div style={{ fontSize: "0.95vw", color: "#565F89", fontWeight: 500 }}>02</div>
          <div style={{ fontSize: "0.85vw", color: "#565F89" }}>Replit • 2026</div>
        </div>
      </div>
    </div>
  );
}
