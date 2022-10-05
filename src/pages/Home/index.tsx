import 'normalize.css'
import style from './Home.module.scss'
import { SnackbarProvider } from 'notistack';
import { Header } from '../../components/Header'
import { Form } from './Form'

export function Home() {

    return (
        <>
            <Header />
            <SnackbarProvider maxSnack={3}>
                <section className={style.container}>
                    <Form></Form>
                </section>
            </SnackbarProvider>
        </>

    )
}
