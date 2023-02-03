import style from "./Processing.module.scss"

import LinearProgress from "@mui/material/LinearProgress"

export function Processing() {
    return (
        <div className={style.process}>
            <p>Processing</p>
            <LinearProgress />
        </div>
    )
}
