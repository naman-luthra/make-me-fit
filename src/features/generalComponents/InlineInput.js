export const InlineInput = ({value, setValue, errorCondition, placeholder, placeholderLength}) => {
    return (
        <input 
            type="text" 
            value={value}
            onChange={e=>setValue(e.target.value)}
            placeholder={placeholder} 
            className={`bg-gray-200 text-gray-800 p-1 focus:outline-none text-center focus:placeholder-gray-200 border-2 rounded-md ${errorCondition ? 'border-red-500' : 'border-gray-200' }`} 
            style={
                {
                    width:`${Math.max(placeholderLength ? placeholderLength : placeholder.length+1,value.length+1)}ch`}
            }/>
    );
}