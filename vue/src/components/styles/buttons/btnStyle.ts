interface IBtnStyle {
    btnDanger: string[],
    btnInfo: string[]
}
export const btnStyle: IBtnStyle = {
    btnDanger: [
        "dark:bg-red-900", "bg-red-400", "p-2", "rounded-md", "dark:text-red-400", "text-red-900"
    ],
    btnInfo: [
        "dark:bg-cyan-900", "bg-cyan-400", "p-2", "rounded-md", "dark:text-cyan-400", "text-cyan-900"
    ]
}