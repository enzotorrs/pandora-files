import { Button, ClickAwayListener } from "@mui/material"

type DownloadButtonProps = {
    onClickAway: any,
    downloadUrl: string,
    handleDownloadButton: any,
}

export function DownloadButton(props: DownloadButtonProps) {
    return (
        <ClickAwayListener onClickAway={() => { props.onClickAway() }}>
            <Button
                href={props.downloadUrl}
                sx={{ height: "12em", width: "20em", margin: "auto auto" }}
                variant="contained"
                onClick={props.handleDownloadButton}
            >download
            </Button>
        </ClickAwayListener>
    )
}
