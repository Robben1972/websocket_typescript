export default function LoginPage() {
    return (<div className="border-2 flex flex-col  gap-4 w-96 p-4">
        <input className="border-2 p-2" type="text" name="name" placeholder="Enter First Name" />
        <button className="border-2 px-11 py-3 bg-blue-950 text-white">Log in</button>
    </div>
    );
}
