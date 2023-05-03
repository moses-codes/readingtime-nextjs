export default function SetGoalForm(props) {
    return (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center'>
            <section className='border-2 border-black p-4 absolute bg-white rounded-lg p-6" style="transform: translate(-50%, -50%)  z-10'>
                <button>x</button>
                <p>I want to finish {props.title} in (number) days.</p>
                <div className='flex justify-between m-10'>
                    <button>Skip</button>
                    <button>Set Goal</button>
                </div>

            </section>
        </div>
    )
}