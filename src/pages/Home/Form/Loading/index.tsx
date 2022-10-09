import { Backdrop, CircularProgress } from "@mui/material";

type loadingProps = {
    open: boolean
}
export function Loading(props: loadingProps) {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={props.open}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}
