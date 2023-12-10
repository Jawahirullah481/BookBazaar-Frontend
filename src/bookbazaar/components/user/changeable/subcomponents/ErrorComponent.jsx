const ErrorComponent = ({msg}) => {
    return (
        <div className="ErrorComponent">
            <h1>Something went Wrong</h1>
            <div>
                {msg}
            </div>
        </div>
    )
}

export default ErrorComponent