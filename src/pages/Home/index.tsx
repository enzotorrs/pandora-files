import { Form } from '../../components/Form'
import { Header } from '../../components/Header'
import style from './Home.module.scss'
import 'normalize.css'

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
