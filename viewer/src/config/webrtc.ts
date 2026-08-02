// Use the official Mira signaller (no self-hosted signalling server needed).
// The viewer itself is still our customised no-join / no-approval build, but
// it connects its WebSocket signalling to the public wss://ws.mirashare.app
// endpoint, so viewers only need the share link and any network works.
export const SignallerUrl = "wss://ws.mirashare.app";

export const SharerConnectionConfig: RTCConfiguration = {
    iceServers: [
        {urls: "stun:stun.stunprotocol.org:3478"},
    ],
};
