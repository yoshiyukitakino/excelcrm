export const Input = (props) => (

    <div>
        <label htmlFor={props.name} className="mb-2 inline-block text-sm text-gray-800 sm:text-base">{props.title}{props.required}</label>
        <input name={props.name} defaultValue={props.value}
            className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
    </div>


);
