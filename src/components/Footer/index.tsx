import style from "./Footer.module.scss";
import GitHubIcon from '@mui/icons-material/GitHub';

export function Footer() {
    return (
        <footer className={style.footer}>
            <h3 className={style.feedback_tittle}>Have a idea or feedback?</h3>
            <a target="_blank" rel="noreferrer" className={style.link} href="https://github.com/0zob/pandora-files">
                <GitHubIcon />
                <h3>GitHub</h3>
            </a>
        </footer>
    )
}
