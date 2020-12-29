export default function Lists({ lists }) {
    return (
        <div>
            <h2 className="font-bold text-2xl">Lists</h2>
            <ul>
                {lists.map((list) => {
                    return (
                        <li>
                            <span>{list}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
