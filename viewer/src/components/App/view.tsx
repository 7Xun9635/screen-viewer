import React from "react";
import { AppViewModel } from "@/components/App/viewmodel";
import { observer } from "mobx-react";
import { Fab, Grid, ThemeProvider } from "@mui/material";
import { CallEnd, ChevronLeft, ChevronRight, Fullscreen, Keyboard, Refresh } from "@mui/icons-material";
import "./index.css";
import { Theme } from "@/config/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowPointer } from "@fortawesome/free-solid-svg-icons";

@observer
export class App extends React.Component {
    private model = new AppViewModel();

    componentDidMount() {
        window.addEventListener("beforeunload", this.model.terminate);
    }

    componentWillUnmount() {
        this.model.terminate();
    }

    // Shown when the page is opened without a ?room= link.
    noRoomPage = () => (
        <Grid container justifyContent={"center"} alignItems={"center"} style={{position: "absolute", inset: 0, background: "#333333", zIndex: 20}}>
            <span style={{color: "#ffffff", fontSize: 18}}>未指定房间</span>
            <span style={{color: "#cccccc", marginTop: 8}}>请通过分享链接（含 ?room= 与 pwd）进入观看页</span>
        </Grid>
    );

    viewPage = () => (
        <Grid
            container
            width={"100vw"}
            height={"100vh"}
            overflow={"hidden"}
            style={{background: "#333333"}}
        >
            <Grid container justifyContent={"center"} flex={1}>
                <video
                    ref={this.model.video}
                    autoPlay
                    muted
                    style={{
                        maxWidth: "100vw",
                        maxHeight: "100vh",
                        height: "100%",
                        width: "100%",
                    }}
                />
            </Grid>

            <Grid
                container
                position={"absolute"}
                top={0}
                right={0}
                flexDirection={"column"}
                spacing={2}
                justifyContent={"center"}
                alignItems={"center"}
                padding={3}
                height={"100%"}
                marginRight={this.model.isHiding ? "-110px" : 0}
                className={"animated"}
                xs={"auto"}
                zIndex={10}
            >
                <Grid item>
                    <Fab
                        style={{width: 40, height: 40, display: this.model.isMouseEnabled ? "block" : "none"}}
                        onClick={this.model.setMouseTrackEnabled(!this.model.isMouseTrackEnabled)}
                        color={this.model.isMouseTrackEnabled ? "info" : "inherit"}
                        className={"animated"}
                    >
                        <FontAwesomeIcon style={{width: 10, marginRight: -3}} icon={faArrowPointer}/>
                    </Fab>
                </Grid>
                <Grid item>
                    <Fab
                        style={{width: 40, height: 40}}
                        onClick={this.model.setMouseEnabled(!this.model.isMouseEnabled)}
                        color={this.model.isMouseEnabled ? "info" : "inherit"}
                    >
                            <span className="material-symbols-outlined">
                            ads_click
                            </span>
                    </Fab>
                </Grid>
                <Grid item>
                    <Fab
                        style={{width: 40, height: 40}}
                        onClick={this.model.setKeyboardEnabled(!this.model.isKeyboardEnabled)}
                        color={this.model.isKeyboardEnabled ? "info" : "inherit"}
                    >
                        {<Keyboard/>}
                    </Fab>
                </Grid>
                <Grid item>
                    <Fab
                        style={{width: 40, height: 40}}
                        onClick={this.model.setFullScreen(!this.model.isFullScreen)}
                        color={this.model.isFullScreen ? "info" : "inherit"}
                    >
                        {<Fullscreen/>}
                    </Fab>
                </Grid>
                <Grid item>
                    <Fab
                        style={{width: 40, height: 56, borderRadius: 20}}
                        onClick={() => {
                            this.model.leave();
                            window.location.reload();
                        }}
                        color={"error"}
                    >
                        {<CallEnd/>}
                    </Fab>
                </Grid>
            </Grid>
            <Fab
                className={"animated"}
                style={{position: "absolute", right: 24, top: 24, background: "white", width: 40, height: 40}}
                onClick={this.model.isHiding ? this.model.setHide(false) : this.model.setHide(true)}
            >
                {this.model.isHiding ? <ChevronLeft/> : <ChevronRight/>}
            </Fab>

            {/* Refresh button: appears on mouse movement, auto-hides after 2s of inactivity. */}
            {this.model.isRefreshVisible && (
                <Fab
                    className={"animated"}
                    style={{position: "absolute", right: 24, bottom: 24, background: "#ffffff", width: 48, height: 48, zIndex: 30}}
                    onClick={this.model.refresh}
                >
                    <Refresh/>
                </Fab>
            )}
        </Grid>
    );

    render() {
        return (
            <ThemeProvider theme={Theme}>
                {this.model.hasRoom ? this.viewPage() : this.noRoomPage()}
            </ThemeProvider>
        );
    }
}
