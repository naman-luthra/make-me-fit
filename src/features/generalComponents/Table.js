import { useState } from "react";
import { InlineInput } from "./InlineInput";

export const Table = ({className, colSpan, header, rows, headerStyle, rowStyle, addRecord, inputRecords, setRecord}) => {
    const columns = colSpan.reduce((a,b)=>a+b,0);
    const [ adding, setAdding ] = useState(false);
    const [ newRecord, setNewRecord ] = useState([]);

    return (
        <div className={`rounded-md overflow-hidden flex flex-col ${className}`} style={{backgroundColor: rowStyle?.bg ? rowStyle.bg : '#f3f4f6', color: rowStyle?.text ? rowStyle.text : '#030712'}}>
            <div className={`grid py-1 px-2 gap-3 ${addRecord ? 'pl-5' : ''}`} style={{gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, backgroundColor: headerStyle?.bg ? headerStyle.bg : '#1f2937', color: headerStyle?.text ? headerStyle.text : '#f9fafb'}}>
                {
                    header.map((headerItem, index) => (
                        <div key={index} style={{gridColumn: `span ${colSpan[index]} / span ${colSpan[index]}`}}>{headerItem}</div>
                    ))
                }
            </div>
            <div className="grow overflow-y-auto">
                {
                    rows.map((row, index) => (
                        <div key={index} className={`grid py-1 px-2 gap-3 ${addRecord ? 'pl-5' : ''}`} style={{gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`}}>
                            {
                                row.map((rowItem, index) => (
                                    <div key={index} style={{gridColumn: `span ${colSpan[index]} / span ${colSpan[index]}`}}>{rowItem}</div>
                                ))
                            }
                        </div>
                    ))
                }
                {
                    (addRecord && adding) &&
                    <div className="grid py-1 px-2 gap-3 relative pl-5" style={{gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`}}>
                        {
                            colSpan.map((span, index) => (
                                inputRecords[index].derived ?
                                <div className="text-center p-1.5" style={{gridColumn: `span ${span} / span ${span}`}}>{inputRecords[index].fun(newRecord)}</div> :
                                <InlineInput 
                                    key={index} 
                                    className="" 
                                    style={{gridColumn: `span ${span} / span ${span}`}}
                                    value={newRecord[index]} 
                                    setValue={e=>setNewRecord([...newRecord.slice(0,index), e, ...newRecord.slice(index+1)])}/>
                            ))
                        }
                        <button onClick={
                            ()=>{
                                setRecord(newRecord);
                                setAdding(false);
                                setNewRecord([]);
                            }
                        } className="absolute top-2 left-1 hover:opacity-80">+</button>
                    </div>
                }
            </div>
            {
                addRecord && (
                    <div className="flex items-end justify-end p-2">
                        <button onClick={()=>setAdding(true)} className="bg-gray-800 text-white text-sm font-semibold hover:opacity-80 px-2 py-1 rounded-md">Add Record</button>
                    </div>
                )
            }
        </div>
    );
}