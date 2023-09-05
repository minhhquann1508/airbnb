export default function Auth(props:any):JSX.Element {
    return (
        <section className='container px-5 md:px-0 flex py-10 md:py-20 items-center gap-5 mx-auto'>
            <div className='w-1/2 hidden md:block'>
                <img src="./img/airbnb_logo.png" alt="logo" />
            </div>
            <div className='w-full md:w-1/2'>
                {props.Component}
            </div>
        </section>
    )
}
