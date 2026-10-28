import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#1C3D32",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#D4BC7A",
          fontSize: 32,
          fontWeight: 700,
        }}
      >
        PS
      </div>
    ),
    size,
  );
}
