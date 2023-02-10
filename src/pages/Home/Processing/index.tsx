import style from "./Processing.module.scss"

import LinearProgress from "@mui/material/LinearProgress"

export function Processing(props: {progress: number}) {
    return (
        <div className={style.process}>
            <p>Processing</p>
            <LinearProgress variant="determinate" value={props.progress} />
        </div>
    )
}
