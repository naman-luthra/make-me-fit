export const Table = ({className, colSpan, header, rows, headerStyle, rowStyle}) => {
    const columns = colSpan.reduce((a,b)=>a+b,0);
    return (
        <div className={`rounded-md overflow-hidden ${className}`}>
            <div className="grid py-1 px-2 gap-3" style={{gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, backgroundColor: headerStyle?.bg ? headerStyle.bg : '#1f2937', color: headerStyle?.text ? headerStyle.text : '#f9fafb'}}>
                {
                    header.map((headerItem, index) => (
                        <div key={index} style={{gridColumn: `span ${colSpan[index]} / span ${colSpan[index]}`}}>{headerItem}</div>
                    ))
                }
            </div>
            {
                rows.map((row, index) => (
                    <div key={index} className="grid py-1 px-2 gap-3" style={{gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,  backgroundColor: rowStyle?.bg ? rowStyle.bg : '#f3f4f6', color: rowStyle?.text ? rowStyle.text : '#030712'}}>
                        {
                            row.map((rowItem, index) => (
                                <div key={index} style={{gridColumn: `span ${colSpan[index]} / span ${colSpan[index]}`}}>{rowItem}</div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    );
}