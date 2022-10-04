import { Header } from '../../components/Header'
import style from './Home.module.scss'
import 'normalize.css'
import { Form } from './Form'

export function Home(){
    return (
        <>
            <Header/>
            <section className={style.container}>
                <Form></Form>
            </section>
        </>

    )
}
